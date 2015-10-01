import React, { Component, PropTypes } from 'react';
import { GnSearchbar, GnList, GnIconButton } from './elements';
import { Panel, Row, Col } from 'react-bootstrap';
import { horVCenterSpaceBetween } from './styles';
import _ from 'underscore';

const staticConfig = {
	folders: {
		searchbarPlaceholder: 'search for folder by title',
		listHeader: 'Script Folders',
		itemConfig: {
			icon: 'folder',
			primary: 'title',
			secondary: 'date'
		},
		searchable: ['title'],
		limit: 10
	},
	scripts: {
		searchbarPlaceholder: 'search for script by title',
		listHeader: 'Test Scripts',
		itemConfig: {
			icon: 'file-code-o',
			primary: 'title',
			secondary: 'date'
		},
		searchable: ['title'],
		limit: 10
	},
	parameters: {
		searchbarPlaceholder: 'search for parameter key or value ',
		listHeader: 'Golabel Parameters',
		itemConfig: {
			icon: 'code',
			primary: 'key',
			secondary: 'value'
		},
		searchable: ['key', 'value'],
		limit: 10
	},
	packages: {
		searchbarPlaceholder: 'search for package title or descriptions',
		listHeader: 'Installation Packages',
		itemConfig: {
			icon: 'android',
			primary: 'title',
			secondary: 'description'
		},
		searchable: ['title', 'description'],
		limit: 10
	},
	reports: {
		searchbarHint: 'search for report title',
		listHeader: 'Test Reports',
		itemConfig: {
			icon: 'description',
			primary: 'title',
			secondary: 'date'
		},
		searchable: ['title'],
		limit: 10
	}
};

class SearchableList extends Component {
	componentDidMount() {
		this.props.onLoadData(this.props.label, this.calculSelection(), this.props.args);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.label != this.props.label || nextProps.args != this.props.args) {
			this.props.onLoadData(nextProps.label, this.calculSelection(), this.props.args);
		}
	}
	render() {
		const config = staticConfig[this.props.label];

		return (
			<Panel style={this.props.style}>
				<GnSearchbar ref='searchbar' placeholder={config.searchbarPlaceholder}
					onSearch={text => {
						this.props.onLoadData(this.props.label, this.calculSelection(false, text), this.props.args)
					}}/>
				<GnList
					header={config.listHeader}
					datas={this.props.datas}
					total={this.props.total}
					itemConfig={config.itemConfig}
					loading={this.props.loading}
					selectIndex={this.props.selectIndex}
					onItemClicked={(index, item) =>
						this.props.onItemClicked ? this.props.onItemClicked(this.props.label, index, item) : null}
					onCreateItem={() => this.props.onCreateItem(this.props.label)}
					onLoadMore={() => {
						this.props.onLoadData(this.props.label, this.calculSelection(true), this.props.args);
					}}/>
			</Panel>
		);
	}
	calculSelection(loadmore, searchText) {
		const config = staticConfig[this.props.label];
		let selection = { limit: config.limit, fields: { id: true, [config.itemConfig.primary]: true, [config.itemConfig.secondary]: true } };
		if (loadmore) {
			Object.assign(selection, { skip: this.props.skip ? this.props.skip + config.limit : config.limit });
		}
		if (searchText) {
			Object.assign(selection, { where: { or: config.searchable.map(key => ({[key]: {regexp: searchText}}))} });
		}

		return selection;
	}
}

SearchableList.propTypes = {
	label: PropTypes.oneOf(_.keys(staticConfig)).isRequired,
	args: PropTypes.string,
	datas: PropTypes.array,
	loading: PropTypes.bool,
	skip: PropTypes.number,
	total: PropTypes.number,
	selectIndex: PropTypes.number,
	onItemClicked: PropTypes.func,
	onCreateItem: PropTypes.func.isRequired,
	onLoadData: PropTypes.func.isRequired
};

export default SearchableList;

