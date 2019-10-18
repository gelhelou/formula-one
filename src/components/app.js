import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';
import { isObjectEmpty } from '../utils/formatter';
import WorldChampions from "./world-champions/world-champions-container";
import {
    getWorldChampions,
    getWorldChampionsError,
    getWorldChampionsPending
} from '../store/reducer';
import { fetchWorldChampions } from '../actions/world-champions-fetcher';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.isDataAvailable = this.isDataAvailable.bind(this);
    }

    /**
     * When component did mount, go ahead and fetch world champions data
     */
    componentDidMount() {
        const { fetchWorldChampions } = this.props;
        fetchWorldChampions();
    }

    isDataAvailable() {
        const { worldChampions, pending } = this.props;
        // data available means: pending is false, and world champions is not an empty array
        return pending === false && worldChampions.length > 0;
    }

    render() {
        const { worldChampions, error } = this.props;

        if (!isObjectEmpty(error)) return <div className="error">{error.message}</div>;

        // check data is available, if not render a nice loader
        if (!this.isDataAvailable()) return <div className="app-loader">
            <Loader type="ThreeDots" color="green" height={80} width={80} />
        </div>;

        return <WorldChampions
            champions={worldChampions}
        />
    }
}

App.propTypes = {
    error: PropTypes.object,
    worldChampions: PropTypes.array,
    pending: PropTypes.bool
};

App.defaultProps = {
    error: {},
    worldChampions: [],
    pending: false
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchWorldChampions: fetchWorldChampions,
}, dispatch);

const mapStateToProps = state => {
    return {
        error: getWorldChampionsError(state),
        worldChampions: getWorldChampions(state),
        pending: getWorldChampionsPending(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

