import React, { Component, PropTypes } from 'react';

class GnIcon extends Component {
	render() {
		let size;
		switch(this.props.size) {
			case 'xs': size = 'fa-lg'; break;
			case 'sm': size = 'fa-2x'; break;
			case 'md': size = 'fa-3x'; break;
			case 'lg': size = 'fa-4x'; break;
			case 'xl': size = 'fa-5x'; break;
		}

		return <i style={this.props.style} className={`fa fa-${this.props.icon} ${size}${this.props.active ? ' fa-pulse' : ''}`}></i>;
	}
}

GnIcon.propTypes = {
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xlg']),
	icon: PropTypes.string.isRequired,
	active: PropTypes.bool
};

GnIcon.defaultProps = {
	size: 'xs'
};

export default GnIcon;