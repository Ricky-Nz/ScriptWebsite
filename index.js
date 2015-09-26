/**
 * Created by ruiqili on 19/9/15.
 */
import 'babel-core/polyfill';

// React
import React from 'react';
import { App, LoginPage } from './src/containers';

// React router
import { Router, IndexRoute, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
// Redux middleware
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import backendApiMiddleware from './src/middlewares/backendApiMiddleware';

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    backendApiMiddleware,
    loggerMiddleware
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

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

React.render(
    <Provider store={store}>
        {() =>
            <Router history={history}>
                <Route path='/' component={App}>
                    <IndexRoute component={LoginPage}/>
                    <Route path='login' component={LoginPage}/>
                </Route>
            </Router>
        }
    </Provider>,
    document.getElementById('root')
);

