import { CALL_API } from '../middlewares/backendApiMiddleware';

export const CREATE_REPORT = 'CREATE_REPORT';
export const DELETE_ERPORT = 'DELETE_ERPORT';
export const LOAD_ERPORTS = 'LOAD_ERPORTS';

export function createReport (title, file) {
	return {
		[CALL_API]: {
			method: 'post',
			url: '/Folders',
			field: { title },
			file: file,
			token: true,
			action: CREATE_REPORT
		}
	};
}

export function deleteReport (id) {
	return {
		[CALL_API]: {
			method: 'del',
			url: `/Folders/${id}`,
			token: true,
			action: DELETE_ERPORT
		}
	};
}

export function loadReports (userId, skip) {
	return {
		[CALL_API]: {
			method: 'get',
			url: `/Testers/${userId}/reports`,
			token: true,
			query: { filter: JSON.stringify({ skip: skip, limit: 10 }) },
			action: LOAD_ERPORTS
		}
	};
}

