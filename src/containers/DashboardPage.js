import React, { PropTypes } from 'react';
import { ThemeComponent, AppTitlebar, EditorDialog, FabButton } from '../components';
import { fixedRB } from '../styles';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showCreateParameterDialog, showCreateFolderDialog, showCreatePackageDialog, showCreateReportDialog, dismissDialog } from '../actions/dialog-actions';
import { createFolder, updateFolder } from '../actions/folder-actions';
import { createParameter, updateParameter } from '../actions/parameter-actions';
import { createPackage } from '../actions/package-actions';
import { createReport } from '../actions/report-actions';

class DashboardPage extends ThemeComponent {
    componentDidMount() {
    	if (!this.props.access_token) {
            return this.props.history.replaceState(null, '/login');
        }
    }
	render() {
		if (!this.props.access_token) {
			return (
				<div>Redirecting...</div>
			);
		}

		return (
			<div>
				<AppTitlebar
					style={{ position: 'fixed' }}
					selectItem={this.props.dashboard.selected}
					onSectionSelected={this._onSectionSelected.bind(this)}/>
				<br/><br/><br/>
				{this.props.children}
				<FabButton
					style={fixedRB}
					icon='add'
					onClick={this._onFabBtnClicked.bind(this)}/>
				<EditorDialog
					title={this.props.dialog.title}
					showDialog={this.props.dialog.showDialog}
					updating={this.props.dialog.updating}
					fields={this.props.dialog.fields}
					onSubmit={this._onDialogSubmit.bind(this)}
					onCancel={() => this.props.dispatch(dismissDialog())}/>
			</div>
		);
	}

	_onSectionSelected(section) {
		this.props.history.replaceState(null, `/dashboard/${section}`)
	}
	_onFabBtnClicked() {
		switch(this.props.dashboard.selected) {
			case 'folders':
				this.props.dispatch(showCreateFolderDialog());
				break;
			case 'parameters':
				this.props.dispatch(showCreateParameterDialog());
				break;
			case 'packages':
				this.props.dispatch(showCreatePackageDialog());
				break;
			case 'reports':
				this.props.dispatch(showCreateReportDialog());
				break;
		}
	}
	_onDialogSubmit(id, fields, attachment) {
		switch(this.props.dashboard.selected) {
			case 'folders':
				this.props.dispatch(id ? updateFolder(id, fields) : createFolder(fields));
				break;
			case 'parameters':
				this.props.dispatch(id ? updateParameter(id, fields) : createParameter(fields));
				break;
			case 'packages':
				this.props.dispatch(createPackage(fields, attachment));
				break;
			case 'reports':
				this.props.dispatch(createReport(fields, attachment));
				break;
		}
	}
}

const propsSelector = createSelector(
	state => state.user.access_token,
	state => state.dashboard,
	state => state.dialog,
    (access_token, dashboard, dialog) => ({ access_token, dashboard, dialog })
);

export default connect(propsSelector)(DashboardPage);

