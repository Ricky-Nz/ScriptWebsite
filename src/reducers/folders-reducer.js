import { CREATE_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, LOAD_FOLDERS, CREATE_SCRIPT, GET_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS } from '../actions/folder-actions';
import _ from 'underscore';

export default function (folder = {}, action) {
	switch(action.type) {
		case CREATE_FOLDER: {
			if (!action.finished) return Object.assign({}, folder, { creatingFolder: true, error: null });
			if (action.error) return Object.assign({}, folder, { creatingFolder: false, error: error });

			return Object.assign({}, folder, { creatingFolder: false, folders: [...folder.folders, action.result] });
		}
		case UPDATE_FOLDER: {
			if (!action.finished) return Object.assign({}, folder, { updatingFolder: true, error: null });
			if (action.error) return Object.assign({}, folder, { updatingFolder: false, error: error });

			const index = _.findIndex(folder.folders, folder => folder.id === action.result.id);
			return [...folder.folders.slice(0, folder.folders), action.result, ...folder.folders.slice(index + 1)];
		}
		case DELETE_FOLDER: {
			if (!action.finished) return Object.assign({}, folder, { deletingFolder: true, error: null });
			if (action.error) return Object.assign({}, folder, { deletingFolder: false, error: error });

			const index = _.findIndex(folder.folders, folder => folder.id === action.result);
			return [...folders.slice(0, index), ...folders.slice(index + 1)];
		}
		case FOLDER_LOAD_FINISHED: {
			return action.data ? action.data.data : folders;
		}
		default:
			return folders;
	}
}