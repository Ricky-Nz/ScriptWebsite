import React, { Component, PropTypes } from 'react';
import { GnTitlebar } from '../components/elements';
import { FormDialog } from '../components';
import { fillHeight } from '../components/styles';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { dismissDialog, showDialog } from '../actions/dialog-actions';
import { login, logout, register } from '../actions/user-actions';
import { createParameter, createPackage, updateParameter,
	deleteParameter, deletePackage, deleteReport, deleteScript } from '../actions/crud-actions';
import { getVersions } from '../actions/app-actions';

class Application extends Component {
	componentDidMount() {
		this.props.dispatch(getVersions());
	}
	render() {
		const props = this.props;
		const titlebarSections = [
			{ ref: 'scripts', label: 'Script' },
			{ ref: 'parameters', label: 'Parameter' },
			{ ref: 'packages', label: 'Package' },
			{ ref: 'reports', label: 'Report' },
			{ ref: 'guide', label: 'Guide' }
		];

		return (
			<div style={fillHeight}>
				<GnTitlebar brand='Gear Test Automation'
					sections={titlebarSections}
					menuTitle={this.props.email ? this.props.email : 'Login'}
					menus={this.props.email ? [{ ref: 'logout', label: 'Logout' }] : []}
					onBrandClicked={() => this.props.history.replaceState(null, '')}
					onMenuSelected={this.onTitlebarMenuSelected.bind(this)}
					onSectionSelected={this.onTitlebarSectionSelected.bind(this)}/>
				{this.props.children}
				<FormDialog show={props.dialogShow} label={props.dialogLabel} submitting={props.submitting} error={props.error}
                    select={props.dialogSelect} onCancelAction={this.onCancelDialogAction.bind(this)}
                    onPerformAction={this.onPerformDialogAction.bind(this)}/>
			</div>
		);
	}
	onTitlebarMenuSelected(ref) {
		if (ref == 'Login') {
			this.props.dispatch(showDialog('login'));
		} else if (ref == 'logout') {
			this.props.history.replaceState(null, '');
			this.props.dispatch(logout());
		}
	}
	onTitlebarSectionSelected(section) {
		if (section == this.props.params.section) {
			return;
		}
		
		this.props.history.replaceState(null, `/${section}`);
	}
	onCancelDialogAction() {
		this.props.dispatch(dismissDialog());
	}
	onPerformDialogAction(label, data, file) {
		switch(label) {
			case 'login':
				this.props.dispatch(login(data.email, data.password));
				break;
			case 'register':
				this.props.dispatch(register(data.email, data.password));
				break;
			case 'go-register':
				this.props.dispatch(showDialog('register'));
				break;
			case 'parameter':
				if (this.props.dialogSelect.id) {
					this.props.dispatch(updateParameter(this.props.dialogSelect.id, data));
				} else {
					this.props.dispatch(createParameter(data));
				}
				break;
			case 'package':
				this.props.dispatch(createPackage(data, file));
				break;
			case 'del-parameter':
				this.props.dispatch(deleteParameter(this.props.dialogSelect.id));
				break;
			case 'del-package':
				this.props.dispatch(deletePackage(this.props.dialogSelect.id));
				break;
			case 'del-report':
				this.props.dispatch(deleteReport(this.props.dialogSelect.id));
				break;
			case 'del-script':
				this.props.dispatch(deleteScript(this.props.dialogSelect.id));
				break;
		}
	}
}

const propsSelector = createSelector(
	state => state.user.email,
	state => state.dialogSelect,
	state => state.status.submitting,
	state => state.status.error,
	state => state.status.dialogShow,
	state => state.status.dialogLabel,
    (email, dialogSelect, submitting, error, dialogShow, dialogLabel) =>
    	({email, dialogSelect, submitting, error, dialogShow, dialogLabel})
);

export default connect(propsSelector)(Application);

