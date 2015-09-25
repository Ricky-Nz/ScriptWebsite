import { CALL_API } from '../middlewares/backendApiMiddleware';

export const CREATE_SCRIPT = 'CREATE_SCRIPT';
export const GET_SCRIPT = 'GET_SCRIPT';
export const UPDATE_SCRIPT = 'UPDATE_SCRIPT';
export const DELETE_SCRIPT = 'DELETE_SCRIPT';
export const LOAD_SCRIPTS = 'LOAD_SCRIPTS';

export function createScript (folderId, title) {
	return {
		[CALL_API]: {
			method: 'post',
			url: `/Folders/${folderId}/scripts`,
			body: { title },
			token: true,
			action: CREATE_SCRIPT
		}
	};
}

export function loadScripts (folderId, skip) {
	return {
		[CALL_API]: {
			method: 'get',
			url: `/Folders/${folderId}/scripts`,
			token: true,
			query: { filter: JSON.stringify({ skip: skip, limit: 10, fields: {id: true, title: true, date: true}}) },
			action: LOAD_SCRIPTS
		}
	};
}

export function getScript (folderId, scriptId) {
	return {
		[CALL_API]: {
			method: 'get',
			url: `/Folders/${folderId}/scripts/${scriptId}`,
			token: true,
			action: GET_SCRIPT
		}
	}
}

export function updateScript (folderId, scriptId, title) {
	return {
		[CALL_API]: {
			method: 'put',
			url: `/Folders/${folderId}/scripts/${scriptId}`,
			body: { title },
			token: true,
			action: UPDATE_SCRIPT
		}
	};
}

export function deleteScript (folderId, scriptId) {
	return {
		[CALL_API]: {
			method: 'del',
			url: `/Folders/${folderId}/scripts/${scriptId}`,
			token: true,
			action: DELETE_SCRIPT
		}
	};
}

