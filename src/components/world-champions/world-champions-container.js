import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WorldChampions from './world-champions';
import { fetchSeasonWinners } from '../../actions/season-winners-fetcher';
import { getSeasonWinners, getSeasonWinnersPending } from '../../store/reducer';

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSeasonWinners: fetchSeasonWinners
}, dispatch);

const mapStateToProps = state => {
    return {
        seasonWinners: getSeasonWinners(state),
        seasonWinnersPending: getSeasonWinnersPending(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorldChampions)
