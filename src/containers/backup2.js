import React, { Component, PropTypes } from 'react';
import { GnSearchbar, GnList, GnIconButton } from './elements';
import { Panel, Row, Col } from 'react-bootstrap';
import { horVCenterSpaceBetween } from './styles';
import _ from 'underscore';

class SearchableList extends Component {
	componentDidMount() {
		this.loadData(this.props.label);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.label != nextProps.label) {
			this.loadData(nextProps.label);
		}
	}
	render() {
		let config;
		switch(this.props.label) {
			case 'folders':
				config = {
					searchbarPlaceholder: 'search for folder by title',
					listHeader: 'Script Folders',
					itemIcon: 'folder',
					itemMenu: [
						{ref: 'edit', label: 'Edit'},
						{ref: 'delete', label: 'Delete'}
					],
					primaryKey: 'title',
					secondaryKey: 'date',
					searchable: ['title']
				};
				break;
			case 'scripts':
				config = {
					searchbarPlaceholder: 'search for script by title',
					listHeader: 'Test Scripts',
					itemIcon: 'file-code-o',
					itemMenu: [
						{ref: 'edit', label: 'Edit'},
						{ref: 'delete', label: 'Delete'}
					],
					primaryKey: 'title',
					secondaryKey: 'date',
					searchable: ['title']
				};
				break;
			case 'parameters':
				config = {
					searchbarPlaceholder: 'search for parameter key or value ',
					listHeader: 'Golabel Parameters',
					itemIcon: 'code',
					itemMenu: [
						{ref: 'edit', label: 'Edit'},
						{ref: 'delete', label: 'Delete'}
					],
					primaryKey: 'key',
					secondaryKey: 'value',
					searchable: ['key', 'value']
				};
				break;
			case 'packages':
				config = {
					searchbarPlaceholder: 'search for package title or descriptions',
					listHeader: 'Installation Packages',
					itemIcon: 'android',
					itemMenu: [
						{ref: 'delete', label: 'Delete'}
					],
					primaryKey: 'title',
					secondaryKey: 'description',
					searchable: ['title', 'description']
				};
				break;
			case 'reports':
				config = {
					searchbarHint: 'search for report title',
					listHeader: 'Test Reports',
					itemIcon: 'description',
					itemMenu: [
						{ref: 'delete', label: 'Delete'}
					],
					primaryKey: 'title',
					secondaryKey: 'date',
					searchable: ['title']
				};
				break;
			default:
				return null;
		}

		return (
			<Panel style={this.props.style}>
				<GnSearchbar ref='searchbar' placeholder={config.searchbarPlaceholder}
					onSearch={searchText => this.loadData(this.props.label, searchText)}/>
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
					onLoadMore={() => this.loadData(this.props.label, this.refs.searchbar.getValue(), true)}
					loading={this.props.loading}
					onItemClicked={this.props.onItemClicked}/>
			</Panel>
		);
	}
	loadData(label, searchText, loadmore) {
		let searchable;
		switch(label) {
			case 'folders':
				searchable = ['title'];
				break;
			case 'scripts':
				searchable = ['title'];
				break;
			case 'parameters':
				searchable: ['key', 'value'];
				break;
			case 'packages':
				searchable: ['title', 'description'];
				break;
			case 'reports':
				searchable: ['title'];
				break;
			default:
				return null;
		}

		let query = { limit: 10 };
		if (searchText) {
			Object.aassign(query, { where: { or: searchable.map(key => ({[key]: {regexp: searchText}}))} })
		}
		if (loadmore) {
			Object.assign(query, { skip: this.props.skip });
		}

		this.props.onLoadData(label, query);
	}
}

SearchableList.propTypes = {
	label: PropTypes.oneOf(['fodlers', 'scripts', 'parameters', 'packages', 'reports']),
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

