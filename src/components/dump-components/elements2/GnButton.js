import React, { PropTypes } from 'react';
import GnIcon from './GnIcon';
import { gnStyles, gnSizes } from './common';

let GnButton = props => {
	const { label, active, icon, gnStyle, gnSize, ...others } = props;
	let iconView = null;
	if (props.icon) {
		const iconSize = gnSizes[gnSizes.indexOf(gnSize) - 1];
		const iconMargin = label ? {marginRight: 5} : null;
		iconView = props.active ? <GnIcon icon='spinner' size={iconSize} style={iconMargin} active/>
			: <GnIcon icon={icon} size={iconSize} style={iconMargin}/>;
	}

	return (
		<button className={`btn btn-${gnStyle} btn-${gnSize}`} type='button' {...others}>
			{iconView}
			{label}
		</button>
	);
}

GnButton.propTypes = {
	label: PropTypes.string,
	icon: PropTypes.string,
	active: PropTypes.bool,
	gnSize: PropTypes.oneOf(gnSizes),
	gnStyle: PropTypes.oneOf(gnStyles)
};

GnButton.defaultProps = {
	gnStyle: 'default',
	gnSize: 'sm'
};

export default GnButton;