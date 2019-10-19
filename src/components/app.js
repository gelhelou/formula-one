import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../utils/formatter';
import WorldChampions from "./world-champions/world-champions-container";
import {
    getWorldChampionsError,
} from '../store/reducer';

export const App = ({ error }) => <React.Fragment>
    {!isObjectEmpty(error) ? <div className="error">{error.message}</div> : <WorldChampions />}
</React.Fragment>;

App.propTypes = {
    error: PropTypes.object,
};

App.defaultProps = {
    error: {},
};

const mapStateToProps = state => {
    return {
        error: getWorldChampionsError(state),
    }
};

export default connect(mapStateToProps, null)(App)
