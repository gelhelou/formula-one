import React from 'react';
import PropTypes from 'prop-types';

/**
 * This is a helper method used by both champions and winners since headings rendering
 * is the same for both listings. It is a custom filter with a 'hidden' array to omit
 * fields that we don't want to show
 */
export const Headings = ({ item, hidden }) => <React.Fragment>
    <div className="headings">
    {
        Object.keys(item).map((key, idx) => {
            return !hidden.includes(key) && <div key={idx} className="heading">{key.toUpperCase()}</div>
        })
    }
    </div>
</React.Fragment>;

Headings.propTypes = {
    item: PropTypes.object,
    hidden: PropTypes.array
};
