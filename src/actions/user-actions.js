/**
 * Created by ruiqili on 19/9/15.
 */
import { CALL_API } from '../middlewares/backendApiMiddleware';

export const USER_LOGIN_STARTED = 'USER_LOGIN_STARTED';
export const USER_LOGIN_FINISHED = 'USER_LOGIN_FINISHED';
export const USER_REGISTER_STARTED = 'USER_REGISTER_STARTED';
export const USER_REGISTER_FINISHED = 'USER_REGISTER_FINISHED';

export function userSignUp(username, password) {
    return {
        [CALL_API]: {
            method: 'GET',
            url: '/register',
            body: {
                username: username,
                password: password
            },
            start: USER_REGISTER_STARTED,
            finish: USER_REGISTER_FINISHED
        }
    };
}

export function userLogIn(username, password) {
    return {
        [CALL_API]: {
            method: 'POST',
            url: '/login',
            body: {
                username: username,
                password: password
            },
            start: USER_LOGIN_STARTED,
            finish: USER_LOGIN_FINISHED
        }
    }
}