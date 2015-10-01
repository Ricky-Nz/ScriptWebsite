import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';

class GnSearchBar extends Component {
	render() {
		return (
			<Input ref='input' type='text' label={this.props.label}
				placeholder={this.props.placeholder} onChange={this.onTextChange.bind(this)} />
		);
	}
	onTextChange() {
		if (this.state && this.state.timer) {
			clearTimeout(this.state.timer);
		}

		if (this.props.delay > 0) {
			this.setState({
				timer: setTimeout(() => {
					this.props.onSearch(this.refs.input.getValue());
				}, this.props.delay)
			});
		} else {
			this.props.onSearch(this.refs.input.getValue());
		}
	}
	getValue() {
		return this.refs.input.getValue();
	}
}

GnSearchBar.propTypes = {
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onSearch: PropTypes.func.isRequired,
	delay: PropTypes.number
};

GnSearchBar.defaultProps = {
	delay: 500
}

export default GnSearchBar;

