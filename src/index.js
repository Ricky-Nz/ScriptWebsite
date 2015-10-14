/**
 * Created by ruiqili on 19/9/15.
 */
import 'babel-core/polyfill';
import './styles/main.css';
// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Dashboard from './components/Dashboard';
// React router
import { Router, IndexRoute, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
// Redux middleware
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import backendApiMiddleware from './middlewares/backendApiMiddleware';

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    backendApiMiddleware,
    createLogger()
)(createStore);

const history = createBrowserHistory();
const store = createStoreWithMiddleware(rootReducer);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path=':section' component={Dashboard}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('root')
);



