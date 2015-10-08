import _ from 'underscore';
import {
	CREATE_PARAMETER, UPDATE_PARAMETER, DELETE_PARAMETER, LOAD_PARAMETERS,
	CREATE_PACKAGE, DELETE_PACKAGE, LOAD_PACKAGES,
	CREATE_REPORT, DELETE_REPORT, LOAD_REPORTS,
	CREATE_SCRIPT, UPDATE_SCRIPT, DELETE_SCRIPT, LOAD_SCRIPTS
} from '../actions/crud-actions';

export default function (arrayData = { datas: [] }, action) {
	let penndingAction;
	switch(action.type) {
		case CREATE_SCRIPT:
		case CREATE_PARAMETER:
		case CREATE_PACKAGE:
		case CREATE_REPORT:
			penndingAction = 'create';
			break;
		case UPDATE_SCRIPT:
		case UPDATE_PARAMETER:
			penndingAction = 'update';
			break
		case DELETE_SCRIPT:
		case DELETE_PARAMETER:
		case DELETE_PACKAGE:
		case DELETE_REPORT:
			penndingAction = 'delete';
			break;
		case LOAD_SCRIPTS:
		case LOAD_PACKAGES:
		case LOAD_PARAMETERS:
		case LOAD_REPORTS:
			penndingAction = 'load';
			break;
		default:
			return arrayData;
	}

	let newState;
	if (penndingAction == 'load') {
		newState = { loading: !action.finished, error: action.error };
		if (action.finished && !action.error) {
			newState.skip = action.result.skip;
			newState.total = action.result.total;
		}
	} else {
		newState = { updating: !action.finished, error: action.error };
	}

	if (action.finished) {
		let newDatas;
		if (!action.error) {
			switch(penndingAction) {
				case 'create':
					newDatas = arrayUnshift(arrayData.datas, action);
					break;
				case 'update':
					newDatas = arrayUpdate(arrayData.datas, action);
					break;
				case 'delete':
					newDatas = arrayDelete(arrayData.datas, action);
					if (arrayData.skip > 0) {
						newState.skip = arrayData.skip - 1;
					}
					break;
				case 'load':
					newDatas = arrayLoad(arrayData.datas, action);
					break;
			}
		}

		return Object.assign({}, arrayData, newState, newDatas ? { datas: newDatas } : null );
	} else {
		return Object.assign({}, arrayData, newState);
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
	if (action.finished) {
		if (action.result.skip == 10) {
			return [...action.result.data];
		} else {
			return [...datas, ...action.result.data];
		}
	} else if (!action.args) {
		return [];
	} else {
		return datas;
	}
}

