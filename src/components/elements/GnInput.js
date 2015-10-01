import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import GnIcon from './GnIcon';

class GnInput extends Component {
	constructor(props) {
		super(props);
		this.state = { value: props.initialValue };
	}
	componentWillReceiveProps(nextprops) {
		if (!this.state.value) {
			this.setState({ value: nextprops.initialValue });
		}
	}
	render() {
		return (
			<Input
				type={this.props.type}
				label={this.props.label}
				placeholder={this.props.placeholder}
				help={this.state.error}
				value={this.state.value}
				bsStyle={this.state.error ? 'error' : null}
				onChange={(e) => this.setState({ value: e.target.value })}
				onBlur={this.validete.bind(this)}
				addonBefore={this.props.icon ? <GnIcon icon={this.props.icon}/> : null} />
		);
	}
	validete() {
		const value = this.state.value;
		let error = null;

		if (this.props.required && !value) {
			error = `${this.props.label} can not be empty`;
		} else if (this.props.type == 'email' &&
			!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value)) {
			error = `${this.props.label} must be a validate email address`;
		} else if (this.props.minLength && value.length < this.props.minLength) {
			error = `Use at least ${this.props.minLength} characters`;
		} else if (this.props.maxLength && value.length > this.props.maxLength) {
			error = `Must have at most ${this.props.maxLength} characters`;
		}

		this.setState({ error: error });
		return !error;
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

