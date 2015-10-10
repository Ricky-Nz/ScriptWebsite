import { LOGIN, LOGOUT } from '../actions/user-actions';

export default function (user = {}, action) {
	if (action.requireLogin) {
		return {};
	}

	switch(action.type) {
		case LOGIN:
			if (action.finished && !action.error) {
	            return {
	            	accessToken: action.result.id,
	            	userId: action.result.userId,
	            	email: action.result.email
	            }
			} else {
				user;
			}
		case LOGOUT:
			if (action.finished) {
				return {}
			} else {
				return user;
			}
		default: {
			return user;
		}
	}
}




