import { CALL_API } from '../middlewares/backendApiMiddleware';

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const UPDATE_FOLDER = 'UPDATE_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const LOAD_FOLDERS = 'LOAD_FOLDERS';

export function createFolder (item) {
	return {
		[CALL_API]: {
			method: 'post',
			url: '/Folders',
			body: item,
			token: true,
			action: CREATE_FOLDER
		}
	};
}

export function updateFolder (id, item) {
	return {
		[CALL_API]: {
			method: 'put',
			url: `/Folders/${id}`,
			body: item,
			token: true,
			action: UPDATE_FOLDER
		}
	};
}

export function deleteFolder (id) {
	return {
		[CALL_API]: {
			method: 'del',
			url: `/Folders/${id}`,
			token: true,
			action: DELETE_FOLDER
		}
	};
}

export function loadFolders (skip) {
	return {
		[CALL_API]: {
			method: 'get',
			url: '/Testers/:userId/folders',
			token: true,
			query: { filter: JSON.stringify({ skip: skip, limit: 10 }) },
			action: LOAD_FOLDERS
		}
	};
}


