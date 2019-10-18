/**
 * The initial state of the app.
 * No pending requests, the champions and winners are empty, and error is null (no error).
 */
export default {
    pending: {
        worldChampions: false,
        seasonWinners: false
    },
    worldChampions: [],
    seasonWinners: [],
    error: null
}
