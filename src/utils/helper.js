import React from 'react';
import PropTypes from 'prop-types';

/**
 * This is a helper method used by both champions and winners since headings rendering
 * is the same for both listings. It is a custom filter with a 'hidden' array to omit
 * fields that we don't want to show
 */
export const Headings = ({ item, hiddenColumns }) => <React.Fragment>
    <div className="headings" test-element="headings">
    {
        Object.keys(item).map((key, idx) =>
            !hiddenColumns.includes(key) && <div key={idx} className="heading" test-element="heading">{key.toUpperCase()}</div>)
    }
    </div>
</React.Fragment>;

Headings.propTypes = {
    item: PropTypes.object,
    hiddenColumns: PropTypes.array
};

/*
 * This is a helper method used by both champions and winners since data rendering
 * is the same for both listings. It is a customer filter with a 'hidden' array to omit
 * fields that we don't want to show
 */
export const DataRow = ({ item, hiddenColumns, rowClass }) => <React.Fragment>
    { Object.keys(item).map((key, idx) =>
        // short-circuiting style
        !hiddenColumns.includes(key) && <div className={rowClass} key={idx} test-element={rowClass}>{item[key]}</div>)
    }
</React.Fragment>;

DataRow.propTypes = {
    item: PropTypes.object,
    hiddenColumns: PropTypes.array,
    rowClass: PropTypes.string
};
