import React, { Component, PropTypes } from 'react';
import { GnTitlebar } from '../components/elements';
import { SearchableList, FormDialog } from '../components';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showFormDialog, dismissDialog } from '../actions/dialog-actions';
import { dialogSubmit, querySectionData, queryScripts } from '../actions/crud-actions';

class DashboardPage extends Component {
    componentDidMount() {
    	if (!this.props.access_token) {
            return this.props.history.replaceState(null, '/login');
        }
    }
	render() {
		return (
			<div>
				<GnTitlebar brand='Granny Test Automation'
					sections={[
						{ ref: 'folders', label: 'Script' },
						{ ref: 'parameters', label: 'Parameter' },
						{ ref: 'packages', label: 'Package' },
						{ ref: 'reports', label: 'Report' },
						{ ref: 'guide', label: 'Guide' }
					]}
					menuTitle='Menu'
					menus={[
						{ ref: 'logout', label: 'Logout' },
					]}
					onSectionSelected={section => this.props.history.replaceState(null, `/dashboard/${section}`)}
					onMenuSelected={() => this.props.dispatch(logout())}/>
				<br/>
				<Row>
					<Col xs={6} sm={5} md={3} mdOffset={1}>
						<SearchableList
							label={this.props.params.section}
							datas={this.props.mainDatas}
							skip={this.props.mainState.skip}
							total={this.props.mainState.total}
							loading={this.props.mainState.loading}
							onLoadData={(label, selection) => this.props.dispatch(querySectionData(label, selection))}
							onCreateItem={label => this.props.dispatch(showFormDialog(label))}
							onItemClicked={(label, index, item) => {
								if (label == 'folders') {
									this.props.history.replaceState(null, `/dashboard/folders?select=${index}`);
								}
							}}/>
					</Col>
					<Col xs={6} sm={7} md={7}>

					</Col>
				</Row>
				<FormDialog {...this.props.dialog}
                    onHide={() => this.props.dispatch(dismissDialog())}
                    onSubmit={(itemId, fields, attachment, label) =>
                    	this.props.dispatch(dialogSubmit(itemId, fields, attachment, label))}/>
			</div>
		);
	}
	renderSections() {
		if (!this.props.access_token) return;

		switch(this.props.params.section) {
 			case 'folders': return this.renderFolderSection();
 			case 'reports': return this.renderReportSection();
 			case 'parameters':
 			case 'packages':
 				return this.renderSinglePanel();
		}
	}
	renderFolderSection() {
		const mainDatas = this.props.mainDatas;
		const mainState = this.props.mainState;
		const secondaryDatas = this.props.secondaryDatas;
		const secondaryState = this.props.secondaryState;
		const query = this.props.location.query;

		return (
			<Row>
				<Col xs={6} sm={5} md={3} mdOffset={1}>
					<SearchableList
						label={this.props.params.section}
						datas={this.props.mainDatas}
						skip={this.props.mainState.skip}
						total={this.props.mainState.total}
						loading={this.props.mainState.loading}
						onLoadData={(label, selection) => this.props.dispatch(querySectionData(label, selection))}
						onCreateItem={label => this.props.dispatch(showFormDialog(label))}
						onItemClicked={(label, index, item) => {
							if (label == 'folders') {
								this.props.history.replaceState(null, `/dashboard/folders?select=${index}`);
							}
						}}/>
				</Col>
				<Col xs={6} sm={7} md={7}>
					<SearchableList
						label='scripts'
						args={this.props.location.query.select}
						datas={this.props.secondaryDatas}
						loading={this.props.secondaryState.loading}
						skip={this.props.secondaryState.skip}
						total={this.props.secondaryState.total}
						onLoadData={(label, selection, args) => {
							if (label == 'scripts') {
								// this.props.dispatch(queryScripts(this.props.mainDatas[args].id, selection));
							}
						}}
						onCreateItem={label => console.log(label)}
						onItemClicked={(label, index, item) => {
							console.log(item);
						}}/>
				</Col>
			</Row>
		);
	}
	renderReportSection() {

	}
	renderSinglePanel() {
		return (
			<Row>
				<Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
					<SearchableList
						label={this.props.params.section}
						datas={this.props.mainDatas}
						loading={this.props.mainState.loading}
						skip={this.props.mainState.skip}
						total={this.props.mainState.total}
						
						onLoadData={(label, selection) => this.props.dispatch(querySectionData(label, selection))}
						onCreateItem={label => this.props.dispatch(showFormDialog(label))}
						onItemClicked={(label, index, item) => {
							if (label == 'folders') {
								this.props.history.replaceState(null, `/dashboard/folders?select=${index}`);
							}
						}}/>
				</Col>
			</Row>
		);
	}
}

const propsSelector = createSelector(
	state => state.app.access_token,
	state => state.dialog,
	state => state.mainDatas,
	state => state.mainState,
	state => state.secondaryDatas,
	state => state.secondaryState,
    (access_token, dialog, mainDatas, mainState, secondaryDatas, secondaryState) =>
    	({ access_token, dialog, mainDatas, mainState, secondaryDatas, secondaryState })
);

export default connect(propsSelector)(DashboardPage);

