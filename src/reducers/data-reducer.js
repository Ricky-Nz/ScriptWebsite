import _ from 'underscore';
import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS,
		CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS,
		CREATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES,
		CREATE_REPORT, DELETE_REPORT, LOAD_REPORTS,
		CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, GET_SCRIPT, LOAD_SCRIPTS, CLEAR_SCRIPT } from '../actions/crud-actions';

export function script (script = {}, action) {
	switch(action.type) {
		case GET_SCRIPT:
			if (action.finished && !action.error) {
				if (action.result && action.result.content) {
					try { action.result.content = JSON.parse(action.result.content); } catch(e){}
				}
				return Object.assign({}, action.result);
			} else {
				return script;
			}
		case CLEAR_SCRIPT:
			return {};
		case DELETE_SCRIPT:
			if (action.finished && !action.error) {
				return {};
			} else {
				return script;
			}
		default:
			return script;
	}
}

export function scriptState (state = {}, action) {
	switch(action.type) {
		case CREATE_SCRIPT:
			return Object.assign({}, state, { submiting: !action.finished, error: action.error })
		case UPDATE_SCRIPT:
			return Object.assign({}, state, { submiting: !action.finished, error: action.error })
		case GET_SCRIPT:
			return Object.assign({}, state, { loading: !action.finished, error: action.error })
		case DELETE_SCRIPT:
			return Object.assign({}, state, { deleting: !action.finished, error: action.error })
		default:
			return state;
	}
}

export function mainDatas (datas = [], action) {
	switch(action.type) {
		case CREATE_FOLDER:
		case CREATE_PARAMETER:
		case CREATE_PACKAGE:
		case CREATE_REPORT:
			return arrayUnshift(datas, action);
		case UPDATE_FOLDER:
		case UPDATE_PARAMETER:
			return arrayUpdate(datas, action);
		case DELETE_FOLDER:
		case DELETE_PARAMETER:
		case DELETE_PACKAGE:
		case DELETE_REPORT:
			return arrayDelete(datas, action);
		case LOAD_FOLDERS:
		case LOAD_PACKAGES:
		case LOAD_PARAMETERS:
		case LOAD_REPORTS:
			return arrayLoad(datas, action);
		default:
			return datas;
	}
}

export function secondaryDatas (datas = [], action) {
	switch(action.type) {
		case CREATE_SCRIPT:
			return arrayUnshift(datas, action);
		case UPDATE_SCRIPT:
			return arrayUpdate(datas, action);
		case DELETE_SCRIPT:
			return arrayDelete(datas, action);
		case LOAD_SCRIPTS:
			return arrayLoad(datas, action);
		default:
			return datas;
	}
}

function arrayUnshift (datas, action) {
	if (!action.finished || action.error) {
		return datas;
	}
	return [action.result, ...datas];
}

function arrayUpdate (datas, action) {
	if (!action.finished || action.error) {
		return datas;
	}
	const index = _.findIndex(datas, data => data.id === action.result.id);
	return [...datas.slice(0, index), action.result, ...datas.slice(index + 1)];
}

function arrayDelete (datas, action) {
	if (!action.finished || action.error) {
		return datas;
	}
	const index = _.findIndex(datas, data => data.id === action.args);
	return [...datas.slice(0, index), ...datas.slice(index + 1)];
}

function arrayLoad (datas, action) {
	if (action.finished) {
		return [...datas, ...action.result.data]
	} else if (!action.args) {
		return [];
	} else {
		return datas;
	}
}

