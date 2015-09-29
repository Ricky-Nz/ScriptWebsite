import _ from 'underscore';

export function extratProps (source, Element) {
	return _.pick(source, {..._.keys(Element.propTypes)});
}

export function combinePropTypes (...elements) {
	let ownProps;
	if (typeof elements[elements.length - 1] !== 'function') {
		ownProps = elements.splice(elements.length - 1)[0];
	}

	return Object.assign({}, ...elements.map(element => element.propTypes), ownProps);
}