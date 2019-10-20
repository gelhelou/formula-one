import 'babel-polyfill';
import nock from 'nock';
import { expect } from 'chai';
import { spy } from 'sinon';
import { API_BASE } from '../../config';
import { fetchSeasonWinners } from '../../src/actions/season-winners-fetcher';
import {
    fetchSeasonWinnersPending,
    fetchSeasonWinnersSuccess,
    fetchSeasonWinnersFail
} from '../../src/actions/season-winners';

describe('Fetch Season Winners', () => {
    const season = '2015';
    const winnerData = {
        givenName: 'Lewis',
        familyName: 'Hamilton',
        driverId: 'lewis'
    };

    it('fires pending and success dispatch when fetching season winners with proper data', () => {
        nock(API_BASE).get(`/${season}/results/1.json`)
            .reply(200, {
                MRData: {
                    RaceTable: {
                        Races: [
                            {
                                Results: [
                                    {
                                        Driver: winnerData
                                    }
                                ],
                                Circuit: {
                                    circuitName: 'Monza'
                                }
                            }
                        ]
                    }
                }
            });

        let dispatch = spy();
        fetchSeasonWinners(season)(dispatch);
        setTimeout(() => {
            expect(dispatch.getCall(0).calledWithExactly(fetchSeasonWinnersPending())).to.equal(true);
            const expectedWinners = [
                {
                    driver: `${winnerData.givenName} ${winnerData.familyName}`,
                    circuit: 'Monza',
                    driverId: winnerData.driverId
                }
            ];
            expect(dispatch.getCall(1).calledWithExactly(fetchSeasonWinnersSuccess(expectedWinners))).to.equal(true);
        }, 2000);
    });

    it('fires pending and fail dispatch when fetching season winners with invalid data', () => {
        nock(API_BASE).get(`/${ season }/results/1.json`)
            .reply(200, {
                MRData: {}
            });

        const error = {
            message: 'There was a problem fetching results for the season!'
        };

        let dispatch = spy();
        fetchSeasonWinners(season)(dispatch);
        setTimeout(() => {
            expect(dispatch.getCall(0).calledWithExactly(fetchSeasonWinnersPending())).to.equal(true);
            expect(dispatch.getCall(1).calledWithExactly(fetchSeasonWinnersFail(error))).to.equal(true);
        }, 2000);
    });
});
