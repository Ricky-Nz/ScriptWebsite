import { CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS } from '../actions/script-actions';
import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS } from '../actions/folder-actions';
import { CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES } from '../actions/package-actions';
import { CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS } from '../actions/parameter-actions';
import { CREATE_REPORT, UPDATE_REPORT, DELETE_REPORT, LOAD_REPORTS } from '../actions/report-actions';

export function scripts (datas = [], action) {
	return arrayReducer(datas, action, CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS);
}

export function folders (datas = [], action) {
	return arrayReducer(datas, action, CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS);
}

export function packages (datas = [], action) {
	return arrayReducer(datas, action, CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES);
}

export function parameters (datas = [], action) {
	return arrayReducer(datas, action, CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS);
}

export function reports (datas = [], action) {
	return arrayReducer(datas, action, CREATE_REPORT, UPDATE_REPORT, DELETE_REPORT, LOAD_REPORTS);
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
			const index = _.findIndex(datas, data => data.id === action.result);
			return [...datas.slice(0, index), ...datas.slice(index + 1)];
		}
		case query:
			return action.result.data;
		default:
			return datas;
	}
}

