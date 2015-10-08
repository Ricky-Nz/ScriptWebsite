import { TOGGLE_DIALOG } from '../actions/dialog-actions';
import {
	CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER,
	CREATE_PACKAGE, DELETE_PACKAGE,
	CREATE_REPORT, DELETE_REPORT,
	DELETE_SCRIPT
} from '../actions/crud-actions';
import { LOGIN, REGISTER } from '../actions/user-actions';
import _ from 'underscore';

export default function (dialog = {}, action) {
	switch(action.type) {
		case TOGGLE_DIALOG:
			if (action.show) {
				return Object.assign({}, _.omit(action, 'type'));
			} else {
				return Object.assign({}, dialog, { show: false });
			}
		case CREATE_PARAMETER:
		case UPDATE_PARAMETER:
		case DELETE_PARAMETER:
		case CREATE_PACKAGE:
		case DELETE_PACKAGE:
		case CREATE_REPORT:
		case DELETE_REPORT:
		case DELETE_SCRIPT:
		case LOGIN:
		case REGISTER:
			return (action.finished && !action.error) ?
				Object.assign({}, dialog, { show: false }) : dialog;
		default:
			return dialog;
	}
}