import { CALL_API } from '../middlewares/backendApiMiddleware';

export const FOLDER_CREATE_STARTED = 'FOLDER_CREATE_STARTED';
export const FOLDER_CREATE_FINISHED = 'FOLDER_CREATE_FINISHED';
export const FOLDER_UPDATE_STARTED = 'FOLDER_UPDATE_STARTED';
export const FOLDER_UPDATE_FINISHED = 'FOLDER_UPDATE_FINISHED';
export const FOLDER_DELETE_STARTED = 'FOLDER_DELETE_STARTED';
export const FOLDER_DELETE_FINISHED = 'FOLDER_DELETE_FINISHED';
export const FOLDER_LIST_STARTED = 'FOLDER_LIST_STARTED';
export const FOLDER_LIST_FINISHED = 'FOLDER_LIST_FINISHED';

export function createFolder (title) {
	return {
		[CALL_API]: {
			method: 'post',
			url: '/folders',
			body: { title },
			start: FOLDER_CREATE_STARTED,
			finish: FOLDER_CREATE_FINISHED
		}
	};
}

export function updateFolder (id, title) {
	return {
		[CALL_API]: {
			method: 'put',
			url: '/folders/' + id,
			body: { title },
			start: FOLDER_UPDATE_STARTED,
			finish: FOLDER_UPDATE_FINISHED
		}
	};
}

export function deleteFolder (id) {
	return {
		[CALL_API]: {
			method: 'delete',
			url: '/folders/' + id,
			start: FOLDER_DELETE_STARTED,
			finish: FOLDER_DELETE_FINISHED
		}
	};
}

export function listFolders () {
	return {
		[CALL_API]: {
			method: 'get',
			url: '/folders',
			start: FOLDER_LIST_STARTED,
			finish: FOLDER_LIST_FINISHED
		}
	};
}

