import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { OverlayTrigger, Button, Overlay, Popover, Input, Tooltip } from 'react-bootstrap';

class GnInput2 extends Component {
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
				<Input ref='target' {...inputProps} onBlur={e => this.validate(e.target.validity.valid)}/>
				<Overlay show={this.state.showError} placement='top' container={this}
					target={() => ReactDOM.findDOMNode(this.refs.target)}>
					<Popover id='input-popup'>
						<span style={{color: 'red'}}>{this.props.error}</span>
					</Popover>
				</Overlay>
			</div>
		);
	}
	validate(valid) {
		if (!valid && !this.state.showError) {
			return this.setState({ showError: true });
		} else if (valid && this.state.showError) {
			return this.setState({ showError: false });
		}
	}
}

GnInput2.propTyles = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	defaultValue: PropTypes.string,
	regx: PropTypes.string,
	error: PropTypes.string
};

GnInput2.defaultProps = {
	type: 'text'
};

export default GnInput2;