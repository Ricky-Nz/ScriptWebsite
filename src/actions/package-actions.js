import { CALL_API } from '../middlewares/backendApiMiddleware';

export const CREATE_PACKAGE = 'CREATE_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const LOAD_PACKAGES = 'LOAD_PACKAGES';

export function createPackage (title, file) {
	return {
		[CALL_API]: {
			method: 'post',
			url: '/Packages',
			field: { title },
			file: file,
			token: true,
			action: CREATE_PACKAGE
		}
	};
}

export function deletePackage (id) {
	return {
		[CALL_API]: {
			method: 'del',
			url: `/Packages/${id}`,
			token: true,
			action: DELETE_PACKAGE
		}
	};
}

export function loadPackages (userId, skip) {
	return {
		[CALL_API]: {
			method: 'get',
			url: `/Testers/${userId}/packages`,
			token: true,
			query: { filter: JSON.stringify({ skip: skip, limit: 10 }) },
			action: LOAD_PACKAGES
		}
	};
}

