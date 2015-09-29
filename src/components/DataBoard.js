import React, { Component, PropTypes } from 'react';
import { GnSearchbar, GnList } from './elements/GnSearchbar';
import { Panel } from 'react-bootstrap';

class DataBoard extends Component {
	render() {
		return (
			<Panel>
				{this.renderSearchbar()}
				{this.renderContentList()}
			</Panel>
		);
	}
	renderSearchbar() {
		return (
			<GnSearchbar placeholder={this.config.searchbarPlaceholder}
				label='Search' onSearch={this._onSearchSectionData.bind(this)}/>
		);
	}
	renderContentList() {
		const config = this.props.config;
		const search = this.props.search;

		if (search) {
			const listHeader = search.searching ? `Searching for "${search.text}"` :
				(listDatas && listDatas.length > 0 ? `${listDatas.length} results` : `Result not found for "${search.text}"`);

			return (
				<GnList header={listHeader} datas={search.results}
					refreshing={search.searching} primaryKey={config.primaryKey} secondaryKey={config.secondaryKey}/>
			);
		} else {
			return (
				<GnList header={this.props.listHeader} datas={this.props.datas} loading={this.props.laoding}
					primaryKey={config.primaryKey} secondaryKey={config.secondaryKey}/>
			);
		}
	}
}

DataBoard.propTypes = {
	config: PropTypes.shape({
		searchbarHint: PropTypes.string,
		listHeader: PropTypes.string,
		listPrimaryKey: PropTypes.string.isRequired,
		listSecondaryKey: PropTypes.string,
		listIcon: PropTypes.string,
	}).isRequired,
	search: PropTypes.shape({
		text: PropTypes.string.isRequired,
		searching: PropTypes.bool,
		results: PropTypes.array
	}),
	listHeader: PropTypes.string,
	datas: PropTypes.array.isRequired,
	laoding: PropTypes.bool,
	searching: PropTypes.bool
};

export default DataBoard;

