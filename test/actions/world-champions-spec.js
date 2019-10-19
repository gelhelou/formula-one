import React from 'react';
import { expect } from 'chai';
import {
    fetchWorldChampionsSuccess,
    FETCH_WORLD_CHAMPIONS_SUCCESS,
    fetchWorldChampionsFail,
    FETCH_WORLD_CHAMPIONS_FAIL,
    fetchWorldChampionsPending,
    FETCH_WORLD_CHAMPIONS_PENDING
} from "../../src/actions/world-champions";

describe('World Champions Actions', () => {
    it('should create an action for fetch success', () => {
        const champions = [
            {
                year: 'some-year-1',
                driver: 'some-champion-1',
                age: 'some-age-1',
                nationality: 'some-nationality-1',
                points: 'some-points-1',
                driverId: 'some-driver-id-1'
            },
            {
                year: 'some-year-2',
                driver: 'some-champion-2',
                age: 'some-age-2',
                nationality: 'some-nationality-2',
                points: 'some-points-2',
                driverId: 'some-driver-id-2'
            },
            {
                year: 'some-year-3',
                driver: 'some-champion-3',
                age: 'some-age-3',
                nationality: 'some-nationality-3',
                points: 'some-points-3',
                driverId: 'some-driver-id-3'
            },
        ];
        const expectedAction = {
            type: FETCH_WORLD_CHAMPIONS_SUCCESS,
            payload: champions
        };
        expect(fetchWorldChampionsSuccess(champions)).to.deep.equal(expectedAction);
    });

    it('should create an action for fetch fail', () => {
        const error = {
            message: 'some-error-text'
        };
        const expectedAction = {
            type: FETCH_WORLD_CHAMPIONS_FAIL,
            error: error
        };
        expect(fetchWorldChampionsFail(error)).to.deep.equal(expectedAction);
    });

    it('should create an action for fetch pending', () => {
       const expectedAction = {
           type: FETCH_WORLD_CHAMPIONS_PENDING
       };
       expect(fetchWorldChampionsPending()).to.deep.equal(expectedAction);
    });
});
