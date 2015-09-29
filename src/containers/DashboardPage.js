import React, { Component, PropTypes } from 'react';
import { GnTitlebar } from '../components';
import { fixedRB, verCenter } from '../components/styles';
import { Panel, Row, Col } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { sectionConfigs } from '../config';
import { showCreateParameterDialog, showEditParameterDialog, showCreateFolderDialog, showEditFolderDialog,
		showCreatePackageDialog, showCreateReportDialog, dismissDialog } from '../actions/dialog-actions';
import { createFolder, updateFolder, deleteFolder, searchFolders, loadFolders,
		createParameter, updateParameter, deleteParameter, searchParameters, loadParameters,
		createPackage, deletePackage, searchPackages, loadPackages,
		createReport, deleteReport, searchReports, loadReports } from '../actions/crud-actions';

const [FOLDERS, PARAMETERS, PACKAGES, REPORTS] = ['folders', 'parameters', 'packages', 'reports'];

class DashboardPage extends Component {
    componentDidMount() {
    	if (!this.props.access_token) {
            return this.props.history.replaceState(null, '/login');
        } else if (!sectionConfigs[this.props.params.section]) {
        	return this.props.history.replaceState(null, '/dashboard/folders');
        }

        this._onLoadSectionDatas(this.props.params.section);
    }
    componentWillReceiveProps(nextProps) {
    	if (!sectionConfigs[nextProps.params.section]) {
        	return this.props.history.replaceState(null, '/dashboard/folders');
        }

    	if (this.props.params.section != nextProps.params.section) {
    		this._onLoadSectionDatas(nextProps.params.section);
    	}
    }
    renderSectionPanel() {

		return (
			<Row style={{paddingTop: 66, height: '100%'}}>
				<Col {...sectionConfig.display}>
					<Panel>
						<SearchBar searching={sectionState.searching}
							hint={sectionConfig.searchbarHint}
							onSearch={this._onSearchSectionData.bind(this)}/>
						<AutoLoadMoreList
							datas={listDatas}
							header={listHeader}
							loading={loading}
							itemActions={itemActions}
							primaryKey={sectionConfig.listPrimaryKey}
							secondaryKey={sectionConfig.listSecondaryKey}
							leftIcon={sectionConfig.listIcon}/>
						<br/>
					</Panel>
				</Col>
			</Row>
		);
    }
	render() {
		if (!this.props.access_token || !sectionConfigs[this.props.params.section]) {
			return (
				<div>Redirecting...</div>
			);
		}

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
					onSectionSelected={this.onSectionSelected.bind(this)}
					onMenuSelected={this.onMenuSelected.bind(this)}/>
			</div>
		);
	}

	onSectionSelected(section) {
		this.props.history.replaceState(null, `/dashboard/${section}`);
	}
	onMenuSelected(menu) {
		switch(menu) {
			case 'logout':
				this.props.dispatch(logout());
				break;
		}
	}

	_onSectionSelected(section) {
		this.props.history.replaceState(null, `/dashboard/${section}`)
	}
	_onFabBtnClicked() {
		switch(this.props.params.section) {
			case FOLDERS:
				this.props.dispatch(showCreateFolderDialog());
				break;
			case PARAMETERS:
				this.props.dispatch(showCreateParameterDialog());
				break;
			case PACKAGES:
				this.props.dispatch(showCreatePackageDialog());
				break;
			case REPORTS:
				this.props.dispatch(showCreateReportDialog());
				break;
		}
	}
	_onDialogSubmit(id, fields, attachment) {
		switch(this.props.params.section) {
			case FOLDERS:
				this.props.dispatch(id ? updateFolder(id, fields) : createFolder(fields));
				break;
			case PARAMETERS:
				this.props.dispatch(id ? updateParameter(id, fields) : createParameter(fields));
				break;
			case PACKAGES:
				this.props.dispatch(createPackage(fields, attachment));
				break;
			case REPORTS:
				this.props.dispatch(createReport(fields, attachment));
				break;
		}
	}
	_onLoadSectionDatas(section) {
		switch(section) {
			case FOLDERS:
				this.props.dispatch(loadFolders());
				break;
			case PARAMETERS:
				this.props.dispatch(loadParameters());
				break;
			case PACKAGES:
				this.props.dispatch(loadPackages());
				break;
			case REPORTS:
				this.props.dispatch(loadReports());
				break;
		}
	}
	_onSearchSectionData(text) {
		switch(this.props.params.section) {
			case FOLDERS:
				this.props.dispatch(searchFolders(text));
				break;
			case PARAMETERS:
				this.props.dispatch(searchParameters(text));
				break;
			case PACKAGES:
				this.props.dispatch(searchPackages(text));
				break;
			case REPORTS:
				this.props.dispatch(searchReports(text));
				break;
		}
	}
	_onListItemEdit(item) {
		switch(this.props.params.section) {
			case FOLDERS:
				this.props.dispatch(showEditFolderDialog(item));
				break;
			case PARAMETERS:
				this.props.dispatch(showEditParameterDialog(item));
				break;
		}
	}
	_onListItemDelete(item) {
		switch(this.props.params.section) {
			case FOLDERS:
				this.props.dispatch(deleteFolder(item.id));
				break;
			case PARAMETERS:
				this.props.dispatch(deleteParameter(item.id));
				break;
			case PACKAGES:
				this.props.dispatch(deletePackage(item.id));
				break;
			case REPORTS:
				this.props.dispatch(deleteReport(item.id));
				break;
		}
	}
}

const propsSelector = createSelector(
	state => state.app.access_token,
	state => state.dialog,
	(state, props) => state[props.params.section],
	(state, props) => state[`${props.params.section}Panel`],
	state => state.searchResults,
    (access_token, dialog, sectionDatas, sectionState, searchResults) => ({ access_token, dialog, sectionDatas, sectionState, searchResults })
);

export default connect(propsSelector)(DashboardPage);

