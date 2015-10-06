import { LOGIN, LOGOUT, REGISTER, GET_TAGS } from '../actions/user-actions';

export default function (user = {}, action) {
	switch(action.type) {
		case LOGIN:
		case LOGOUT:
		case REGISTER: {
			if (action.finished) {
	            return Object.assign({
	            	processing: false,
	            	error: action.error,
	           		redirect: action.args
	           	}, action.result);
			} else {
				return { processing: true, error: null };
			}
		}
		case GET_TAGS: {
			if (action.finished && !action.error) {
				return Object.assign({}, user, { tags: action.result.tags });
			} else {
				return user;
			}
		}
		default: {
			return user;
		}
	}
}