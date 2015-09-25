import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS } from '../actions/folder-actions';

export default function (state = {}, action) {
	switch(action.type) {
		case CREATE_FOLDER: return Object.assign({}, state, { creating: !action.finished, error: action.error });
		case UPDATE_FOLDER: return Object.assign({}, state, { updating: !action.finished, error: action.error });
		case DELETE_FOLDER: return Object.assign({}, state, { deleting: !action.finished, error: action.error });
		case LOAD_FOLDERS: return Object.assign({}, state, { loading: !action.finished, error: action.error });
	}
}