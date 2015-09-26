import { Component } from 'react';
import _ from 'underscore';

export function extratProps (source, Element) {
	let result = {};
	for (const key in Element.propTypes) {
		result[key] = source[key];
	}
	return result;
}

export function combinePropTypes (...elements) {
	let ownProps;
	if (typeof elements[elements.length - 1] !== 'function') {
		ownProps = elements.splice(elements.length - 1)[0];
	}

	return Object.assign({}, ...elements.map(element => element.propTypes), ownProps);
}

export function arrayAppend (datas, target) {
	return [...datas, target];
}

export function arrayUpdate (datas, target) {
	const index = _.findIndex(datas, data => data.id === target.id);
	return [...datas.slice(0, index), target, ...datas.slice(index + 1)];
}

export function arrayDelete (datas, targetId) {
	const index = _.findIndex(datas, data => data.id === targetId);
	return [...datas.slice(0, index), ...datas.slice(index + 1)];
}

export function stateChange (state, stateName, action) {
	return Object.assign({}, state, { [stateName]: !action.finished, error: action.error });
}

export function paginationStateChange (state, stateName, action) {
	if (action.finished) {
		return Object.assign({}, state, { [stateName]: !action.finished, error: action.error,
					newAction: true, total: action.result.total, skip: action.result.skip });
	} else {
		return Object.assign({}, state, { [stateName]: !action.finished, error: null });
	}
}


