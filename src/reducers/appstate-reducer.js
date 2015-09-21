/**
 * Created by ruiqili on 19/9/15.
 */
import { USER_LOGIN_STARTED, USER_LOGIN_FINISHED } from '../actions/user-actions';
import { FOLDER_CREATE_STARTED, FOLDER_CREATE_FINISHED ,FOLDER_UPDATE_STARTED, FOLDER_UPDATE_FINISHED, FOLDER_DELETE_STARTED, FOLDER_DELETE_FINISHED, FOLDER_LIST_STARTED, FOLDER_LIST_FINISHED } from '../actions/folder-actions';
 
export default function (app = {}, action) {
    switch(action.type) {
    	case FOLDER_CREATE_STARTED:
    		return Object.assign({}, app, { creatingFolder: true });
    	case FOLDER_CREATE_FINISHED:
    		return Object.assign({}, app, { creatingFolder: false, errorMsg: action.errorMsg });
    	case FOLDER_UPDATE_STARTED:
    		return Object.assign({}, app, { updatingFolder: true });
    	case FOLDER_UPDATE_FINISHED:
    		return Object.assign({}, app, { updatingFolder: false, errorMsg: action.errorMsg });
    	case FOLDER_DELETE_STARTED:
    		return Object.assign({}, app, { deletingFolder: true });
    	case FOLDER_DELETE_FINISHED:
    		return Object.assign({}, app, { deletingFolder: false, errorMsg: action.errorMsg });
    	case FOLDER_LIST_STARTED:
    		return Object.assign({}, app, { loadingFolders: true });
    	case FOLDER_LIST_FINISHED:
    		return Object.assign({}, app, { loadingFolders: false, errorMsg: action.errorMsg });
    	default:
    		return app;
    }
}