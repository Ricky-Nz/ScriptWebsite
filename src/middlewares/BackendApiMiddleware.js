/**
 * Created by ruiqili on 19/9/15.
 */
// import { Schema, arrayOf, normalize } from 'normalizr';
// import 'isomorphic-fetch';
import agent from 'superagent';
import _ from 'underscore';

export const CALL_API = Symbol('Call Backend API');

export default store => next => action => {
    if (!action[CALL_API]) return next(action);

    let appState = store.getState().app;
    let apiCall = action[CALL_API];
    let request = agent(apiCall.method, 'http://localhost:3000/api' + apiCall.url)
    	.send(apiCall.body)
        .query(apiCall.query)
        .attach(apiCall.file)
    	.accept('json')
        .timeout(10000);

    if (apiCall.field) {
        _.map(apiCall.field, (value, key) => request.field(key, value));
    }

    if (apiCall.token) {
    	request.query({ access_token: appState.access_token });
    }

    next({ type: apiCall.action, finished: false });
	request.end((error, res) => {
		next({
			type: apiCall.action,
            finished: true,
			error: error ? error.message : null,
			result: res ? res.body : null
		});
	});
}