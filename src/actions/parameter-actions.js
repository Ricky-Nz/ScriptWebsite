import { CALL_API } from '../middlewares/backendApiMiddleware';

export const CREATE_PARAMETER = 'CREATE_PARAMETER';
export const UPDATE_PARAMETER = 'UPDATE_PARAMETER';
export const DELETE_PARAMETER = 'DELETE_PARAMETER';
export const LOAD_PARAMETERS = 'LOAD_PARAMETERS';
export const SEARCH_PARAMETERS = 'SEARCH_PARAMETERS';

export function createParameter (item) {
	return {
		[CALL_API]: {
			method: 'post',
			url: '/Parameters',
			body: item,
			token: true,
			action: CREATE_PARAMETER
		}
	};
}

export function updateParameter (id, item) {
	return {
		[CALL_API]: {
			method: 'put',
			url: `/Parameters/${id}`,
			body: item,
			token: true,
			action: UPDATE_PARAMETER
		}
	};
}

export function deleteParameter (id) {
	return {
		[CALL_API]: {
			method: 'del',
			url: `/Parameters/${id}`,
			token: true,
			action: DELETE_PARAMETER
		}
	};
}

export function loadParameters (skip) {
	return {
		[CALL_API]: {
			method: 'get',
			url: '/Testers/:userId/parameters',
			token: true,
			query: { filter: JSON.stringify({ skip: skip, limit: 10 }) },
			action: LOAD_PARAMETERS
		}
	};
}

export function searchParameters (searchText) {
	if (searchText && searchText.length > 0) {
		return {
			[CALL_API]: {
				method: 'get',
				url: '/Testers/:userId/parameters',
				token: true,
				query: { filter: JSON.stringify({ where: { or: [{key: {regexp: searchText}}, {value: {regexp: searchText}}]}, limit: 10 }) },
				action: SEARCH_PARAMETERS
			},
			args: searchText
		};
	} else {
		return {
			type: SEARCH_PARAMETERS,
			finished: true,
			args: null
		};
	}
}

