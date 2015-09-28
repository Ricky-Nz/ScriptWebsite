import { SHOW_DIALOG, DISMISS_DIALOG } from '../actions/dialog-actions';
import { LOGIN, LOGOUT, REGISTER } from '../actions/user-actions';
import { CREATE_FOLDER, UPDATE_FOLDER, LOAD_FOLDERS, SEARCH_FOLDERS,
		CREATE_PARAMETER, UPDATE_PARAMETER, LOAD_PARAMETERS, SEARCH_PARAMETERS,
		CREATE_PACKAGE, LOAD_PACKAGES, SEARCH_PACKAGES,
		CREATE_REPORT, LOAD_REPORTS, SEARCH_REPORTS } from '../actions/crud-actions';

export function app (state = {}, action) {
	switch(action.type) {
		case LOGIN: {
			if (action.finished) {
	            return Object.assign({}, state, {
	            	loggingIn: false,
	            	error: action.error,
	                access_token: action.result ? action.result.id : null,
	                userId: action.result ? action.result.userId : null
	            });
			} else {
				return Object.assign({}, state, { loggingIn: true, error: null });
			}
		}
		case LOGOUT: {
			if (action.finished) {
	            return Object.assign({}, state, {
	            	loggingOut: false,
	            	error: action.error,
	                access_token: null,
	                userId: null
	            });
			} else {
				return Object.assign({}, state, { loggingOut: true, error: null });	
			}
		}
		default: {
			if (state.error !== action.error) {
				return Object.assign({}, state, { error: action.error });
			} else {
				return state;
			}
		}
	}
}

export function dialog (state = {}, action) {
	switch(action.type) {
		case SHOW_DIALOG:
			return Object.assign({}, state, { id: action.id, title: action.title, fields: action.fields, showDialog: true });
		case DISMISS_DIALOG:
			return Object.assign({}, state, { showDialog: false });
		case CREATE_FOLDER:
		case CREATE_PARAMETER:
		case CREATE_PACKAGE:
		case CREATE_REPORT:
		case UPDATE_FOLDER:
		case UPDATE_PARAMETER:
			return Object.assign({}, state, { updating: !action.finished, error: action.error },
						action.finished && !action.error ? { showDialog: false} : null);
		default:
			return state;
	}
}

export function foldersPanel (state = {}, action) {
	return queryResultReducer(state, action, LOAD_FOLDERS, SEARCH_FOLDERS);
}

export function parametersPanel (state = {}, action) {
	return queryResultReducer(state, action, LOAD_PARAMETERS, SEARCH_PARAMETERS);
}

export function packagesPanel (state = {}, action) {
	return queryResultReducer(state, action, LOAD_PACKAGES, SEARCH_PACKAGES);
}

export function reportsPanel (state = {}, action) {
	return queryResultReducer(state, action, LOAD_REPORTS, SEARCH_REPORTS);
}

function queryResultReducer (state, action, LOAD_ACTION, SEARCH_ACTION) {
	switch(action.type) {
		case LOAD_ACTION: {
			if (action.finished) {
				return Object.assign({}, state, {
							loading: false,
							error: action.error,
							total: action.result.total,
							skip: action.result.skip });
			} else {
				return Object.assign({}, state, {
							loading: true,
							error: null });
			}
		}
		case SEARCH_ACTION: {
			if (action.finished) {
				return Object.assign({}, state, {
							searching: false,
							searchText: action.args,
							error: action.error});
			} else {
				return Object.assign({}, state, {
							searching: true,
							searchText: action.args,
							error: null });
			}
		}
		default:
			return state;
	}
}




