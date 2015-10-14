import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import GnIcon from './GnIcon';

class GnSpinnerButton extends Component {
	render() {
		return (
            <Button bsStyle={this.props.bsStyle} disabled={this.props.active}
                onClick={this.props.onClick}>
                {this.props.active ? <GnIcon icon='spinner' active/> : null}
                <span style={{margin: '0px 10px'}}>{this.props.label}</span>
            </Button>
		);
	}
}

GnSpinnerButton.propTypes = {
	active: PropTypes.bool,
	onClick: PropTypes.func,
	label: PropTypes.string.isRequired
};

export default GnSpinnerButton;