import { FOLDER_CREATE_STARTED, FOLDER_CREATE_FINISHED ,FOLDER_UPDATE_STARTED, FOLDER_UPDATE_FINISHED, FOLDER_DELETE_STARTED, FOLDER_DELETE_FINISHED, FOLDER_LIST_STARTED, FOLDER_LIST_FINISHED } from '../actions/folder-actions';
import _ from 'underscore';

export default function (folders = [], action) {
	// ignore error case
	if (action.errorMsg) return folders;

	switch(action.type) {
		case FOLDER_CREATE_FINISHED:
			return [...folders, action.data];
		case FOLDER_UPDATE_FINISHED:
			const index = _.findIndex(folders, folder => folder.id === action.data.id);
			return [...folders.slice(0, index), action.data, ...folders.slice(index + 1)];
		case FOLDER_DELETE_FINISHED:
			const index = _.findIndex(folders, folder => folder.id === action.data);
			return [...folders.slice(0, index), ...folders.slice(index + 1)];
		default:
			return folders;
	}
}