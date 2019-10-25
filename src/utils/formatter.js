/**
 * Helper method that extracts the age of the driver given his date of birth
*/
export const getAge = (dateOfBirth) => parseInt(
    (Date.now() - new Date(dateOfBirth).getTime()) / 1000 / 3600 / 24 / 365);

/**
 * Although lodash could be used like _.isEmpty(), I preferred to implement my own function
 * since no other utility will be used from lodash or an external package
 */
export const isObjectEmpty = (object) => {
    if (!object) return true;
    return Object.keys(object).length === 0;
};
