/**
 * This is a best practice when using redux.
 * Initialize and export state constants so that typos are avoided 
 */

export const FETCH_SEASON_WINNERS_SUCCESS = 'FETCH_SEASON_WINNERS_SUCCESS';
export const FETCH_SEASON_WINNERS_FAIL = 'FETCH_SEASON_WINNERS_FAIL';
export const FETCH_SEASON_WINNERS_PENDING = 'FETCH_SEASON_WINNERS_PENDING';

/**
 * Three different states for fetching season winners
 * success: the data has been retrieved
 * fail: the data could not be retrieved
 * pending: the data is being fetched from external API
 */

export function fetchSeasonWinnersSuccess(seasonWinners) {
    return {
        type: FETCH_SEASON_WINNERS_SUCCESS,
        payload: seasonWinners
    }
}

export function fetchSeasonWinnersFail(error) {
    return {
        type: FETCH_SEASON_WINNERS_FAIL,
        error: error
    }
}

export function fetchSeasonWinnersPending() {
    return {
        type: FETCH_SEASON_WINNERS_PENDING
    }
}