import React, { Component, PropTypes } from 'react';
import { SearchableList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showFormDialog, showDeleteDialog } from '../actions/dialog-actions';
import { queryFolders, queryScripts } from '../actions/crud-actions';

class DashboardFolder extends Component {
	componentDidMount() {
		this.props.dispatch(queryFolders());
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.query.select &&
				nextProps.location.query.select != this.props.location.query.select) {
			this.props.dispatch(queryScripts(nextProps.location.query.select));
		}
	}
	render() {
		const folderConfig = {
			searchbarPlaceholder: 'search for folder by title',
			listHeader: 'Script Folders',
			itemIcon: 'folder',
			showEditBtn: true,
			showDeleteBtn: true,
			primaryKey: 'title',
			secondaryKey: 'date',
			searchable: ['title']
		};
		const scriptConfig = {
			searchbarPlaceholder: 'search for script by title',
			listHeader: 'Test Scripts',
			itemIcon: 'file-text-o',
			showEditBtn: false,
			showDeleteBtn: true,
			primaryKey: 'title',
			secondaryKey: 'date',
			searchable: ['title']
		};

		return (
			<Row>
				<Col xs={6} sm={5} md={4} mdOffset={1}>
					<SearchableList
						config={folderConfig}
						datas={this.props.mainDatas}
						skip={this.props.mainState.skip}
						total={this.props.mainState.total}
						loading={this.props.mainState.loading}
						onLoadData={selection => this.props.dispatch(queryFolders(selection))}
						onCreateItem={() => this.props.dispatch(showFormDialog('folders'))}
						onItemClicked={item => {
							this.props.history.replaceState(null, `/folders?select=${item.id}`);
						}}
						onEditItem={item => this.props.dispatch(showFormDialog('folders', item))}
						onDeleteItem={item => this.props.dispatch(showDeleteDialog('folders', `folder ${item.title}`, item.id))}/>
				</Col>
				<Col xs={6} sm={7} md={6}>
					<SearchableList
						config={scriptConfig}
						datas={this.props.secondaryDatas}
						skip={this.props.secondaryState.skip}
						total={this.props.secondaryState.total}
						loading={this.props.secondaryState.loading}
						onLoadData={selection => {
							this.props.dispatch(queryScripts(this.props.location.query.select, selection));
						}}
						onCreateItem={() => {
							this.props.history.replaceState(null, `/folders/${this.props.location.query.select}`);
						}}
						onItemClicked={item => {
							this.props.history.replaceState(null, `/folders/${this.props.location.query.select}?select=${item.id}`);
						}}/>
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

