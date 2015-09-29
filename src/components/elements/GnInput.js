import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import GnIcon from './GnIcon';

class GnInput extends Component {
	constructor(props) {
		super(props);
		this.state = this.calculateNewState(props.initialValue);
	}
	componentWillReceiveProps(nextprops) {
		if (!this.state.value) {
			this.setState(this.calculateNewState(nextprops.initialValue));
		}
	}
	render() {
		let bsStyle = (this.state.dirty && typeof this.state.validate !== 'undefined') ? (this.state.validate ? 'success' : 'error') : null;

		return (
			<Input type={this.props.type} label={this.props.label} placeholder={this.props.placeholder}
				help={this.state.error} value={this.state.value} bsStyle={bsStyle} onFocus={() => this.setState({ dirty: true })}
				onBlur={() => this.setState(this.calculateNewState(this.state.value))} onChange={(e) => this.setState({ value: e.target.value })}
				addonBefore={this.props.icon ? <GnIcon icon={this.props.icon}/> : null} />
		);
	}
	calculateNewState(value) {
		let newState = {
			value: value,
			validate: true,
			error: null
		};
		if (this.props.required && !value) {
			newState.validate = false;
			newState.error = `${this.props.label} can not be empty`;
		} else if (this.props.type == 'email' &&
			!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value)) {
			newState.validate = false;
	    	newState.error = `${this.props.label} must be a validate email address`;
		} else if (this.props.minLength && value.length < this.props.minLength) {
			newState.validate = false;
			newState.error = `Use at least ${this.props.minLength} characters`;
		} else if (this.props.maxLength && value.length > this.props.maxLength) {
			newState.validate = false;
			newState.error = `Must have at most ${this.props.maxLength} characters`;
		}

		return newState;
	}
	isValidete() {
		return this.state.validate;
	}
	getValue() {
		return this.state.value;
	}
}

GnInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(['email', 'text', 'password', 'number']).isRequired,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	required: PropTypes.bool,
	initialValue: PropTypes.bool,
	icon: PropTypes.string
};

export default GnInput;