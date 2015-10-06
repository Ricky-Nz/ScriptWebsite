import React, { Component, PropTypes } from 'react';
import { GnTitlebar } from '../components/elements';
import { FormDialog } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { dismissDialog, showLoginDialog, showRegisterDialog } from '../actions/dialog-actions';
import { login, logout, register } from '../actions/user-actions';
import { createParameter, updateParameter, deleteParameter, createPackage,
	deletePackage, createReport, deleteReport } from '../actions/crud-actions';

class Application extends Component {
	render() {
		const titlebarSections = [
			{ ref: 'scripts', label: 'Script' },
			{ ref: 'parameters', label: 'Parameter' },
			{ ref: 'packages', label: 'Package' },
			{ ref: 'reports', label: 'Report' },
			{ ref: 'guide', label: 'Guide' }
		];

		return (
			<div>
				<GnTitlebar brand='Gear Test Automation'
					sections={titlebarSections}
					menuTitle={this.props.email ? this.props.email : 'Login'}
					menus={this.props.email ? [{ ref: 'logout', label: 'Logout' }] : []}
					onMenuSelected={this.onTitlebarMenuSelected.bind(this)}
					onSectionSelected={this.onTitlebarSectionSelected.bind(this)}/>
				<br/><br/><br/><br/>
				{this.props.children}
				<FormDialog {...this.props.dialog} processing={this.props.updating} error={this.props.error}
                    onPerformAction={this.onProcessDialogAction.bind(this)}/>
			</div>
		);
	}
	onTitlebarMenuSelected(ref) {
		if (ref == 'Login') {
			this.props.dispatch(showLoginDialog());
		} else if (ref == 'logout') {
			this.props.dispatch(logout());
		}
	}
	onTitlebarSectionSelected(section) {
		this.props.history.replaceState(null, `/${section}`);
	}
	onProcessDialogAction(ref, args, fields, id, attachment) {
		switch(ref) {
			case 'create-parameter':
				this.props.dispatch(createParameter(fields));
				break;
			case 'update-parameter':
				this.props.dispatch(updateParameter(id, fields));
				break;
			case 'delete-parameter':
				this.props.dispatch(deleteParameter(id));
				break;
			case 'createPackage':
				this.props.dispatch(createPackage(fields, attachment));
				break;
			case 'deletePackage':
				this.props.dispatch(deletePackage(id));
				break;
			case 'createReport':
				this.props.dispatch(createReport(fields, attachment));
				break;
			case 'deleteReport':
				this.props.dispatch(deleteReport(id));
				break;
			case 'login':
				this.props.dispatch(login(fields.email, fields.password, args));
				break;
			case 'go-register':
				this.props.dispatch(showRegisterDialog());
				break;
			case 'register':
				this.props.dispatch(register(fields.email, fields.password));
				break;
			default:
				this.props.dispatch(dismissDialog());
		}
	}
}

const propsSelector = createSelector(
	state => state.user.email,
	state => state.arrayData.updating || state.user.processing,
	state => state.arrayData.error,
	state => state.dialog,
    (email, updating, error, dialog) => ({ email, updating, error, dialog })
);

export default connect(propsSelector)(Application);

