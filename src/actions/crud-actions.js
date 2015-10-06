import { CALL_API } from '../middlewares/backendApiMiddleware';

export const CREATE_PARAMETER = 'CREATE_PARAMETER';
export const UPDATE_PARAMETER = 'UPDATE_PARAMETER';
export const DELETE_PARAMETER = 'DELETE_PARAMETER';
export const LOAD_PARAMETERS = 'LOAD_PARAMETERS';

export const CREATE_PACKAGE = 'CREATE_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const LOAD_PACKAGES = 'LOAD_PACKAGES';

export const CREATE_REPORT = 'CREATE_REPORT';
export const DELETE_ERPORT = 'DELETE_REPORT';
export const LOAD_REPORTS = 'LOAD_REPORTS';

export const GET_SCRIPT = 'GET_SCRIPT';
export const CREATE_SCRIPT = 'CREATE_SCRIPT';
export const UPDATE_SCRIPT = 'UPDATE_SCRIPT';
export const DELETE_SCRIPT = 'DELETE_SCRIPT';
export const LOAD_SCRIPTS = 'LOAD_SCRIPTS';
export const CLEAR_SCRIPT = 'CLEAR_SCRIPT';

// Scripts:

export function clearScript () {
	return {
		type: CLEAR_SCRIPT
	};
}

export function createScript (data) {
	return createItem('/testers/:userId/scripts', data, CREATE_SCRIPT);
}

export function getScript (id) {
	return getItem(`/testers/:userId/scripts/${id}`, GET_SCRIPT);
}

export function updateScript (id, data) {
	return updateItem(`/testers/:userId/scripts/${id}`, data, UPDATE_SCRIPT);
}

export function deleteScript (id) {
	return deleteItem(`/testers/:userId/scripts/${id}`, id, DELETE_SCRIPT);
}

export function queryScripts (selection) {
	selection = Object.assign({fields: {id: true, title: true, date: true}}, selection);
	return queryItems('/testers/:userId/scripts', selection, LOAD_SCRIPTS);
}

// Parameters:

export function createParameter (data) {
	return createItem('/testers/:userId/parameters', data, CREATE_PARAMETER);
}

export function updateParameter (id, data) {
	return updateItem(`/testers/:userId/parameters/${id}`, data, UPDATE_PARAMETER);
}

export function deleteParameter (id) {
	return deleteItem(`/testers/:userId/parameters/${id}`, id, DELETE_PARAMETER);
}

export function queryParameters (selection) {
	return queryItems('/testers/:userId/parameters', selection, LOAD_PARAMETERS);
}

// Packages:

export function createPackage (data, attachment) {
	return uploadItem('/containers/:userId/upload', attachment, data, CREATE_PACKAGE);
}

export function deletePackage (id) {
	return deleteItem(`/testers/:userId/packages/${id}`, id, DELETE_PACKAGE);
}

export function queryPackages (selection) {
	return queryItems('/testers/:userId/packages', selection, LOAD_PACKAGES);
}

// Reports:

export function createReport (data, attachment) {
	return uploadItem('/containers/:userId/upload', attachment, data, CREATE_REPORT);
}

export function deleteReport (id) {
	return deleteItem(`/testers/:userId/packages/${id}`, id, DELETE_REPORT);
}

export function queryReports (selection) {
	return queryItems('/testers/:userId/reports', selection, LOAD_REPORTS);
}

function createItem (path, item, action) {
	return {
		[CALL_API]: {
			method: 'post',
			url: path,
			body: item,
			token: true,
			action: action
		}
	};
}

function uploadItem (path, file, field, action) {
	return {
		[CALL_API]: {
			method: 'post',
			url: path,
			field: field,
			file: file,
			token: true,
			action: action
		}
	};
}

function updateItem (path, fields, action) {
	return {
		[CALL_API]: {
			method: 'put',
			url: path,
			body: fields,
			token: true,
			action: action
		}
	};
}

function deleteItem (path, id, action) {
	return {
		[CALL_API]: {
			method: 'delete',
			url: path,
			token: true,
			action: action,
			args: id
		}
	};
}

function getItem (path, action) {
	return {
		[CALL_API]: {
			method: 'get',
			url: path,
			token: true,
			action: action
		}
	};
}

function queryItems (path, selection, action) {
	return {
		[CALL_API]: {
			method: 'get',
			url: path,
			token: true,
			query: { filter: JSON.stringify(Object.assign({limit: 10}, selection)) },
			action: action,
			args: selection ? selection.skip : null
		}
	};
}


