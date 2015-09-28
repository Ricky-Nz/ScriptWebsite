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

export const sectionConfigs = {
	folders: {
		searchbarHint: 'search for folder title',
		listHeader: 'Script Folders',
		listPrimaryKey: 'title',
		listSecondaryKey: 'date',
		listIcon: 'folder',
		display: { xs: 5, sm: 4, md: 3 }
	},
	parameters: {
		searchbarHint: 'search for parameter key or value ',
		listHeader: 'Golabel Parameters',
		listPrimaryKey: 'key',
		listSecondaryKey: 'value',
		listIcon: 'settings_ethernet',
		display: { xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2, lg: 6, lgOffset: 3 }
	},
	packages: {
		searchbarHint: 'search for package title or descriptions',
		listHeader: 'Installation Packages',
		listPrimaryKey: 'title',
		listSecondaryKey: 'description',
		listIcon: 'android',
		display: { xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2, lg: 6, lgOffset: 3 }
	},
	reports: {
		searchbarHint: 'search for report title',
		listHeader: 'Test Reports',
		listPrimaryKey: 'title',
		listSecondaryKey: 'date',
		listIcon: 'description',
		display: { xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2, lg: 6, lgOffset: 3 }
	}
};