/**
 * Created by ruiqili on 19/9/15.
 */
import 'babel-core/polyfill';
// React
import React from 'react';
import App from './src/containers/App';
import Dashboard from './src/containers/Dashboard';
// React router
import { Router, IndexRoute, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
// Redux middleware
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import backendApiMiddleware from './src/middlewares/backendApiMiddleware';

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    backendApiMiddleware,
    createLogger()
)(createStore);

const history = createBrowserHistory();
const store = createStoreWithMiddleware(rootReducer);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./src/reducers', () => {
        const nextRootReducer = require('./src/reducers');
        store.replaceReducer(nextRootReducer);
    });
}

React.render(
    <Provider store={store}>
        {() =>
            <Router history={history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Dashboard}/>
                    <Route path=':section' component={Dashboard}/>
                </Route>
            </Router>
        }
    </Provider>, document.body
);

