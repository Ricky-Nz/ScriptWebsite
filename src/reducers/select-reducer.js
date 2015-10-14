import {
	CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, GET_SCRIPT,
	GET_REPORT, CLEAR_SELECT,
	LOAD_PARAMETERS, LOAD_PACKAGES, LOAD_REPORTS, LOAD_SCRIPTS
} from '../actions/crud-actions';
import { CHANGE_SECTION } from '../actions/app-actions';

export default function (select = null, action) {
	switch(action.type) {
		case UPDATE_SCRIPT:
		case GET_SCRIPT:
		case GET_REPORT:
		case CREATE_SCRIPT:
			if (action.finished && !action.error) {
				return Object.assign({}, action.result);
			} else {
				return select;
			}
		case DELETE_SCRIPT:
			if (select && action.finished && !action.error && action.args == select.id) {
				return {};
			} else {
				return select;
			}
		case CLEAR_SELECT:
			return {};
		case CHANGE_SECTION:
			return action.data == 'scripteditor' ? {} : null;
		default:
			return select;
	}
}