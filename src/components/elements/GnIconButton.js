import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import GnIcon from './GnIcon';
import { extratProps, combinePropTypes } from './componentUtils';

class GnIconButton extends Component {
	render() {
		return (
            <Button {...this.props}>
                {this.props.active ? <GnIcon icon='spinner' active/> : <GnIcon {...extratProps(this.props, GnIcon)}/>}
                {this.props.label ? <span style={{marginLeft: 5}}>{this.props.label}</span> : null}
            </Button>
		);
	}
}

GnIconButton.propTypes = {
	label: PropTypes.string,
	active: PropTypes.bool
};

GnIconButton.defaultProps = {
	bsSize: 'small'
}

export default GnIconButton;