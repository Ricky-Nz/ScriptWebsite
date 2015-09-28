import _ from 'underscore';
import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS, SEARCH_FOLDERS,
		CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS, SEARCH_PARAMETERS,
		CREATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES, SEARCH_PACKAGES,
		CREATE_REPORT, DELETE_REPORT, LOAD_REPORTS, SEARCH_REPORTS } from '../actions/crud-actions';

export function folders (datas = [], action) {
	return arrayReducer(datas, action, CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS);
}

export function packages (datas = [], action) {
	return arrayReducer(datas, action, CREATE_PACKAGE, null, DELETE_PACKAGE, LOAD_PACKAGES);
}

export function parameters (datas = [], action) {
	return arrayReducer(datas, action, CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS);
}

export function reports (datas = [], action) {
	return arrayReducer(datas, action, CREATE_REPORT, null, DELETE_REPORT, LOAD_REPORTS);
}

export function searchResults (datas = [], action) {
	if (!action.finished) return datas;

	switch(action.type) {
		case SEARCH_FOLDERS:
		case SEARCH_PARAMETERS:
		case SEARCH_PACKAGES:
		case SEARCH_REPORTS:
			return (action.result && action.result.data) ? action.result.data : datas;
		default:
			return datas;
	}
	
}

function arrayReducer (datas, action, create, update, del, query) {
	if (!action.finished || action.error) return datas;

	switch(action.type) {
		case create:
			return [action.result, ...datas];
		case update: {
			const index = _.findIndex(datas, data => data.id === action.result.id);
			return [...datas.slice(0, index), action.result, ...datas.slice(index + 1)];
		}
		case del: {
			const index = _.findIndex(datas, data => data.id === action.args);
			return [...datas.slice(0, index), ...datas.slice(index + 1)];
		}
		case query:
			return action.result.data;
		default:
			return datas;
	}
}

