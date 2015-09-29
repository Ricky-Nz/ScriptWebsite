/**
 * Created by ruiqili on 19/9/15.
 */
import { CALL_API } from '../middlewares/backendApiMiddleware';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const TOGGLE_LOGIN_PANEL = 'TOGGLE_LOGIN_PANEL';

export function register(email, password) {
    return {
        [CALL_API]: {
            method: 'POST',
            url: '/Testers',
            body: { email, password },
            action: REGISTER
        }
    };
}

export function login(email, password) {
    return {
        [CALL_API]: {
            method: 'POST',
            url: '/Testers/login',
            body: { email, password },
            action: LOGIN
        }
    }
}

export function logout () {
    return {
        [CALL_API]: {
            method: 'POST',
            url: '/Testers/logout',
            token: true,
            action: LOGOUT
        }
    }
}