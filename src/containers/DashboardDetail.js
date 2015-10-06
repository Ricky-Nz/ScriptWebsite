import React, { Component, PropTypes } from 'react';
import { SearchableList, ScriptPanel } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnIconButton } from '../components/elements';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showLoginDialog } from '../actions/dialog-actions';
import { queryScripts, createScript, getScript, updateScript, deleteScript, clearScript } from '../actions/crud-actions';

class DashboardScript extends Component {
	componentDidMount() {
		if (this.props.accessToken) {
			this.onQueryScript();
			if (this.props.location.query.edit) {
				this.props.dispatch(getScript(this.props.location.query.edit));
			} else if (this.props.script) {
				this.props.dispatch(clearScript());
			}
		} else {
			this.props.dispatch(showLoginDialog());
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.accessToken) {
			if (nextProps.accessToken != this.props.accessToken) {
				this.onQueryScript();
			}
			if (nextProps.location.query.edit && nextProps.location.query.edit != this.props.location.query.edit) {
				this.props.dispatch(getScript(nextProps.location.query.edit));
			} else if (!nextProps.location.query.edit && nextProps.script) {
				this.props.dispatch(clearScript());
			}
		}
	}
	render() {
		if (!this.props.accessToken) {
			return null
		}

		const scriptConfig = {
			hideSearchbar: true,
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
							onClick={() => this.props.history.replaceState(null, `/scripts?selection=${this.props.location.query.selection}`)}/>
					</Col>
				</Row>
				<Row>
					<Col xs={5} sm={4} md={3} mdOffset={1}>
						<SearchableList
							config={scriptConfig}
							datas={this.props.datas}
							skip={this.props.skip}
							total={this.props.total}
							loading={this.props.loading}
							onLoadData={this.onQueryScript.bind(this)}
							onCreateItem={() => this.props.history.replaceState(null, `/scripts/detail?selection=${this.props.location.query.selection}`)}
							onItemClicked={item => this.props.history.replaceState(null, `/scripts/detail?selection=${this.props.location.query.selection}&edit=${item.id}`)}/>
					</Col>
					<Col xs={7} sm={8} md={7}>
						<ScriptPanel
							loading={this.props.loading}
							submiting={this.props.updating}
							deleting={this.props.updating}
							error={this.props.error}
							script={this.props.script}
							onSubmit={(id, script) => {
								this.props.dispatch(id ? updateScript(id, script) : createScript(script));
							}}
							onDelete={id => this.props.dispatch(deleteScript(id))}/>
					</Col>
				</Row>
			</div>
		);
	}
	onQueryScript(querySelection) {
		const tagSelection = this.props.location.query.selection ?
				JSON.parse(this.props.location.query.selection) : null;
		this.props.dispatch(queryScripts(tagSelection));
	}
}

const propsSelector = createSelector(
	state => state.user.id,
	state => state.arrayData.loading,
	state => state.arrayData.updating,
	state => state.arrayData.skip,
	state => state.arrayData.total,
	state => state.arrayData.datas,
	state => state.detail.error,
	state => state.detail.script,
    (accessToken, loading, updating, skip, total, datas, error, script) => ({ accessToken, loading, updating, skip, total, datas, error, script })
);

export default connect(propsSelector)(DashboardScript);

