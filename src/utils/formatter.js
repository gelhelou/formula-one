import React from 'react';
import moment from 'moment';

/**
 * Helper method that extracts the age of the driver givcen his date of birth
*/
export const getAge = (dateOfBirth) => moment().diff(new Date(dateOfBirth), 'years');

export const isObjectEmpty = (object) => {
    if (!object) return true;
    return Object.keys(object).length === 0;
};

/**
 * This is a helper method used by both champions and winners since headings rendering
 * is the same for both listings. It is a custom filter with a 'hidden' array to omit
 * fields that we don't want to show
 */
export const renderHeadings = (item, hidden = []) => {
    return <React.Fragment>
        <div className="headings">
        {
            Object.keys(item).map((key, idx) => {
                return !hidden.includes(key) && <div key={idx} className="heading">{key.toUpperCase()}</div>
            })
        }
        </div>
    </React.Fragment>
};
