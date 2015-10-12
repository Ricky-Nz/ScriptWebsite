import _ from 'underscore';

export const gnStyles = ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'];

export const gnSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

export function extratProps (source, Element) {
	return _.pick(source, (value, key) => _.has(Element.propTypes, key))
}

export function combinePropTypes (...elements) {
	let ownProps;
	if (typeof elements[elements.length - 1] !== 'function') {
		ownProps = elements.splice(elements.length - 1)[0];
	}

	return Object.assign({}, ...elements.map(element => element.propTypes), ownProps);
}