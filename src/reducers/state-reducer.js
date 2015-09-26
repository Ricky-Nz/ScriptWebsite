import { LOGIN, LOGOUT, REGISTER } from '../actions/user-actions';
import { CREATE_SCRIPT, GET_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS } from '../actions/script-actions';
import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS } from '../actions/folder-actions';
import { CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES } from '../actions/package-actions';
import { CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS } from '../actions/parameter-actions';
import { CREATE_REPORT, UPDATE_REPORT, DELETE_REPORT, LOAD_REPORTS } from '../actions/report-actions';
import { CLEAR_ERROR } from '../actions/app-actions';
import { stateChange, paginationStateChange } from '../utils';

export function errorState (state = {}, action) {
	switch(action.type) {
		case CLEAR_ERROR:
			return Object.assign({}, state, { newAction: false });
		default: {
			if (!action.finished) return state;
			return Object.assign({}, state, { error: action.error, newAction: true })
		}
	}
}

export function userState (state = {}, action) {
	switch(action.type) {
		case LOGIN: return stateChange(state, 'loggingIn', action);
		case LOGOUT: return stateChange(state, 'loggingOut', action);
		case REGISTER: return stateChange(state, 'registering', action);
		default:
			return state;
	}
}

export function scriptState (state = {}, action) {
	switch(action.type) {
		case GET_SCRIPT: return stateChange(state, 'getting', action);
		default:
			return stateReducer(state, action, CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS);
	}
}

export function folderState (state = {}, action) {
	return stateReducer(state, action, CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS);
}

export function packageState (state = {}, action) {
	return stateReducer(state, action, CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES);
}

export function parameterState (state = {}, action) {
	return stateReducer(state, action, CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS);
}

export function reportState (state = {}, action) {
	return stateReducer(state, action, CREATE_REPORT, UPDATE_REPORT, DELETE_REPORT, LOAD_REPORTS);
}

function stateReducer (state, action, create, update, del, load) {
	switch(action.type) {
		case create: return stateChange(state, 'creating', action);
		case update: return stateChange(state, 'updating', action);
		case del: return stateChange(state, 'deleting', action);
		case load: return paginationStateChange(state, 'loading', action);
		default:
			return state;
	}
}
