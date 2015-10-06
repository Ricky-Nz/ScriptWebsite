import React, { Component, PropTypes } from 'react';
import { SearchableList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showReportDialog, showLoginDialog } from '../actions/dialog-actions';
import { queryReports } from '../actions/crud-actions';

class DashboardParameter extends Component {
	componentDidMount() {
		if (this.props.accessToken) {
			this.props.dispatch(queryReports());
		} else {
			this.props.dispatch(showLoginDialog());
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.accessToken && nextProps.accessToken != this.props.accessToken) {
			this.props.dispatch(queryReports());
		}
	}
	render() {
		if (!this.props.accessToken) {
			return null
		}

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
				<Col xs={6} sm={5} md={4} mdOffset={1}>
					<SearchableList
						config={config}
						datas={this.props.datas}
						skip={this.props.skip}
						total={this.props.total}
						loading={this.props.loading}
						onLoadData={selection => this.props.dispatch(queryReports(selection))}
						onCreateItem={() => this.props.dispatch(showReportDialog({}))}
						onDeleteItem={item => this.props.dispatch(showReportDialog(item, true))}/>
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

