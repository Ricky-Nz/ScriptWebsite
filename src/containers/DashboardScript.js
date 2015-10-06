import React, { Component, PropTypes } from 'react';
import { SearchableList, TagList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showLoginDialog } from '../actions/dialog-actions';
import { queryScripts } from '../actions/crud-actions';
import { getTags, changeSelection, updateTagSelection } from '../actions/user-actions';

class DashboardFolder extends Component {
	componentDidMount() {
		if (!this.props.accessToken) {
			this.props.dispatch(showLoginDialog());
		} else {
			this.props.dispatch(getTags());
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.accessToken && !this.props.accessToken) {
			this.props.dispatch(getTags());
		}
		
		if (nextProps.selection != this.props.selection) {
			this.props.dispatch(queryScripts(nextProps.selection));
		}
	}
	render() {
		if (!this.props.accessToken) {
			return null
		}

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
				<Col xs={5} sm={4} md={3} mdOffset={1}>
					<TagList ref='tagList' tags={this.props.tags}
						selection={this.props.location.query.selection}
						mode={this.props.location.query.mode}
						onTagSelctChange={changes => this.props.dispatch(updateTagSelection(changes))}/>
				</Col>
				<Col xs={7} sm={8} md={7}>
					<SearchableList ref='scriptList'
						config={scriptConfig}
						datas={this.props.datas}
						skip={this.props.skip}
						total={this.props.total}
						loading={this.props.loading}
						onLoadData={selection => this.props.dispatch(changeSelection(selection))}
						onCreateItem={() => this.props.history.replaceState(null, `/scripts/detail`)}
						onItemClicked={item => this.props.history.replaceState(null, `/scripts/detail?edit=${item.id}`)}/>
				</Col>
			</Row>
		);
	}
}

const propsSelector = createSelector(
	state => state.user.id,
	state => state.user.tags,
	state => state.user.selection,
	state => state.arrayData.loading,
	state => state.arrayData.skip,
	state => state.arrayData.total,
	state => state.arrayData.datas,
    (accessToken, tags, selection, loading, skip, total, datas) => ({ accessToken, tags, selection, loading, skip, total, datas })
);

export default connect(propsSelector)(DashboardFolder);

