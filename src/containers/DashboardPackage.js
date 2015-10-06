import React, { Component, PropTypes } from 'react';
import { SearchableList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showPackageDialog, showLoginDialog } from '../actions/dialog-actions';
import { queryPackages } from '../actions/crud-actions';

class DashboardPackage extends Component {
	componentDidMount() {
		if (this.props.accessToken) {
			this.props.dispatch(queryPackages());
		} else {
			this.props.dispatch(showLoginDialog());
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.accessToken && nextProps.accessToken != this.props.accessToken) {
			this.props.dispatch(queryPackages());
		}
	}
	render() {
		if (!this.props.accessToken) {
			return null
		}

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
						datas={this.props.datas}
						skip={this.props.skip}
						total={this.props.total}
						loading={this.props.loading}
						onLoadData={selection => this.props.dispatch(queryPackages(selection))}
						onCreateItem={() => this.props.dispatch(showPackageDialog({}))}
						onDeleteItem={item => this.props.dispatch(showPackageDialog(item, true))}/>
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

export default connect(propsSelector)(DashboardPackage);

