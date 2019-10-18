import moment from 'moment';

/**
 * Helper method that extracts the age of the driver givcen his date of birth
*/
export const getAge = (dateOfBirth) => moment().diff(new Date(dateOfBirth), 'years');

/**
 * Although lodash could be used like _.isEmpty(), I preferred to implement my own function
 * since no other utility will be used from lodash or an external package
 */
export const isObjectEmpty = (object) => {
    if (!object) return true;
    return Object.keys(object).length === 0;
};
