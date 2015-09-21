import { Component } from 'react';

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