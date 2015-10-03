import { TOGGLE_DIALOG } from '../actions/dialog-actions';
import { LOGIN, LOGOUT, REGISTER } from '../actions/user-actions';
import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS,
		CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS,
		CREATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES,
		CREATE_REPORT, DELETE_REPORT, LOAD_REPORTS, LOAD_SCRIPTS } from '../actions/crud-actions';
import _ from 'underscore';

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
		case TOGGLE_DIALOG:
			return Object.assign({}, _.omit(action, 'type'));
		case LOGIN:
		case REGISTER:
		case CREATE_FOLDER:
		case CREATE_PARAMETER:
		case CREATE_PACKAGE:
		case CREATE_REPORT:
		case UPDATE_FOLDER:
		case UPDATE_PARAMETER:
		case DELETE_FOLDER:
		case DELETE_PARAMETER:
		case DELETE_PACKAGE:
		case DELETE_REPORT:
			return Object.assign({}, state, { processing: !action.finished, error: action.error },
						action.finished && !action.error ? { show: false} : null);
		default:
			return state;
	}
}

export function mainState (state = {}, action) {
	switch(action.type) {
		case LOAD_FOLDERS:
		case LOAD_PARAMETERS:
		case LOAD_PACKAGES:
		case LOAD_REPORTS: {
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
		default:
			return state;
	}
}

export function secondaryState (state = {}, action) {
	switch(action.type) {
		case LOAD_SCRIPTS: {
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
		default:
			return state;
	}
}

