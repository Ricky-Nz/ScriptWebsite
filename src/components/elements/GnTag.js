import React, { Component, PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import GnIcon from './GnIcon';

class GnTag extends Component {
	render() {
		const iconStyle = {
			margin: 4
		};

		return <Label bsStyle={this.props.bsStyle}>{this.props.label}<GnIcon style={iconStyle} icon='times'/></Label>;
	}
}

GnTag.propTypes = {
	label: PropTypes.string.isRequired,
	bsStyle: PropTypes.string
};

export default GnTag;