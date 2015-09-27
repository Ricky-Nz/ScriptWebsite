import { SHOW_DIALOG, DISMISS_DIALOG } from '../actions/dialog-actions';
import { CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT } from '../actions/script-actions';
import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER } from '../actions/folder-actions';
import { CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER } from '../actions/parameter-actions';
import { CREATE_PACKAGE, DELETE_PACKAGE } from '../actions/package-actions';
import { CREATE_REPORT, DELETE_REPORT } from '../actions/report-actions';

export default function (state = {}, action) {
	switch(action.type) {
		case SHOW_DIALOG:
			return Object.assign({}, state, { title: action.title, fields: action.fields, showDialog: true });
		case DISMISS_DIALOG:
			return Object.assign({}, state, { showDialog: false });
		case CREATE_SCRIPT:
		case UPDATE_SCRIPT:
		case DELETE_SCRIPT:
		case CREATE_FOLDER:
		case UPDATE_FOLDER:
		case DELETE_FOLDER:
		case CREATE_PARAMETER:
		case UPDATE_PARAMETER:
		case DELETE_PARAMETER:
		case CREATE_PACKAGE:
		case DELETE_PACKAGE:
		case CREATE_REPORT:
		case DELETE_REPORT:
			return Object.assign({}, state, { updating: !action.finished, error: action.error },
						action.finished && !action.error ? { showDialog: false} : null);
		default:
			return state;
	}
}