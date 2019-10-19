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
 * Notice that both Headings and DataRow have 'hidden' property, which acts as a filter on the field 'driverId',
 * required to highlight the champion row in winners
 */
export const WorldChampionsView = ({
    champions, seasonWinners, seasonWinnersLoading, showSeasonWinnersIndex, onRowClicked
}) => <React.Fragment>
    <div className="world-champions-wrapper">
        <div id="world-champions-title">F1 World Champions</div>
        <Headings item={champions.length > 0 ? champions[0] : {}} hidden={['driverId']} />
        <div className="champions">
            {
                champions.map((item, idx) => {
                    return <React.Fragment><div
                        key={idx}
                        className="champion-row"
                        onClick={() => onRowClicked(item, idx)}
                    >
                        <DataRow item={item} hidden={['driverId']} rowClass={'champion-data'} />
                    </div>
                    {
                        (showSeasonWinnersIndex === idx) && <SeasonWinnersView
                            championId={item.driverId}
                            winners={seasonWinners}
                            loading={seasonWinnersLoading}
                        />
                    }
                    </React.Fragment>
                })
            }
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
        this.setState({ showSeasonWinnersIndex: (showSeasonWinnersIndex === idx) ? null : idx });

        if (showSeasonWinnersIndex === idx) return;

        const { fetchSeasonWinners } = this.props;
        fetchSeasonWinners(item.year);
    }

    render() {
        const { onRowClicked } = this;
        const { showSeasonWinnersIndex } = this.state;
        const { champions, championsPending, seasonWinners, seasonWinnersPending } = this.props;

        // if data is still loading for champions, just show the loader
        if (championsPending) return <div className="champions-loader"><Loader type="ThreeDots" color="green" height={80} width={80} /></div>;

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
