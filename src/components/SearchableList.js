import React, { Component, PropTypes } from 'react';
import { GnSearchbar, GnList, GnIconButton, GnIcon } from './elements';
import { Panel, Row, Col } from 'react-bootstrap';
import { horVCenterSpaceBetween, horVCenter, flexFill } from './styles';
import _ from 'underscore';

class SearchableList extends Component {
	render() {
		const config = this.props.config;
		return (
			<Panel style={this.props.style}>
				{this.renderSearchBar(config)}
				<GnList
					limitScroll={config.limitScroll}
					hideAddBtn={config.hideAddBtn}
					header={config.listHeader}
					itemIcon={config.itemIcon}
					showEditBtn={config.showEditBtn}
					showDeleteBtn={config.showDeleteBtn}
					primaryKey={config.primaryKey}
					secondaryKey={config.secondaryKey}
					datas={this.props.datas}
					loaded={this.props.skip}
					total={this.props.total}
					onCreateItem={this.props.onCreateItem}
					onLoadMore={() => this.loadData(this.props, this.refs.searchbar.getValue(), true)}
					loading={this.props.loading}
					onItemClicked={this.props.onItemClicked}
					onEditItem={this.props.onEditItem}
					onDeleteItem={this.props.onDeleteItem}/>
			</Panel>
		);
	}
	renderSearchBar(config) {
		if (config.hideSearchbar) {
			return null;
		}

		const showSpinner = this.props.loading && this.refs.searchbar && this.refs.searchbar.getValue();
		return (
			<GnSearchbar ref='searchbar' style={flexFill} placeholder={config.searchbarPlaceholder}
				onSearch={searchText => this.loadData(this.props, searchText)} searching={showSpinner}/>
		);
	}
	loadData(props, searchText, loadmore) {
		let query = {};
		if (searchText) {
			Object.assign(query, { where: { or: props.config.searchable.map(key => ({[key]: {regexp: searchText}}))} })
		}
		Object.assign(query, { skip: loadmore ? props.skip : 0 });

		this.props.onLoadData(query);
		this.setState({ selection: JSON.stringify(query)});
	}
	getLastSelection() {
		return this.state ? this.state.selection : null;
	}
}

SearchableList.propTypes = {
	config: PropTypes.shape({
		hideSearchbar: PropTypes.bool,
		searchbarPlaceholder: PropTypes.string,
		listHeader: PropTypes.string,
		itemIcon: PropTypes.string,
		showEditBtn: PropTypes.bool,
		showDeleteBtn: PropTypes.bool,
		primaryKey: PropTypes.string.isRequired,
		secondaryKey: PropTypes.string,
		searchable: PropTypes.array.isRequired
	}).isRequired,
	// list config
	datas: PropTypes.array,
	skip: PropTypes.number,
	total: PropTypes.number,
	loading: PropTypes.bool,
	onCreateItem: PropTypes.func,
	onLoadData: PropTypes.func.isRequired,
	onItemClicked: PropTypes.func,
	onEditItem: PropTypes.func,
	onDeleteItem: PropTypes.func
};

export default SearchableList;

