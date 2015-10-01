import { CALL_API } from '../middlewares/backendApiMiddleware';

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const UPDATE_FOLDER = 'UPDATE_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const LOAD_FOLDERS = 'LOAD_FOLDERS';

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

export const CREATE_SCRIPT = 'CREATE_SCRIPT';
export const UPDATE_SCRIPT = 'UPDATE_SCRIPT';
export const DELETE_SCRIPT = 'DELETE_SCRIPT';
export const LOAD_SCRIPTS = 'LOAD_SCRIPTS';

export function dialogSubmit (fields, id, attachment, label) {
	switch(label) {
		case 'folders':
			if (!id) {
				return createItem('/folders', fields, CREATE_FOLDER);
			} else if (fields) {
				return updateItem(`/folders/${id}`, fields, UPDATE_FOLDER);
			} else {
				return deleteItem(`/folders/${id}`, id, DELETE_FOLDER);
			}
		case 'parameters':
			if (!id) {
				return createItem('/parameters', fields, CREATE_PARAMETER);
			} else if (fields) {
				return updateItem(`/parameters/${id}`, fields, UPDATE_PARAMETER);
			} else {
				return deleteItem(`/parameters/${id}`, id, DELETE_PARAMETER);
			}
		case 'packages':
			if (!id) {
				return uploadItem('/containers/:userId/upload', attachment, fields, CREATE_PACKAGE);
			} else {
				return deleteItem(`/packages/${id}`, id, DELETE_PACKAGE);
			}
		case 'reports':
			if (!id) {
				return uploadItem('/containers/:userId/upload', attachment, fields, CREATE_REPORT);
			} else {
				return deleteItem(`/reports/${id}`, id, DELETE_REPORT);
			}
		case 'scripts':
			if (!id) {
				return createItem('/parameters', fields, CREATE_PARAMETER);
			} else if (fields) {
				return updateItem(`/parameters/${id}`, fields, UPDATE_PARAMETER);
			} else {
				return deleteItem(`/parameters/${id}`, id, DELETE_PARAMETER);
			}
	}
}

export function querySectionData (section, selection) {
	switch(section) {
		case 'folders':
			return queryItems('/testers/:userId/folders', selection, LOAD_FOLDERS);
		case 'parameters':
			return queryItems('/testers/:userId/parameters', selection, LOAD_PARAMETERS);
		case 'packages':
			return queryItems('/testers/:userId/packages', selection, LOAD_PACKAGES);
		case 'reports':
			return queryItems('/testers/:userId/reports', selection, LOAD_REPORTS);
	}
}

export function queryScripts (folderId, selection) {
	return queryItems(`/Folders/${folderId}/scripts`, selection, LOAD_SCRIPTS);
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

function queryItems (path, selection, action) {
	return {
		[CALL_API]: {
			method: 'get',
			url: path,
			token: true,
			query: { filter: JSON.stringify(selection) },
			action: action,
			args: selection.skip
		}
	};
}


