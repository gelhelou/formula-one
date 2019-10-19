import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WorldChampions from './world-champions';
import { fetchWorldChampions } from "../../actions/world-champions-fetcher";
import { fetchSeasonWinners } from '../../actions/season-winners-fetcher';
import {
    getSeasonWinners,
    getSeasonWinnersPending,
    getWorldChampions,
    getWorldChampionsPending
} from '../../store/reducer';

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchWorldChampions: fetchWorldChampions,
    fetchSeasonWinners: fetchSeasonWinners
}, dispatch);

const mapStateToProps = state => ({
    champions: getWorldChampions(state),
    championsPending: getWorldChampionsPending(state),
    seasonWinners: getSeasonWinners(state),
    seasonWinnersPending: getSeasonWinnersPending(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WorldChampions)
