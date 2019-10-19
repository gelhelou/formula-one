import React from 'react';
import { expect } from 'chai';
import {
    fetchSeasonWinnersSuccess,
    FETCH_SEASON_WINNERS_SUCCESS,
    fetchSeasonWinnersFail,
    FETCH_SEASON_WINNERS_FAIL,
    fetchSeasonWinnersPending,
    FETCH_SEASON_WINNERS_PENDING
} from "../../src/actions/season-winners";

describe('Season Winners Actions', () => {
    it('should create an action for fetch success', () => {
        const winners = [
            {
                driver: 'some-driver-name',
                circuit: 'some-circuit-name',
                driverId: 'some-champion-id'
            },
            {
                driver: 'another-driver-name',
                circuit: 'another-circuit-name',
                driverId: 'another-driver-id'
            }
        ];
        const expectedAction = {
            type: FETCH_SEASON_WINNERS_SUCCESS,
            payload: winners
        };
        expect(fetchSeasonWinnersSuccess(winners)).to.deep.equal(expectedAction);
    });

    it('should create an action for fetch fail', () => {
        const error = {
            message: 'some-error-text'
        };
        const expectedAction = {
            type: FETCH_SEASON_WINNERS_FAIL,
            error: error
        };
        expect(fetchSeasonWinnersFail(error)).to.deep.equal(expectedAction);
    });

    it('should create an action for fetch pending', () => {
       const expectedAction = {
           type: FETCH_SEASON_WINNERS_PENDING
       };
       expect(fetchSeasonWinnersPending()).to.deep.equal(expectedAction);
    });
});
