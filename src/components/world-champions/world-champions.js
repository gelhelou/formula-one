import React from 'react';
import PropTypes from 'prop-types';
import { Headings, DataRow } from '../../utils/helper';
import { SeasonWinnersView } from '../season-winners/season-winners';
import Loader from 'react-loader-spinner';

/**
 * This is a dynamic view. It responds dynamically to whatever data is being passed in champions.
 * No predefined headings.
 *
 * Headings component takes care of the headings to be populated.
 * DataRow component takes care of each row to be populated.
 *
 * Notice that both Headings and DataRow have 'hiddenColumns' property, which acts as a filter on the field 'driverId',
 * required to highlight the champion row in winners
 */
export const WorldChampionsView = ({
    champions, seasonWinners, seasonWinnersLoading, showSeasonWinnersIndex, onRowClicked
}) => <React.Fragment>
    <div className="world-champions-wrapper">
        <div id="world-champions-title">F1 World Champions</div>
        <div className="world-champions-listing">
            <Headings item={champions.length > 0 ? champions[0] : {}} hiddenColumns={['driverId']} />
            <div className="champions" test-element="champions">
                {
                    champions.map((item, idx) => {
                        return <React.Fragment><div
                            key={idx}
                            className="table-row"
                            onClick={() => onRowClicked(item, idx)}
                            test-element="champion-row"
                        >
                            <DataRow item={item} hiddenColumns={['driverId']} rowClass={'champion-data'} />
                        </div>
                        {
                            (showSeasonWinnersIndex === idx) && <SeasonWinnersView
                                championId={item.driverId}
                                season={item.year}
                                winners={seasonWinners}
                                loading={seasonWinnersLoading}
                            />
                        }
                        </React.Fragment>
                    })
                }
            </div>
        </div>
    </div>
</React.Fragment>;

WorldChampionsView.propTypes = {
    champions: PropTypes.array,
    seasonWinners: PropTypes.array,
    seasonWinnersLoading: PropTypes.bool,
    showSeasonWinnersIndex: PropTypes.number,
    onRowClicked: PropTypes.func
};

WorldChampionsView.defaultProps = {
    champions: [],
    seasonWinners: [],
    seasonWinnersLoading: false,
    showSeasonWinnersIndex: null
};

export default class WorldChampions extends React.Component {
    constructor(props) {
        super(props);
        // the only state defined inside WorldChampions component is showSeasonWinnersIndex
        // so that whenever this state value is passed, WorldChampionsView would know for which
        // row to render SeasonWinnersView
        this.state = {
            showSeasonWinnersIndex: null
        };
        this.onRowClicked = this.onRowClicked.bind(this);
    }

    /**
      * When componentDidMount lifecycle state, fetch world champions data
      */
    componentDidMount () {
        const { fetchWorldChampions } = this.props;
        fetchWorldChampions();
    }

    /**
     * This function is passed down to WorldChampionsView to be fired whenever a row is clicked.
     * It has the role of fetching season winners and hide/show the SeasonWinnersView
     */
    onRowClicked(item, idx) {
        const { showSeasonWinnersIndex } = this.state;

        // if showSeasonWinnersIndex === idx, should collapse SeasonWinnersView
        this.setState({ showSeasonWinnersIndex: (showSeasonWinnersIndex === idx) ? null : idx });

        // returning to collapse
        if (showSeasonWinnersIndex === idx) return;

        const { fetchSeasonWinners } = this.props;
        fetchSeasonWinners(item.year);
    }

    render() {
        const { onRowClicked } = this;
        const { showSeasonWinnersIndex } = this.state;
        const { champions, championsPending, seasonWinners, seasonWinnersPending } = this.props;

        // if data is still loading for champions, just show the loader
        if (championsPending) return <div
            className="champions-loader"
            test-element="champions-loader"
        ><Loader type="ThreeDots" color="green" height={80} width={80} /></div>;

        return <WorldChampionsView
            champions={champions}
            seasonWinners={seasonWinners}
            seasonWinnersLoading={seasonWinnersPending}
            showSeasonWinnersIndex={showSeasonWinnersIndex}
            onRowClicked={onRowClicked}
        />;
    }
}

WorldChampions.propTypes = {
    champions: PropTypes.array,
    championsPending: PropTypes.bool,
    seasonWinners: PropTypes.array,
    seasonWinnersPending: PropTypes.bool,
    fetchWorldChampions: PropTypes.func,
    fetchSeasonWinners: PropTypes.func
};

WorldChampions.defaultProps = {
    champions: [],
    championsPending: false,
    seasonWinners: [],
    seasonWinnersPending: false
};
