import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { Headings, DataRow } from '../../utils/helper';

/**
 * This is a dynamic view. It responds dynamically to whatever data is being passed in winners.
 * No predefined headings.
 *
 * Headings component takes care of the headings to be populated.
 * DataRow component takes care of each row to be populated.
 *
 * Notice that both Headings and DataRow have 'hidden' property, which acts as a filter on the field 'driverId',
 * required to highlight the champion row in winners
 */
export const SeasonWinnersView = ({
    championId, season, winners, loading
}) => <React.Fragment>
    {!loading ? <div className="season-winners-wrapper">
        <div className="season-winners-title">{`Season ${season} Winners`}</div>
        <div className="season-winners-listing">
        <Headings item={winners.length > 0 ? winners[0] : {}} hidden={['driverId']} />
        <div className="winners">
            {
                winners.map((item, idx) => {
                    return <div
                        key={idx}
                        className={`winner-row ${item.driverId === championId ? 'champion-highlight' : ''}`}>
                            <DataRow item={item} hidden={['driverId']} rowClass={'winner-data'} />
                    </div>
                })
            }
        </div>
    </div></div> : <div className="winners-loader"><Loader type="ThreeDots" color="green" height={40} width={40} /></div>}
</React.Fragment>;

SeasonWinnersView.propTypes = {
    championId: PropTypes.string,
    season: PropTypes.string,
    winners: PropTypes.array,
    loading: PropTypes.bool
};

SeasonWinnersView.defaultProps = {
    championId: null,
    season: "",
    winners: [],
    loading: false
};
