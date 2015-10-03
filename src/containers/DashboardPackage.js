import React, { Component, PropTypes } from 'react';
import { SearchableList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showFormDialog, showDeleteDialog } from '../actions/dialog-actions';
import { queryPackages } from '../actions/crud-actions';

class DashboardPackage extends Component {
	componentDidMount() {
		this.props.dispatch(queryPackages());
	}
	render() {
		const config = {
			searchbarPlaceholder: 'search for package title or descriptions',
			listHeader: 'Installation Packages',
			itemIcon: 'android',
			showEditBtn: false,
			showDeleteBtn: true,
			primaryKey: 'title',
			secondaryKey: 'description',
			searchable: ['title', 'description']
		};

		return (
			<Row>
				<Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
					<SearchableList
						config={config}
						datas={this.props.mainDatas}
						skip={this.props.mainState.skip}
						total={this.props.mainState.total}
						loading={this.props.mainState.loading}
						onLoadData={selection => this.props.dispatch(queryPackages(selection))}
						onCreateItem={() => this.props.dispatch(showFormDialog('packages'))}
						onDeleteItem={item => this.props.dispatch(showDeleteDialog('packages', `package ${item.title}`, item.id))}/>
				</Col>
			</Row>
		);
	}
}

const propsSelector = createSelector(
	state => state.mainDatas,
	state => state.mainState,
    (mainDatas, mainState) =>
    	({ mainDatas, mainState })
);

export default connect(propsSelector)(DashboardPackage);

