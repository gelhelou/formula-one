/**
 * The initial state of the app.
 * No pending requests, and the champions and winners are empty.
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