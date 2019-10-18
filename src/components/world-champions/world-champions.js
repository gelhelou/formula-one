import React from 'react';
import PropTypes from 'prop-types';
import { Headings } from '../../utils/helper';
import { SeasonWinnersView } from '../season-winners/season-winners';

/**
 * This is a dynamic view. It responds dynamically to whatever data is being passed in champions.
 * No predefined headings. The only conditional check is on driverId for it not to be rendered.
 * The latter is passed to highlight champion wins inside the season winners view.
 *
 * NOTE: Another approach would have been to have a filter that validates if the field is to be rendered
 * as heading, I've opted for the conditional check in this case
 */
export const WorldChampionsView = ({
    champions, seasonWinners, seasonWinnersLoading, showSeasonWinnersIndex, onRowClicked
}) => <React.Fragment>
    <div className="world-champions-wrapper">
        <div id="world-champions-title">F1 World Champions</div>
        <Headings item={champions[0]} hidden={['driverId']} />
        <div className="champions">
            {
                champions.map((item, idx) => {
                    return <React.Fragment><div
                        key={idx}
                        className="champion-row"
                        onClick={() => onRowClicked(item, idx)}
                    >
                        { Object.keys(item).map((key, idx) =>
                            // short-circuiting style
                            key !== 'driverId' && <div className="champion-data" key={idx}>{item[key]}</div>) }
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
        const { champions, seasonWinners, seasonWinnersPending } = this.props;

        return <WorldChampionsView
            champions={champions}
            seasonWinners={seasonWinners}
            seasonWinnersLoading={seasonWinnersPending}
            showSeasonWinnersIndex={showSeasonWinnersIndex}
            onRowClicked={onRowClicked}
        />
    }
}

WorldChampions.propTypes = {
    champions: PropTypes.array,
    seasonWinners: PropTypes.array,
    seasonWinnersPending: PropTypes.bool,
    fetchSeasonWinners: PropTypes.func
};

WorldChampions.defaultProps = {
    champions: [],
    seasonWinners: [],
    seasonWinnersPending: false
};
