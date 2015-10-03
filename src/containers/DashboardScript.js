import React, { Component, PropTypes } from 'react';
import { SearchableList, ScriptPanel } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnIconButton } from '../components/elements';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showFormDialog } from '../actions/dialog-actions';
import { queryFolders, queryScripts, createScript, getScript, updateScript, deleteScript, clearScript } from '../actions/crud-actions';

class DashboardScript extends Component {
	componentDidMount() {
		this.props.dispatch(queryScripts(this.props.params.folderId));

		if (this.props.location.query.select) {
			this.props.dispatch(getScript(this.props.params.folderId, this.props.location.query.select));
		} else if (this.props.script.script) {
			this.props.dispatch(clearScript());
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.location.query.select) {
			if (nextProps.script.script) {
				this.props.dispatch(clearScript());
			}
		} else if (nextProps.location.query.select != this.props.location.query.select) {
			this.props.dispatch(getScript(this.props.params.folderId, nextProps.location.query.select));
		}
	}
	render() {
		const scriptConfig = {
			searchbarPlaceholder: 'search for script by title',
			listHeader: 'Test Scripts',
			itemIcon: 'file-text-o',
			showEditBtn: false,
			showDeleteBtn: false,
			primaryKey: 'title',
			secondaryKey: 'date',
			searchable: ['title']
		};

		return (
			<div>
				<Row>
					<Col xs={6} sm={5} md={4} mdOffset={1}>
						<GnIconButton bsStyle='link' icon='angle-double-left' label='Back'
							onClick={() => this.props.history.replaceState(null, `/dashboard/folders?select=${this.props.params.folderId}`)}/>
					</Col>
				</Row>
				<Row>
					<Col xs={6} sm={5} md={4} mdOffset={1}>
						<SearchableList
							config={scriptConfig}
							args={this.props.location.query.select}
							datas={this.props.secondaryDatas}
							skip={this.props.secondaryState.skip}
							total={this.props.secondaryState.total}
							loading={this.props.secondaryState.loading}
							onLoadData={(selection, args) => {
								this.props.dispatch(queryScripts(this.props.params.folderId, selection));
							}}
							onCreateItem={() => {
								this.props.history.replaceState(null, `/dashboard/folders/${this.props.params.folderId}`);
							}}
							onItemClicked={item => {
								this.props.history.replaceState(null, `/dashboard/folders/${this.props.params.folderId}?select=${item.id}`)
							}}/>
					</Col>
					<Col xs={6} sm={7} md={6}>
						<ScriptPanel
							loading={this.props.script.loading}
							submiting={this.props.script.submiting}
							deleting={this.props.script.deleting}
							error={this.props.script.error}
							script={this.props.script.script}
							onSubmit={(id, script) => {
								this.props.dispatch(id ? updateScript(this.props.params.folderId, id, script)
										: createScript(this.props.params.folderId, script));
							}}
							onDelete={id => this.props.dispatch(deleteScript(this.props.params.folderId, id))}/>
					</Col>
				</Row>
			</div>
		);
	}
}

const propsSelector = createSelector(
	state => state.secondaryDatas,
	state => state.secondaryState,
	state => state.script,
    (secondaryDatas, secondaryState, script) =>
    	({ secondaryDatas, secondaryState, script })
);

export default connect(propsSelector)(DashboardScript);

