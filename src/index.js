import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/app';

import './components/app.scss';
import './components/world-champions/world-champions.scss';
import './components/season-winners/season-winners.scss';

import storeFactory from './store';

const store = storeFactory();

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
