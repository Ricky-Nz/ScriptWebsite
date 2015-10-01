import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import GnIcon from './GnIcon';
import { extratProps, combinePropTypes } from './componentUtils';

class GnIconButton extends Component {
	render() {
		return (
            <Button {...this.props}>
                <GnIcon {...extratProps(this.props, GnIcon)}/>
                <span style={{marginLeft: 5}}>{this.props.label}</span>
            </Button>
		);
	}
}

GnIconButton.propTypes = combinePropTypes(GnIcon, {
	onClick: PropTypes.func,
	label: PropTypes.string.isRequired
});

export default GnIconButton;