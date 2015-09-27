import React, { Component, PropTypes } from 'react';
import { Paper } from 'material-ui';
import ContentList from './ContentList';
import { combinePropTypes, extratProps } from '../utils';

class SearchList extends Component {
	render() {
		const headerText = this.props.datas && this.props.datas.length > 0 ?
			`${this.props.datas.length} results` : `Result not found for "${this.props.searchText}"`;

		return (
			<Paper style={this.props.style}>
				<ContentList {...extratProps(this.props, ContentList)} header={headerText}/>
			</Paper>
		);
	}
}

SearchList.propTypes = combinePropTypes(ContentList, {
	searchText: PropTypes.string.isRequired,
	searching: PropTypes.bool.isRequired
});

export default SearchList;