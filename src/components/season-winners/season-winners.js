import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { renderHeadings } from '../../utils/formatter';

/**
 * This is a dynamic view. It responds dynamically to whatever data is being passed in winners.
 * No predefined headings. The only conditional check is on driverId for it not to be rendered.
 * The latter is passed to highlight champion wins inside the season winners view.
 *
 * NOTE: Another approach would have been to have a filter that validates if the field is to be rendered
 * as heading, I've opted for the conditional check in this case
 */
export const SeasonWinnersView = ({
    championId, winners, loading
}) => <React.Fragment>
    {!loading ? <div className="season-winners-wrapper">
        {renderHeadings(winners[0], ['driverId'])}
        <div className="winners">
            {
                winners.map((item, idx) => {
                    return <div
                        key={idx}
                        className={`winner-row ${item.driverId === championId ? 'champion-highlight' : ''}`}>
                            { Object.keys(item).map((key, idx) =>
                                // short-circuiting style
                                key !== 'driverId' && <div className="winner-data" key={idx}>{item[key]}</div>)
                            }
                    </div>
                })
            }
        </div>
    </div> : <div className="winners-loader"><Loader type="ThreeDots" color="green" height={30} width={30} /></div>}
</React.Fragment>;

SeasonWinnersView.propTypes = {
    championId: PropTypes.string,
    winners: PropTypes.array,
    loading: PropTypes.bool
};

SeasonWinnersView.defaultProps = {
    championId: null,
    winners: [],
    loading: false
};
