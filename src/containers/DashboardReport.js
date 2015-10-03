import React, { Component, PropTypes } from 'react';
import { SearchableList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showFormDialog } from '../actions/dialog-actions';
import { queryReports } from '../actions/crud-actions';

class DashboardParameter extends Component {
	componentDidMount() {
		this.props.dispatch(queryReports());
	}
	render() {
		const config = {
			searchbarHint: 'search for report title',
			listHeader: 'Test Reports',
			itemIcon: 'description',
			showEditBtn: false,
			showDeleteBtn: true,
			primaryKey: 'title',
			secondaryKey: 'date',
			searchable: ['title']
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
						onLoadData={selection => this.props.dispatch(queryReports(selection))}
						onCreateItem={() => this.props.dispatch(showFormDialog('reports'))}/>
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

export default connect(propsSelector)(DashboardParameter);

