import React, { Component, PropTypes } from 'react';
import { Paper, TextField, CircularProgress } from 'material-ui';
import { padding, horCenter } from '../styles';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const editField = {
			margin: '5px 0px'
		};

		return (
			<Paper style={{...this.props.style, ...horCenter, ...padding}}>
                <TextField style={editField} ref='search' fullWidth={true} hintText={this.props.hint}
                    floatingLabelText={this.props.label} type='text' onChange={this._onTextChanged.bind(this)} />
                {this.props.searching ? <CircularProgress mode="indeterminate" size={0.4} /> : null}
			</Paper>
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
	onSearch: PropTypes.func.isRequired,
	searching: PropTypes.bool.isRequired
};

export default SearchBar;

