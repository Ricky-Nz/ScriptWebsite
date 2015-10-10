import { CALL_API } from '../middlewares/backendApiMiddleware';
export const CHANGE_SECTION = 'CHANGE_SECTION';
export const EDIT_SCRIPT = 'EDIT_SCRIPT';
export const UPDATE_TAG_SELECTION = 'UPDATE_TAG_SELECTION';
export const GET_VERSIONS = 'GET_VERSIONS';

export function getVersions() {
    return {
        [CALL_API]: {
            method: 'GET',
            url: '/testers/versions',
            token: true,
            action: GET_VERSIONS
        }
    }
}

export function changeSection (target) {
    return {
        type: CHANGE_SECTION,
        data: target
    };
}

export function editScript (update) {
	return {
		type: EDIT_SCRIPT,
		data: update
	};
}

export function updateTagSelection (update) {
    return {
        type: UPDATE_TAG_SELECTION,
        data: update
    };
}