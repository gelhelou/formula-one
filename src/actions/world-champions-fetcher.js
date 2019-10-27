import {
    fetchWorldChampionsSuccess,
    fetchWorldChampionsFail,
    fetchWorldChampionsPending
} from './world-champions';
import { START_YEAR, END_YEAR, API_BASE } from '../../config';
import { getAge } from '../utils/formatter';
import { compose } from '../utils/composer';

export const fetchWorldChampions = () => (dispatch) => {
    dispatch(fetchWorldChampionsPending());
    formData()
        .then(data => dispatch(fetchWorldChampionsSuccess(data)))
        .catch(error => dispatch(fetchWorldChampionsFail(error)));
};

const fetchData = () => new Promise(async (resolve, reject) => {
    // CURRENT_YEAR is used in the loop for fetch promises with Math.min to avoid errors
    // when END_YEAR is set to a value greater than the current year
    const currentYear = new Date().getFullYear();

    try {
        // Using promises in parallel makes sense in this project.
        // Data sets are independent so I'm firing all requests together to the API
        const rawPromises = [];
        for (let i = START_YEAR; i <= Math.min(END_YEAR, currentYear); i++) {
            rawPromises.push(fetch(`${API_BASE}/${i}/driverStandings/1.json`));
        }
        const responses = await Promise.all(rawPromises);
        const resPromises = responses.map(res => res.json());

        const rawData = await Promise.all(resPromises);

        resolve(rawData);
    } catch(error) {
        reject({ message: 'Could not fetch world champions data!' });
    }
});

const transformData = rawData => new Promise((resolve, reject) => {
    try {
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
        resolve(data);  
    } catch(error) {
        reject({ message: 'Retrieved data cannot be displayed!' });
    }
});

const formData = compose(
    transformData,
    fetchData,
);
