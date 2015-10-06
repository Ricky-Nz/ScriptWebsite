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

    let user = store.getState().user;
    let apiCall = action[CALL_API];
    const parmIndex = apiCall.url.indexOf(':userId');
    if (parmIndex > 0) {
        apiCall.url = apiCall.url.slice(0, parmIndex) + user.userId + apiCall.url.slice(parmIndex + 7);
    }
    let request = agent(apiCall.method, 'http://localhost:3000/api' + apiCall.url)
    	.accept('json')
        .timeout(10000);

    if (apiCall.body) request.send(apiCall.body);
    if (apiCall.query) request.query(apiCall.query);
    if (apiCall.token) request.query({ access_token: user.id });
    if (apiCall.file) request.attach('file', apiCall.file, Date.now() + apiCall.file.name);
    if (apiCall.field) _.map(apiCall.field, (value, key) => request.field(key, value));

    next({ type: apiCall.action, finished: false, args: apiCall.args });
    request.end((error, res) => {
        next({
            type: apiCall.action,
            finished: true,
            error: res.status < 400 ? null : (res.body.error ? res.body.error : error.message),
            result: res.status < 400 ? res.body : null,
            args: apiCall.args
        });
    });
}