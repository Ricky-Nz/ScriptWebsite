import {
	CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, GET_SCRIPT, LOAD_SCRIPTS, CLEAR_SCRIPT
} from '../actions/crud-actions';

export default function (detail = {}, action) {
	switch(action.type) {
		case CREATE_SCRIPT:
		case UPDATE_SCRIPT:
			if (action.finished && !action.error) {
				return { script: action.result };
			} else {
				return Object.assign({}, detail, { error: action.error });
			}
		case GET_SCRIPT:
			if (action.finished && !action.error) {
				return { script: action.result };
			} else {
				return Object.assign({}, detail, { loading: !action.finished, error: action.error });
			}
		case DELETE_SCRIPT:
			if (action.finished && !action.error) {
				return {};
			} else {
				return detail;
			}
		case CLEAR_SCRIPT:
			return {};
		default:
			return detail;
	}
}