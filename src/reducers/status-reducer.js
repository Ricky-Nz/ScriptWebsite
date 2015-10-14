import { SHOW_DIALOG, DISMISS_DIALOG } from '../actions/dialog-actions';
import {
	CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS,
	CREATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES,
	DELETE_REPORT, LOAD_REPORTS, GET_REPORT,
	CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS, GET_SCRIPT
} from '../actions/crud-actions';
import { LOGIN, REGISTER } from '../actions/user-actions';
import { CHANGE_SECTION } from '../actions/app-actions';
import _ from 'underscore';

export default function (status = {}, action) {
	switch(action.type) {
		case SHOW_DIALOG:
			return Object.assign({}, status, { dialogShow: true, dialogLabel: action.label });
		case DISMISS_DIALOG:
			return Object.assign({}, status, { dialogShow: false });
		case CREATE_PARAMETER:
		case UPDATE_PARAMETER:
		case DELETE_PARAMETER:
		case CREATE_PACKAGE:
		case DELETE_PACKAGE:
		case DELETE_REPORT:
		case CREATE_SCRIPT:
		case UPDATE_SCRIPT:
		case DELETE_SCRIPT:
		case LOGIN:
		case REGISTER:
			let newStatus = { submitting: !action.finished, error: action.error };
			if (action.finished && !action.error) {
				newStatus.dialogShow = false;
				if (action.type == DELETE_SCRIPT
						|| action.type == DELETE_REPORT
						|| action.type == DELETE_PACKAGE
						|| action.type == DELETE_PARAMETER) {
					newStatus.skip = status.skip - 1;
					newStatus.total = status.total - 1;
				}
			}

			return Object.assign({}, status, newStatus);
		case GET_REPORT:
		case GET_SCRIPT:
			return Object.assign({}, status, { getting: !action.finished, error: null });
		case LOAD_SCRIPTS:
		case LOAD_REPORTS:
		case LOAD_PACKAGES:
		case LOAD_PARAMETERS:
			if (action.finished && !action.error) {
				return Object.assign({}, status, { querying: false,
					total: action.result.total, skip: action.result.skip + action.result.data.length, error: null });
			} else {
				return Object.assign({}, status, { querying: !action.finished, error: action.error })
			}
		case CHANGE_SECTION:
			return Object.assign({}, status, { section: action.data });
		default:
			return status;
	}
}

