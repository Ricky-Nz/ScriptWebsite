import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import GnIcon from './GnIcon';

class GnInput extends Component {
	constructor(props) {
		super(props);
		this.state = { value: props.initialValue };
	}
	componentWillReceiveProps(nextprops) {
		if (nextprops.initialValue != this.props.initialValue) {
			this.setState({ value: nextprops.initialValue });
		}
	}
	render() {
		if (this.props.type == 'file') {
			return (
				<Dropzone style={{margin: 10, padding: 30, border: '2px dashed gray'}}
					onDrop={files => this.setState({value:files[0]})}>
					<div>{this.state.value ? this.state.value.name : 'Try dropping some files here, or click to select files to upload.'}</div>
	            </Dropzone>
			);
		} else {
			return (
				<Input style={this.props.style}
					onKeyPress={this.props.onKeyPress}
					disabled={this.props.disabled}
					type={this.props.type}
					label={this.props.label}
					placeholder={this.props.placeholder}
					help={this.state.error}
					value={this.state.value}
					bsStyle={this.state.error ? 'error' : null}
					onChange={(e) => this.setState({ value: e.target.value })}
					onBlur={this.validete.bind(this)}
					addonBefore={this.props.icon ? <GnIcon icon={this.props.icon}/> : this.props.addonBefore} />
			);
		}
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
	clear() {
		this.setState({ value: '' });
	}
}

GnInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(['email', 'text', 'password', 'number']).isRequired,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	required: PropTypes.bool,
	initialValue: PropTypes.string,
	icon: PropTypes.string,
	disabled: PropTypes.bool
};

GnInput.defaultProps = {
	type: 'text'
};

export default GnInput;

