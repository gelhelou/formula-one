import {
	FETCH_WORLD_CHAMPIONS_SUCCESS,
	FETCH_WORLD_CHAMPIONS_FAIL,
	FETCH_WORLD_CHAMPIONS_PENDING,
} from '../actions/world-champions';
import {
	FETCH_SEASON_WINNERS_SUCCESS,
	FETCH_SEASON_WINNERS_FAIL,
	FETCH_SEASON_WINNERS_PENDING
} from '../actions/season-winners';
import initialState from './initial-state';

/**
 * I have opted for a root reducer instead of multiple,
 * given the simple structure of the data.
 * In a more dense project, it would be reasonable to have multiple reducers
 * and combine them with redux function 'combineReducers'
 */
export const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_WORLD_CHAMPIONS_SUCCESS:
			return {
				...state,
				pending: { worldChampions: false, seasonWinners: false },
				worldChampions: action.payload
			};
		case FETCH_WORLD_CHAMPIONS_FAIL:
			return {
				...state,
				pending: { worldChampions: false, seasonWinners: false },
				error: action.error
			};
		case FETCH_WORLD_CHAMPIONS_PENDING:
			return {
				...state,
				pending: { worldChampions: true, seasonWinners: false },
			};
		case FETCH_SEASON_WINNERS_SUCCESS:
			return {
				...state,
				pending: { seasonWinners: false, worldChampions: false },
				seasonWinners: action.payload
			};
		case FETCH_SEASON_WINNERS_FAIL:
			return {
				...state,
				pending: { seasonWinners: false, worldChampions: false },
				error: action.error
			};
		case FETCH_SEASON_WINNERS_PENDING:
			return {
				...state,
				pending: { seasonWinners: true, worldChampions: false },
			};
		default:
			return state;
	}
};

/**
 * These functions are called selectors.
 * Since we have one state across the whole app, these selectors help
 * grabbing a particular state property and use it in the corresponding containers/components
 */
export const getWorldChampions = state => state.worldChampions;
export const getWorldChampionsPending = state => state.pending.worldChampions;
export const getWorldChampionsError = state => state.error;

export const getSeasonWinners = state => state.seasonWinners;
export const getSeasonWinnersPending = state => state.pending.seasonWinners;
export const getSeasonWinnersError = state => state.error;
