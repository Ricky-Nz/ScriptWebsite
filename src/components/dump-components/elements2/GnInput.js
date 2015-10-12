import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { OverlayTrigger, Button, Overlay, Popover, Input, Tooltip } from 'react-bootstrap';

class GnInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showError: false
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ showError: false });
	}
	render() {
		const { regx, error, ...inputProps } = this.props;

		return (
			<div style={{ position: 'relative' }}>
				<Input ref='input' {...inputProps} onBlur={e => this.validate(e.target.validity.valid)}/>
				<Overlay show={this.state.showError} placement='top' container={this}
					target={() => ReactDOM.findDOMNode(this.refs.input)}>
					<Popover id='input-popup'>
						<span style={{color: 'red'}}>{this.props.error}</span>
					</Popover>
				</Overlay>
			</div>
		);
	}
	validate(valid) {
		if (!valid && !this.state.showError) {
			this.setState({ showError: true });
			return false;
		} else if (valid && this.state.showError) {
			this.setState({ showError: false });
			return false;
		}

		return true;
	}
	getValue() {
		return this.refs.input.getValue();
	}
}

GnInput.propTyles = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	defaultValue: PropTypes.string,
	regx: PropTypes.string,
	error: PropTypes.string
};

GnInput.defaultProps = {
	type: 'text'
};

export default GnInput;