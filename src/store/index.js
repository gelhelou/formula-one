import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducer';

import initialState from './initial-state';

const middlewares = [thunk];

/**
 * I am using a store factory to create a store.
 * This function is used in index and the store is passed to the Provider 
 */
export default function storeFactory(state = initialState) {
    return createStore(rootReducer, state, applyMiddleware(...middlewares));
};