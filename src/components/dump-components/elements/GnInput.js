import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import GnPromptPanel from './GnPromptPanel';
import GnIcon from './GnIcon';

class GnInput extends Component {
	constructor(props) {
		super(props);
		this.state = {showHelp: false};
	}
	componentWillReceiveProps(nextProps) {
		if (this.state.showHelp) {
			this.setState({showHelp: false});
		}
	}
	render() {
		const { regex, help, icon, ...inputProps } = this.props;

		return (
			<GnPromptPanel help={help} show={this.state.showHelp}>
				<Input ref='input' bsStyle={this.state.showHelp ? 'error' : null}
					addonBefore={icon ? <GnIcon icon={icon}/> : null}
					onBlur={e => this.validate(e.target.validity.valid)}
					onChange={this.props.type == 'file' ? e => this.setState({file: e.target.files[0]}) : null}
					{...inputProps}/>
			</GnPromptPanel>
		);
	}
	validate() {
		if (this.props.regex || this.props.required) {
			let valid;
			if (this.props.regex) {
				const regex = new RegExp(this.props.regex);
				valid = regex.test(this.refs.input.getValue());
			} else {
				if (this.props.type == 'file') {
					valid = this.state.file ? true : false;
				} else {
					valid = this.refs.input.getValue() ? true : false;
				}
			}

			if (!valid && !this.state.showHelp) {
				this.setState({ showHelp: true });
			} else if (valid && this.state.showHelp) {
				this.setState({ showHelp: false });
			}

			return valid;
		}

		return true;
	}
	showError() {
		this.setState({showHelp: true});
	}
	getValue() {
		if (this.props.type == 'file') {
			return this.state.file;
		} else {
			return this.refs.input.getValue();
		}
	}
}

GnInput.propTyles = {
	icon: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	defaultValue: PropTypes.string,
	required: PropTypes.bool,
	regex: PropTypes.string,
	help: PropTypes.string
};

GnInput.defaultProps = {
	type: 'text'
};

export default GnInput;