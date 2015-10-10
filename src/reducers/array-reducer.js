import _ from 'underscore';
import {
	CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS,
	CREATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES,
	CREATE_REPORT, DELETE_REPORT, LOAD_REPORTS,
	CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS
} from '../actions/crud-actions';
import { CHANGE_SECTION } from '../actions/app-actions';

export default function (array = [], action) {
	if (action.type == CHANGE_SECTION) {
		if (action.data == 'scripteditor') {
			return array;
		} else {
			return [];
		}
	}

	if (!action.finished || action.error) {
		return array;
	}

	switch(action.type) {
		case CREATE_SCRIPT:
		case CREATE_PARAMETER:
		case CREATE_PACKAGE:
		case CREATE_REPORT:
			return arrayUnshift(array, action);
		case UPDATE_SCRIPT:
		case UPDATE_PARAMETER:
			return arrayUpdate(array, action);
		case DELETE_SCRIPT:
		case DELETE_PARAMETER:
		case DELETE_PACKAGE:
		case DELETE_REPORT:
			return arrayDelete(array, action);
		case LOAD_SCRIPTS:
		case LOAD_PACKAGES:
		case LOAD_PARAMETERS:
		case LOAD_REPORTS:
			return arrayLoad(array, action);
		default:
			return array;
	}
}

function arrayUnshift (datas, action) {
	if (!action.finished || action.error) {
		return datas;
	}
	return [action.result, ...datas];
}

function arrayUpdate (datas, action) {
	if (!action.finished || action.error) {
		return datas;
	}
	const index = _.findIndex(datas, data => data.id === action.result.id);
	return [...datas.slice(0, index), action.result, ...datas.slice(index + 1)];
}

function arrayDelete (datas, action) {
	if (!action.finished || action.error) {
		return datas;
	}
	const index = _.findIndex(datas, data => data.id === action.args);
	return [...datas.slice(0, index), ...datas.slice(index + 1)];
}

function arrayLoad (datas, action) {
	if (action.result.skip == 0) {
		return [...action.result.data];
	} else {
		return [...datas, ...action.result.data];
	}
}

