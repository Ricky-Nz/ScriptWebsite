import React, { Component, PropTypes } from 'react';
import { SearchableList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showFormDialog } from '../actions/dialog-actions';
import { queryFolders, queryScripts } from '../actions/crud-actions';

class DashboardFolder extends Component {
	render() {
		const config = {
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

		return (
			<Row>
				<Col xs={6} sm={5} md={3} mdOffset={1}>
					<SearchableList
						config={config}
						datas={this.props.mainDatas}
						skip={this.props.mainState.skip}
						total={this.props.mainState.total}
						loading={this.props.mainState.loading}
						onLoadData={selection => this.props.dispatch(queryFolders(selection))}
						onCreateItem={() => this.props.dispatch(showFormDialog('folders'))}
						onItemClicked={(item, index) => {
							this.props.history.replaceState(null, `/dashboard/folders?select=${index}`);
						}}/>
				</Col>
				<Col xs={6} sm={7} md={7}>

				</Col>
			</Row>
		);
	}
}

const propsSelector = createSelector(
	state => state.mainDatas,
	state => state.mainState,
	state => state.secondaryDatas,
	state => state.secondaryState,
    (mainDatas, mainState, secondaryDatas, secondaryState) =>
    	({ mainDatas, mainState, secondaryDatas, secondaryState })
);

export default connect(propsSelector)(DashboardFolder);

