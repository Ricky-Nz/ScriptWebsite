import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import GnIcon from './GnIcon';

class GnSearchBar extends Component {
	render() {
		const { searching, delay, onSearch, children, ...inputProps } = this.props;

		return (
			<Input ref='input' type='text' {...inputProps} onInput={this.onTextChange.bind(this)}
				addonAfter={<GnIcon icon={searching ? 'spinner' : 'search'} active={searching}/>} />
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
	searching: PropTypes.bool,
	delay: PropTypes.number
};

GnSearchBar.defaultProps = {
	delay: 500
}

export default GnSearchBar;

