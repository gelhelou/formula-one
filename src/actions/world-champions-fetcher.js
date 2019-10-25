import {
    fetchWorldChampionsSuccess,
    fetchWorldChampionsFail,
    fetchWorldChampionsPending
} from './world-champions';
import { START_YEAR, END_YEAR, API_BASE } from '../../config';
import { getAge } from '../utils/formatter';

export const fetchWorldChampions = (startYear = START_YEAR, endYear = END_YEAR) => async (dispatch) => {
    dispatch(fetchWorldChampionsPending());

    // CURRENT_YEAR is used in the loop for fetch promises with Math.min to avoid errors
    // when END_YEAR is set to a value greater than the current year
    const currentYear = new Date().getFullYear();
    let rawData;
    let data;

    try {
        // Using promises in parallel makes sense in this project.
        // Data sets are independent so I'm firing all requests together to the API
        const rawPromises = [];
        for (let i = startYear; i <= Math.min(endYear, currentYear); i++) {
            rawPromises.push(fetch(`${API_BASE}/${i}/driverStandings/1.json`));
        }
        const responses = await Promise.all(rawPromises);
        const resPromises = responses.map(res => res.json());

        rawData = await Promise.all(resPromises);
    } catch(error) {
        return dispatch(fetchWorldChampionsFail({
            message: "Could not fetch world champions data!"
        }))
    }

    try {
        data = rawData.map(seasonData => {
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
    } catch(error) {
        return dispatch(fetchWorldChampionsFail({
            message: "Retrieved data cannot be displayed!"
        }))
    }

    dispatch(fetchWorldChampionsSuccess(data));
};
