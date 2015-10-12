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

import GnInput2 from './components/dump-components/elements/GnInput2';
class TestCase extends React.Component {
    render() {
        return (
<div>
    <br/><br/><br/><br/>
    <GnInput2 test='username' type='email' error='Invalide email address'/>
    <br/><br/><br/><br/>
    <GnInput2 test='password'/>
</div>
        );
    }
}

ReactDOM.render(
    <TestCase/>, document.getElementById('root')
);

// <Provider store={store}>
//         <Router history={history}>
//             <Route path='/' component={App}>
//                 <IndexRoute component={Dashboard}/>
//                 <Route path=':section' component={Dashboard}/>
//             </Route>
//         </Router>
//     </Provider>

