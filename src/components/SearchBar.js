import React, { Component, PropTypes } from 'react';
import { TextField } from 'material-ui';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div style={{padding: '5px 20px', ...this.props.style}}>
                <TextField ref='search' fullWidth={true} hintText={this.props.hint}
                    floatingLabelText={this.props.label} type='text' onChange={this._onTextChanged.bind(this)} />
			</div>
		);
	}
	_onTextChanged() {
		if (this.state.timer) {
			clearTimeout(this.state.timer);
		}

		this.setState({
			timer: setTimeout(() => {
				this.props.onSearch(this.refs.search.getValue());
			}, 500)
		});
	}
}

SearchBar.propTypes = {
	hint: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired
};

export default SearchBar;

