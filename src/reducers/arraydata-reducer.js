import { CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS } from '../actions/script-actions';
import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS } from '../actions/folder-actions';
import { CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES } from '../actions/package-actions';
import { CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS } from '../actions/parameter-actions';
import { CREATE_REPORT, UPDATE_REPORT, DELETE_REPORT, LOAD_REPORTS } from '../actions/report-actions';
import { arrayAppend, arrayUpdate, arrayDelete } from '../utils';

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

function arrayReducer (datas, action, create, update, delete, query) {
	if (!action.finished || action.error) return datas;

	switch(action.type) {
		case create: return arrayAppend(datas, action.result);
		case update: return arrayUpdate(datas, action.result);
		case delete: return arrayDelete(datas, action.result);
		case query: return action.result.datas;
		default:
			return datas;
	}
}

