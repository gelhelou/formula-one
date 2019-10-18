/**
 * This is a best practice when using redux.
 * Initialize and export state constants so that typos are avoided 
 */

export const FETCH_WORLD_CHAMPIONS_SUCCESS = 'FETCH_WORLD_CHAMPIONS_SUCCESS';
export const FETCH_WORLD_CHAMPIONS_FAIL = 'FETCH_WORLD_CHAMPIONS_FAIL';
export const FETCH_WORLD_CHAMPIONS_PENDING = 'FETCH_WORLD_CHAMPIONS_PENDING';

/**
 * Three different states for fetching world champions
 * success: the data has been retrieved
 * fail: the data could not be retrieved
 * pending: the data is being fetched from external API
 */

export function fetchWorldChampionsSuccess(worldChampions) {
    return {
        type: FETCH_WORLD_CHAMPIONS_SUCCESS,
        payload: worldChampions
    }
}

export function fetchWorldChampionsFail(error) {
    return {
        type: FETCH_WORLD_CHAMPIONS_FAIL,
        error: error
    }
}

export function fetchWorldChampionsPending() {
    return {
        type: FETCH_WORLD_CHAMPIONS_PENDING
    }
}