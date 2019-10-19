import {
    fetchWorldChampionsSuccess,
    fetchWorldChampionsFail,
    fetchWorldChampionsPending
} from './world-champions';
import { START_YEAR, END_YEAR, API_BASE } from '../../config';
import { getAge } from '../utils/formatter';

export const fetchWorldChampions = () => async (dispatch) => {
    dispatch(fetchWorldChampionsPending());
    try {
        // Using promises in parallel makes sense in this project.
        // Data sets are independent so I'm firing all requests together to the API
        const rawPromises = [];
        for (let i = START_YEAR; i <= END_YEAR; i++) {
            rawPromises.push(fetch(`${API_BASE}/${i}/driverStandings/1.json`));
        }
        const responses = await Promise.all(rawPromises);
        const resPromises = responses.map(res => res.json());
        const rawData = await Promise.all(resPromises);

        const data = rawData.map(seasonData => {
            const driverData = seasonData.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;

            // Despite driverId not being rendered on the UI, it is being passed to be able
            // to highlight the champion winning race on the season winners view
            return {
                year: seasonData.MRData.StandingsTable.season,
                driver: `${driverData.givenName} ${driverData.familyName}`,
                age: getAge(driverData.dateOfBirth),
                nationality: driverData.nationality,
                points: seasonData.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points,
                driverId: driverData.driverId
            }
        });
        dispatch(fetchWorldChampionsSuccess(data));
    } catch (error) {
        dispatch(fetchWorldChampionsFail({
            message: 'There was a problem fetching world champions data!'
        }))
    }
};
