import { CALL_API } from '../middlewares/backendApiMiddleware';
export const CHANGE_SECTION = 'CHANGE_SECTION';
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