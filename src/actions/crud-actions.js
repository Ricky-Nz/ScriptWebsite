import { CALL_API } from '../middlewares/backendApiMiddleware';

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const UPDATE_FOLDER = 'UPDATE_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const LOAD_FOLDERS = 'LOAD_FOLDERS';
export const SEARCH_FOLDERS = 'SEARCH_FOLDERS';

export const CREATE_PARAMETER = 'CREATE_PARAMETER';
export const UPDATE_PARAMETER = 'UPDATE_PARAMETER';
export const DELETE_PARAMETER = 'DELETE_PARAMETER';
export const LOAD_PARAMETERS = 'LOAD_PARAMETERS';
export const SEARCH_PARAMETERS = 'SEARCH_PARAMETERS';

export const CREATE_PACKAGE = 'CREATE_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const LOAD_PACKAGES = 'LOAD_PACKAGES';
export const SEARCH_PACKAGES = 'SEARCH_PACKAGES';

export const CREATE_REPORT = 'CREATE_REPORT';
export const DELETE_ERPORT = 'DELETE_REPORT';
export const LOAD_REPORTS = 'LOAD_REPORTS';
export const SEARCH_REPORTS= 'SEARCH_REPORTS';

export function createFolder (item) {
	return createItem('/folders', item, CREATE_FOLDER);
}

export function createParameter (item) {
	return createItem('/parameters', item, CREATE_PARAMETER);
}

export function createPackage (field, file) {
	return uploadItem('/containers/:userId/upload', file, field, CREATE_PACKAGE);
}

export function createReport (title, file) {
	return uploadItem('/containers/:userId/upload', file, { title }, CREATE_REPORT);
}

export function updateFolder (id, item) {
	return updateItem(`/folders/${id}`, item, UPDATE_FOLDER);
}

export function updateParameter (id, item) {
	return updateItem(`/parameters/${id}`, item, UPDATE_PARAMETER);
}

export function deleteFolder (id) {
	return deleteItem(`/folders/${id}`, id, DELETE_FOLDER);
}

export function deleteParameter (id) {
	return deleteItem(`/parameters/${id}`, id, DELETE_PARAMETER);
}

export function deletePackage (id) {
	return deleteItem(`/packages/${id}`, id, DELETE_PACKAGE);
}

export function deleteReport (id) {
	return deleteItem(`/reports/${id}`, id, DELETE_REPORT);
}

export function loadFolders (skip) {
	return queryItems('/testers/:userId/folders', skip, LOAD_FOLDERS);
}

export function loadParameters (skip) {
	return queryItems('/testers/:userId/parameters', skip, LOAD_PARAMETERS);
}

export function loadPackages (skip) {
	return queryItems('/testers/:userId/packages', skip, LOAD_PACKAGES);
}

export function loadReports (skip) {
	return queryItems('/testers/:userId/reports', skip, LOAD_REPORTS);
}

export function searchFolders (searchText) {
	return searchItems('/testers/:userId/folders', searchText, SEARCH_FOLDERS, 'title');
}

export function searchParameters (searchText) {
	return searchItems('/testers/:userId/parameters', searchText, SEARCH_PARAMETERS, 'key', 'value');
}

export function searchPackages (searchText) {
	return searchItems('/testers/:userId/packages', searchText, SEARCH_PACKAGES, 'title', 'description');
}

export function searchReports (searchText) {
	return searchItems('/testers/:userId/reports', searchText, SEARCH_REPORTS, 'title');
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

function queryItems (path, skip, action) {
	return {
		[CALL_API]: {
			method: 'get',
			url: path,
			token: true,
			query: { filter: JSON.stringify({ skip: skip, limit: 10 }) },
			action: action
		}
	};
}

function searchItems (path, searchText, action, ...searchKeys) {
	if (searchText && searchText.length > 0) {
		const selection = searchKeys.map(key => ({[key]: {regexp: searchText}}));

		return {
			[CALL_API]: {
				method: 'get',
				url: path,
				token: true,
				query: { filter: JSON.stringify({ where: { or: selection}, limit: 10 }) },
				action: action,
				args: searchText
			}
		};
	} else {
		return {
			type: action,
			finished: true,
			args: null
		};
	}
}


