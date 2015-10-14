import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Overlay, Popover, Input } from 'react-bootstrap';
import GnIcon from './GnIcon';
import GnDropdownButton from './GnDropdownButton';

class GnSelectInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showHelp: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (this.state.showHelp) {
			this.setState({ showHelp: false });
		}
	}
	render() {
		const { optionDiaplay, options, required, regex, help,
			onSelect, onChange, ...inputProps } = this.props;

		return (
			<div style={{ position: 'relative' }}>
				<Input ref='input' bsStyle={this.state.showHelp ? 'error' : null} {...inputProps}
					addonBefore={<GnDropdownButton title={optionDiaplay} options={options}
						onSelect={onSelect}/>}
					onBlur={this.validate.bind(this)}
					onChange={e => onChange(e.target.value)}/>
				<Overlay show={this.state.showHelp} placement='top' container={this}
					target={() => ReactDOM.findDOMNode(this.refs.input)}>
					<Popover id='input-popup'>
						<span style={{color: 'red'}}>{!this.props.select ? this.props.optionHelp : this.props.help}</span>
					</Popover>
				</Overlay>
			</div>
		);
	}
	validate() {
		if (!this.props.select) {
			this.setState({ showHelp: true });
			return false;
		}

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

			if (!valid) {
				this.setState({ showHelp: true });
			} else if (valid && this.state.showHelp) {
				this.setState({ showHelp: !valid });
			}

			return valid;
		}

		return true;
	}
	getValue() {
		if (this.props.type == 'file') {
			return this.state.file;
		} else {
			return this.refs.input.getValue();
		}
	}
}

GnSelectInput.propTyles = {
	optionDiaplay: PropTypes.string.isRequired,
	optionHelp: PropTypes.string,
	options: PropTypes.array,
	select: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	required: PropTypes.bool,
	regex: PropTypes.string,
	help: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

GnSelectInput.defaultProps = {
	type: 'text'
};

export default GnSelectInput;