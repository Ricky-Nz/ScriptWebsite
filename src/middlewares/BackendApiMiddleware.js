/**
 * Created by ruiqili on 19/9/15.
 */
// import { Schema, arrayOf, normalize } from 'normalizr';
// import 'isomorphic-fetch';

export const CALL_API = Symbol('Call Backend API');

export default store => next => action => {
    if (!action[CALL_API]) next(action);

    const apiCall = action[CALL_API];

    next({ type: apiCall.start });
    setTimeout(() => {
    	next({ type: apiCall.finish });
    }, 2000);
}