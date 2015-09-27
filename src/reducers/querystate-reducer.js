import { LOGIN, LOGOUT, REGISTER } from '../actions/user-actions';
import { GET_SCRIPT, LOAD_SCRIPTS } from '../actions/script-actions';
import { LOAD_FOLDERS } from '../actions/folder-actions';
import { LOAD_PACKAGES } from '../actions/package-actions';
import { LOAD_PARAMETERS, SEARCH_PARAMETERS } from '../actions/parameter-actions';
import { LOAD_REPORTS } from '../actions/report-actions';
import { stateChange, paginationStateChange, searchChange } from '../utils';

export function errorState (state = {}, action) {
	if (!action.finished) return state;
	return Object.assign({}, state, { message: action.error })
}

export function userState (state = {}, action) {
	switch(action.type) {
		case LOGIN: return stateReducer(state, action, 'loggingIn');
		case LOGOUT: return stateReducer(state, action, 'loggingOut');
		case REGISTER: return stateReducer(state, action, 'registering');
		default:
			return state;
	}
}

export function folderState (state = {}, action) {
	return queryResultReducer(state, action, LOAD_FOLDERS);
}

export function scriptState (state = {}, action) {
	return queryResultReducer(state, action, LOAD_SCRIPTS);
}

export function parameterState (state = {}, action) {
	return queryResultReducer(state, action, LOAD_PARAMETERS, SEARCH_PARAMETERS);
}

export function packageState (state = {}, action) {
	return queryResultReducer(state, action, LOAD_PACKAGES);
}

export function reportState (state = {}, action) {
	return queryResultReducer(state, action, LOAD_REPORTS);
}

function stateReducer (state, action, stateName) {
	return Object.assign({}, state, { [stateName]: !action.finished, error: action.error });
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
							error: action.error,
							searchResults: action.result ? action.result.data : []});
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




