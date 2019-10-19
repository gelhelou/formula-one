import React from 'react';
import { expect } from 'chai';
import {
    rootReducer,
    getWorldChampions,
    getWorldChampionsPending,
    getWorldChampionsError,
    getSeasonWinners,
    getSeasonWinnersPending,
    getSeasonWinnersError
} from '../../src/store/reducer';
import {
    FETCH_WORLD_CHAMPIONS_FAIL,
    FETCH_WORLD_CHAMPIONS_PENDING,
    FETCH_WORLD_CHAMPIONS_SUCCESS
} from "../../src/actions/world-champions";
import {
    FETCH_SEASON_WINNERS_FAIL,
    FETCH_SEASON_WINNERS_PENDING,
    FETCH_SEASON_WINNERS_SUCCESS
} from "../../src/actions/season-winners";

const state = {
    worldChampions: [
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
        }
    ],
    seasonWinners: [
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
    ],
    pending: {
        worldChampions: false,
        seasonWinners: false
    },
    error: null
};

describe('Selectors', () => {
    it('return world champions', () => {
        expect(getWorldChampions(state)).to.deep.equal(state.worldChampions);
    });

    it('return pending world champions', () => {
        expect(getWorldChampionsPending(state)).to.deep.equal(state.pending.worldChampions);
    });

    it('return world champions error', () => {
        expect(getWorldChampionsError(state)).to.deep.equal(state.error);
    });

    it('return season winners', () => {
        expect(getSeasonWinners(state)).to.deep.equal(state.seasonWinners);
    });

    it('return pending season winners', () => {
        expect(getSeasonWinnersPending(state)).to.deep.equal(state.pending.seasonWinners);
    });

    it('return season winners error', () => {
        expect(getSeasonWinnersError(state)).to.deep.equal(state.error);
    });
});

describe('Root Reducer', () => {
    it('returns same state with default', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        expect(rootReducer(state, action)).to.deep.equal(state);
    });

    it('returns correct state with FETCH_WORLD_CHAMPIONS_SUCCESS action type', () => {
        const anotherArrayOfChampions = [
            {
                year: 'some-year-4',
                driver: 'some-champion-4',
                age: 'some-age-4',
                nationality: 'some-nationality-4',
                points: 'some-points-4',
                driverId: 'some-driver-id-4'
            },
            {
                year: 'some-year-5',
                driver: 'some-champion-5',
                age: 'some-age-5',
                nationality: 'some-nationality-5',
                points: 'some-points-5',
                driverId: 'some-driver-id-5'
            }
        ];
        const action = { type: FETCH_WORLD_CHAMPIONS_SUCCESS, payload: anotherArrayOfChampions };
        expect(rootReducer(state, action).pending.worldChampions).to.equal(false);
        expect(rootReducer(state, action).pending.seasonWinners).to.equal(false);
        expect(rootReducer(state, action).worldChampions).to.deep.equal(anotherArrayOfChampions);
    });

    it('returns correct state with FETCH_WORLD_CHAMPIONS_FAIL action type', () => {
        const anotherError = { message: 'a-message' };
        const action = { type: FETCH_WORLD_CHAMPIONS_FAIL, error: anotherError };
        expect(rootReducer(state, action).pending.worldChampions).to.equal(false);
        expect(rootReducer(state, action).pending.seasonWinners).to.equal(false);
        expect(rootReducer(state, action).error).to.deep.equal(anotherError);
    });

    it('returns correct stae with FETCH_WORLD_CHAMPIONS_PENDING action type', () => {
        const action = { type: FETCH_WORLD_CHAMPIONS_PENDING };
        expect(rootReducer(state, action).pending.worldChampions).to.equal(true);
        expect(rootReducer(state, action).pending.seasonWinners).to.equal(false);
    });

    it('returns correct state with FETCH_SEASON_WINNERS_SUCCESS action type', () => {
        const anotherArrayOfWinners = [
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
        const action = { type: FETCH_SEASON_WINNERS_SUCCESS, payload: anotherArrayOfWinners };
        expect(rootReducer(state, action).pending.worldChampions).to.equal(false);
        expect(rootReducer(state, action).pending.seasonWinners).to.equal(false);
        expect(rootReducer(state, action).seasonWinners).to.deep.equal(anotherArrayOfWinners);
    });

    it('returns correct state with FETCH_SEASON_WINNERS_FAIL action type', () => {
        const anotherError = { message: 'a-message' };
        const action = { type: FETCH_SEASON_WINNERS_FAIL, error: anotherError };
        expect(rootReducer(state, action).pending.worldChampions).to.equal(false);
        expect(rootReducer(state, action).pending.seasonWinners).to.equal(false);
        expect(rootReducer(state, action).error).to.deep.equal(anotherError);
    });

    it('returns correct stae with FETCH_SEASON_WINNERS_PENDING action type', () => {
        const action = { type: FETCH_SEASON_WINNERS_PENDING };
        expect(rootReducer(state, action).pending.worldChampions).to.equal(false);
        expect(rootReducer(state, action).pending.seasonWinners).to.equal(true);
    });
});
