import { LOGIN, LOGOUT, REGISTER } from '../actions/user-actions';

export default function (user = {}, action) {
	switch(action.type) {
        case LOGIN: {
            return action.finished ? Object.assign({}, user, {
                loggingIn: false,
                error: action.error,
                newAction: true,
                access_token: action.data ? action.data.id : null,
                userId: action.data ? action.data.userId : null
            }) : Object.assign({}, user, { loggingIn: true, error: null });
        }
        case LOGOUT: {
            return action.finished ? Object.assign({}, user, {
                loggingOut: false,
                newAction: true,
                error: null,
                access_token: null,
                userId: null
            }) : Object.assign({}, user, { loggingOut: true, error: null });
        }
        case REGISTER: {
            return action.finished ? Object.assign({}, user, {
                registering: false,
                newAction: true,
                error: action.error
            }) : Object.assign({}, user, { registering: true, error: null });
        }
	}
}