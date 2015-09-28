/**
 * Created by ruiqili on 19/9/15.
 */
import 'babel-core/polyfill';

// React
import React from 'react';
import { App, LoginPage, DashboardPage } from './src/containers';

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

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

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
                    <IndexRoute component={LoginPage}/>
                    <Route path='login' component={LoginPage}/>
                    <Route path='dashboard/:section' component={DashboardPage}/>
                </Route>
            </Router>
        }
    </Provider>, document.body
);

