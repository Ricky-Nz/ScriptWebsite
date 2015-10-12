import React, { PropTypes } from 'react';
import { gnSizes } from './common';

let GnIcon = props => {
	const iconSize = ['fa-lg', 'fa-2x', 'fa-3x', 'fa-4x', 'fa-5x'][gnSizes.indexOf(props.size)];

	return (
		<i style={props.style} className={`fa fa-${props.icon} ${iconSize} ${props.active ? 'fa-pulse' : ''}`}></i>
	);
};

GnIcon.propTypes = {
	size: PropTypes.oneOf(gnSizes),
	icon: PropTypes.string.isRequired,
	active: PropTypes.bool
};

GnIcon.defaultProps = {
	size: 'xs'
};

export default GnIcon;