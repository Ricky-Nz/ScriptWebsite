import React, { Component, PropTypes } from 'react';
import { SearchableList, TagList } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showLoginDialog } from '../actions/dialog-actions';
import { queryScripts } from '../actions/crud-actions';
import { getTags } from '../actions/user-actions';

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
		
		if (nextProps.location.query.selection != this.props.location.query.selection) {
			this.props.dispatch(queryScripts(nextProps.location.query.selection ?
				JSON.parse(nextProps.location.query.selection) : null));
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
						onTagSelectionChange={selection => this.onQueryScript(selection)}/>
				</Col>
				<Col xs={7} sm={8} md={7}>
					<SearchableList ref='scriptList'
						config={scriptConfig}
						datas={this.props.datas}
						skip={this.props.skip}
						total={this.props.total}
						loading={this.props.loading}
						onLoadData={selection => this.onQueryScript(null, selection)}
						onCreateItem={() => this.props.history.replaceState(null, `/scripts/detail?selection=${this.props.location.query.selection}`)}
						onItemClicked={item => this.props.history.replaceState(null, `/scripts/detail?selection=${this.props.location.query.selection}&edit=${item.id}`)}/>
				</Col>
			</Row>
		);
	}
	onQueryScript(tagSelection, searchSelection) {
		if (!tagSelection && this.refs.tagList) {
			const lastSelection = this.refs.tagList.getLastSelection();
			if (lastSelection) {
				tagSelection = JSON.parse(lastSelection);
			}
		}
		if (!searchSelection && this.refs.scriptList) {
			const lastSelection = this.refs.scriptList.getLastSelection();
			if (lastSelection) {
				searchSelection = JSON.parse(lastSelection);
			}
		}

		let selection;
		if (tagSelection && searchSelection) {
			selection = Object.assign(tagSelection, searchSelection, { where: Object.assign(tagSelection.where, searchSelection.where)});
		} else {
			selection = tagSelection ? tagSelection : searchSelection;
		}
		
		this.props.history.replaceState(null, `/scripts${selection ? '?selection=' : ''}${selection ? JSON.stringify(selection) : ''}`);
	}
}

const propsSelector = createSelector(
	state => state.user.id,
	state => state.user.tags,
	state => state.arrayData.loading,
	state => state.arrayData.skip,
	state => state.arrayData.total,
	state => state.arrayData.datas,
    (accessToken, tags, loading, skip, total, datas) => ({ accessToken, tags, loading, skip, total, datas })
);

export default connect(propsSelector)(DashboardFolder);

