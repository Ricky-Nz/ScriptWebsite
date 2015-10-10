import {
	CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, GET_SCRIPT,
	GET_REPORT, CLEAR_SELECT,
	LOAD_PARAMETERS, LOAD_PACKAGES, LOAD_REPORTS, LOAD_SCRIPTS
} from '../actions/crud-actions';
import { CHANGE_SECTION, EDIT_SCRIPT } from '../actions/app-actions';

export default function (select = null, action) {
	switch(action.type) {
		case UPDATE_SCRIPT:
		case GET_SCRIPT:
		case GET_REPORT:
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
		case CREATE_SCRIPT:
		case CLEAR_SELECT:
			return {};
		case CHANGE_SECTION:
			return action.data == 'scripteditor' ? {} : null;
		case EDIT_SCRIPT:
			const operate = action.data;
			let array = select[operate.target];

			if (operate.action == 'insert') {
				const index = operate.position;
				return Object.assign({}, select,
					{[operate.target]: [...array.slice(0, index), operate.args, ...array.slice(index)]});
			} else if (operate.action == 'append') {
				return Object.assign({}, select,
					{[operate.target]: array ? [...array, operate.args] : [operate.args]});
			} else if (operate.action == 'delete') {
				const index = operate.position;
				return Object.assign({}, select,
					{[operate.target]: [...array.slice(0, index), ...array.slice(index + 1)]}); 
			} else {
				return select;
			}
		default:
			return select;
	}
}