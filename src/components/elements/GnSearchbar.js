import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';

class SearchBar extends Component {
	render() {
		return (
			<Input type='text' label={this.props.label}
				placeholder={this.props.placeholder} onChange={this.onTextChange.bind(this)} />
		);
	}
	onTextChange(e) {
		if (this.state && this.state.timer) {
			clearTimeout(this.state.timer);
		}

		if (this.props.delay > 0) {
			this.setState({
				timer: setTimeout(() => {
					this.props.onSearch(e.target.value);
				}, this.props.delay)
			});
		} else {
			this.props.onSearch(e.target.value);
		}
	}
}

SearchBar.propTypes = {
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onSearch: PropTypes.func.isRequired,
	delay: PropTypes.number
};

SearchBar.defaultProps = {
	delay: 500
}

export default SearchBar;

