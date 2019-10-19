import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/formatter';
import { appRefresh } from "../actions/app";
import WorldChampions from "./world-champions/world-champions-container";
import {
    getWorldChampionsError,
} from '../store/reducer';

export const App = ({ appRefresh, error }) => <React.Fragment>
    {!isObjectEmpty(error) ? <div className="error">{error.message}
        <span> </span><span className="refresh-button" onClick={() => appRefresh()}>Refresh</span>
    </div> : <WorldChampions />}
</React.Fragment>;

App.propTypes = {
    error: PropTypes.object,
};

App.defaultProps = {
    error: {},
};

const mapDispatchToProps = dispatch => bindActionCreators({
    appRefresh: appRefresh
}, dispatch);

const mapStateToProps = state => {
    return {
        error: getWorldChampionsError(state),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
