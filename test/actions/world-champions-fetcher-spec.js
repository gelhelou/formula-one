import 'babel-polyfill';
import nock from 'nock';
import { expect } from 'chai';
import { spy } from 'sinon';
import { API_BASE } from '../../config';
import { fetchWorldChampions } from '../../src/actions/world-champions-fetcher';
import {
    fetchWorldChampionsPending,
    fetchWorldChampionsSuccess,
    fetchWorldChampionsFail
} from '../../src/actions/world-champions';
import { getAge } from "../../src/utils/formatter";

describe('Fetch World Champions', () => {
    const startYear = 2015;
    const endYear = 2015;
    const championData = {
        givenName: 'Lewis',
        familyName: 'Hamilton',
        dateOfBirth: '1985-01-07',
        nationality: 'British',
        driverId: 'lewis'
    };

    it('fires pending and success dispatch when fetching world champions with proper data', () => {
        nock(API_BASE).get(`/${startYear}/driverStandings/1.json`)
            .reply(200, {
                MRData: {
                    StandingsTable: {
                        season: startYear,
                        StandingsList: [
                            {
                                DriverStandings: [
                                    {
                                        Driver: championData,
                                        points: 100
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
        fetchWorldChampions(startYear, endYear)(dispatch);
        setTimeout(() => {
            expect(dispatch.getCall(0).calledWithExactly(fetchWorldChampionsPending())).to.equal(true);
            const expectedChampions = [
                {
                    year: startYear,
                    driver: `${championData.givenName} ${championData.familyName}`,
                    age: getAge(championData.dateOfBirth),
                    nationality: championData.nationality,
                    points: 100,
                    driverId: championData.driverId
                }
            ];
            expect(dispatch.getCall(1).calledWithExactly(fetchWorldChampionsSuccess(expectedChampions))).to.equal(true);
        }, 2000);
    });

    it('fires pending and fail dispatch when fetching world champions with invalid data', () => {
        nock(API_BASE).get(`/${startYear}/driverStandings/1.json`)
            .reply(200, {
                MRData: {}
            });

        const error = {
            message: 'There was a problem fetching world champions data!'
        };

        let dispatch = spy();
        fetchWorldChampions(startYear, endYear)(dispatch);
        setTimeout(() => {
            expect(dispatch.getCall(0).calledWithExactly(fetchWorldChampionsPending())).to.equal(true);
            expect(dispatch.getCall(1).calledWithExactly(fetchWorldChampionsFail(error))).to.equal(true);
        }, 2000);
    });
});
