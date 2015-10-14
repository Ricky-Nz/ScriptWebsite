import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Overlay, Popover, Input } from 'react-bootstrap';
import GnIcon from './GnIcon';

class GnInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showHelp: false
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ showHelp: false });
	}
	render() {
		const { regex, help, icon, ...inputProps } = this.props;

		return (
			<div style={{ position: 'relative' }}>
				<Input ref='input' {...inputProps} bsStyle={this.state.showHelp ? 'error' : null} addonBefore={icon ? <GnIcon icon={icon}/> : null}
					onBlur={e => this.validate(e.target.validity.valid)}/>
				<Overlay show={this.state.showHelp} placement='top' container={this}
					target={() => ReactDOM.findDOMNode(this.refs.input)}>
					<Popover id='input-popup'>
						<span style={{color: 'red'}}>{this.props.help}</span>
					</Popover>
				</Overlay>
			</div>
		);
	}
	validate() {
		if (this.props.regex) {
			const regex = new RegExp(this.props.regex);
			const valid = regex.test(this.refs.input.getValue());
			if (!valid && !this.state.showHelp) {
				this.setState({ showHelp: true });
			} else if (valid && this.state.showHelp) {
				this.setState({ showHelp: false });
			}

			return valid;
		}

		return true;
	}
	getValue() {
		return this.refs.input.getValue();
	}
}

GnInput.propTyles = {
	icon: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	defaultValue: PropTypes.string,
	regex: PropTypes.string,
	help: PropTypes.string
};

GnInput.defaultProps = {
	type: 'text'
};

export default GnInput;