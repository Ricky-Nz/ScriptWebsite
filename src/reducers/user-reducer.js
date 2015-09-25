import { LOGIN, LOGOUT } from '../actions/user-actions';

export function user (user = {}, action) {
    if (!action.finished || action.error) return user;

	switch(action.type) {
        case LOGIN:
            return Object.assign({}, user, {
                access_token: action.result ? action.result.id : null,
                userId: action.result ? action.result.userId : null
            });
        case LOGOUT:
            return Object.assign({}, user, {
                access_token: null,
                userId: null
            });
        default:
            return user;
	}
}