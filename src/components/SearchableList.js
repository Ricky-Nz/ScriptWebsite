import React, { Component, PropTypes } from 'react';
import { GnSearchbar, GnList, GnIconButton } from './elements';
import { Panel, Row, Col } from 'react-bootstrap';
import { horVCenterSpaceBetween } from './styles';
import _ from 'underscore';

class SearchableList extends Component {
	componentDidMount() {
		this.loadData();
	}
	render() {
		const config = this.props.config;
		return (
			<Panel style={this.props.style}>
				<GnSearchbar ref='searchbar' placeholder={config.searchbarPlaceholder}
					onSearch={searchText => this.loadData(searchText)}/>
				<GnList
					header={config.listHeader}
					itemIcon={config.itemIcon}
					menus={config.itemMenu}
					primaryKey={config.primaryKey}
					secondaryKey={config.secondaryKey}
					datas={this.props.datas}
					loaded={this.props.skip}
					total={this.props.total}
					onCreateItem={this.props.onCreateItem}
					onLoadMore={() => this.loadData(this.refs.searchbar.getValue(), true)}
					loading={this.props.loading}
					onItemClicked={this.props.onItemClicked}/>
			</Panel>
		);
	}
	loadData(searchText, loadmore) {
		let query = { limit: 10 };
		if (searchText) {
			Object.aassign(query, { where: { or: this.props.searchable.map(key => ({[key]: {regexp: searchText}}))} })
		}
		if (loadmore) {
			Object.assign(query, { skip: this.props.skip });
		}

		this.props.onLoadData(query);
	}
}

SearchableList.propTypes = {
	config: PropTypes.shape({
		searchbarPlaceholder: PropTypes.string,
		listHeader: PropTypes.string,
		itemIcon: PropTypes.string,
		itemMenu: PropTypes.arrayOf({
			ref: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		}),
		primaryKey: PropTypes.string.isRequired,
		secondaryKey: PropTypes.string,
		searchable: PropTypes.array.isRequired
	}).isRequired,
	// list config
	datas: PropTypes.array,
	skip: PropTypes.number,
	total: PropTypes.number,
	onCreateItem: PropTypes.func.isRequired,
	onLoadData: PropTypes.func.isRequired,
	onItemClicked: PropTypes.func,
	loading: PropTypes.bool
};

export default SearchableList;

