import React, { Component, PropTypes } from 'react';
import { SearchableList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showParameterDialog, showLoginDialog } from '../actions/dialog-actions';
import { queryParameters } from '../actions/crud-actions';

class DashboardParameter extends Component {
	componentDidMount() {
		if (this.props.accessToken) {
			this.props.dispatch(queryParameters());
		} else {
			this.props.dispatch(showLoginDialog());
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.accessToken && nextProps.accessToken != this.props.accessToken) {
			this.props.dispatch(queryParameters());
		}
	}
	render() {
		if (!this.props.accessToken) {
			return null
		}

		const config = {
			searchbarPlaceholder: 'search for parameter key or value ',
			listHeader: 'Golabel Parameters',
			itemIcon: 'code',
			showEditBtn: true,
			showDeleteBtn: true,
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
						onCreateItem={() => this.props.dispatch(showParameterDialog({}))}
						onEditItem={item => this.props.dispatch(showParameterDialog(item))}
						onDeleteItem={item => this.props.dispatch(showParameterDialog(item, true))}/>
				</Col>
			</Row>
		);
	}
}

const propsSelector = createSelector(
	state => state.user.id,
	state => state.arrayData.loading,
	state => state.arrayData.skip,
	state => state.arrayData.total,
	state => state.arrayData.datas,
    (accessToken, loading, skip, total, datas) => ({ accessToken, loading, skip, total, datas })
);

export default connect(propsSelector)(DashboardParameter);

