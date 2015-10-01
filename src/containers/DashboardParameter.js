import React, { Component, PropTypes } from 'react';
import { SearchableList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showFormDialog } from '../actions/dialog-actions';
import { queryParameters } from '../actions/crud-actions';

class DashboardParameter extends Component {
	render() {
		const config = {
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

		return (
			<Row>
				<Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
					<SearchableList
						config={config}
						datas={this.props.mainDatas}
						skip={this.props.mainState.skip}
						total={this.props.mainState.total}
						loading={this.props.mainState.loading}
						onLoadData={selection => this.props.dispatch(queryParameters(selection))}
						onCreateItem={() => this.props.dispatch(showFormDialog('parameters'))}/>
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

