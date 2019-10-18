import { API_BASE } from '../../config';
import {
    fetchSeasonWinnersSuccess, 
    fetchSeasonWinnersFail, 
    fetchSeasonWinnersPending
} from './season-winners';

export const fetchSeasonWinners = (season) => async (dispatch) => {
    dispatch(fetchSeasonWinnersPending());
    try {
        const response = await fetch(`${API_BASE}/${season}/results/1.json`);
        const resPromise = response.json();
        const rawData = await resPromise;

        // Despite driverId not being rendered on the UI, it is being passed to be able
        // to highlight the champion winning race on the season winners view
        const winners = rawData.MRData.RaceTable.Races.map(race => ({
            driver: `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`,
            circuit: race.Circuit.circuitName,
            driverId: race.Results[0].Driver.driverId
        }));

        dispatch(fetchSeasonWinnersSuccess(winners));
    } catch (error) {
        dispatch(fetchSeasonWinnersFail({
            message: 'There was a poblem fetching results for the season!'
        }));
    }
};