import React, { Component, PropTypes } from 'react';
import { GnTitlebar, GnNavbar, GnAlertDialog } from './dump-components/elements';
import { LoginDialog, RegisterDialog, PackageDialog, ParameterDialog } from './dump-components';
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
		return (
			<div className='fillHeight'>
				<GnTitlebar brandIcon='cogs' brandLabel='Gear Test Automation'
					onBrandClicked={() => this.props.history.replaceState(null, '')}>
					<GnNavbar items={this.props.leftSections} onSelect={this.onNavabrSelected.bind(this)}/>
					<GnNavbar right items={this.props.rightSsctions} onSelect={this.onNavabrSelected.bind(this)}/>
				</GnTitlebar>
				{this.props.children}
				{this.renderDialog()}
			</div>
		);
	}
	renderDialog() {
		const select = this.props.dialogSelect;
		const commonProps = {
			show: this.props.dialogShow,
			submitting: this.props.submitting,
			error: this.props.error,
			onCancel: this.onCancelDialog.bind(this)
		};
        switch(this.props.dialogLabel) {
            case 'login':
            	return <LoginDialog {...commonProps}
            		onLogin={this.onLogin.bind(this)} onRegister={this.onGoRegister.bind(this)}/>
            case 'register':
            	return <RegisterDialog {...commonProps} onSubmit={this.onRegister.bind(this)}/>
            case 'parameter':
            	return <ParameterDialog {...commonProps} select={select}
            		onSubmit={this.onCommitParameter.bind(this)}/>
            case 'package':
            	return <PackageDialog {...commonProps} onSubmit={this.onCommitPackage.bind(this)}/>
            case 'del-parameter':
            	return <GnAlertDialog {...commonProps} args={select ? select.id : null} title='Confirm'
                	message={`Are you sure you want to delete parameter ${select ? select.key : ''}(${select ? select.value : ''})?`}
                    onSubmit={this.onDeleteParameter.bind(this)}/>;
            case 'del-package':
            	return <GnAlertDialog {...commonProps} args={select ? select.id : null} title='Confirm'
                	message={`Are you sure you want to delete package ${select ? select.title : ''}?`}
                    onSubmit={this.onDeletePackage.bind(this)}/>;
            case 'del-report':
            	return <GnAlertDialog {...commonProps} args={select ? select.id : null} title='Confirm'
                	message={`Are you sure you want to delete report ${select ? select.tags : ''}-${select ? select.date : ''}?`}
                    onSubmit={this.onDeleteReport.bind(this)}/>;
            case 'del-script':
                return <GnAlertDialog {...commonProps} args={select ? select.id : null} title='Confirm'
                	message={`Are you sure you want to delete script ${select ? select.title : ''}?`}
                    onSubmit={this.onDeleteScript.bind(this)}/>;
            default:
                return null;
        };
	}
	onCancelDialog() {
		this.props.dispatch(dismissDialog());
	}
	onLogin(email, password) {
		this.props.dispatch(login(email, password));
	}
	onGoRegister() {
		this.props.dispatch(showDialog('register'));
	}
	onRegister(email, password) {
		this.props.dispatch(register(email, password));
	}
	onCommitParameter(key, value, id) {
		if (id) {
			this.props.dispatch(updateParameter(id, { key, value }));
		} else {
			this.props.dispatch(createParameter({ key, value }));
		}
	}
	onCommitPackage(title, description, file) {
		this.props.dispatch(createPackage({title, description}, file));
	}
	onDeleteScript(id) {
		this.props.dispatch(deleteScript(id));
	}
	onDeleteParameter(id) {
		this.props.dispatch(deleteParameter(id));
	}
	onDeletePackage(id) {
		this.props.dispatch(deletePackage(id));
	}
	onDeleteReport(id) {
		this.props.dispatch(deleteReport(id));
	}
	onNavabrSelected(select) {
		if (select == this.props.params.section) {
			return;
		}

		if (select == 'login') {
			this.props.dispatch(showDialog('login'));
		} else if (select == 'logout') {
			this.props.history.replaceState(null, '');
			this.props.dispatch(logout());
		} else {
			this.props.history.replaceState(null, `/${select}`);
		}
	}
}

const loginSelector = createSelector(
	state => state.user.email,
	email => ({
		leftSections: [
			{ key: 'scripts', label: 'Script' },
			{ key: 'parameters', label: 'Parameter' },
			{ key: 'packages', label: 'Package' },
			{ key: 'reports', label: 'Report' },
			{ key: 'guide', label: 'Guide' }
		],
		rightSsctions: email ?
			[{ label: email, key: [{ label: 'Logout', key: 'logout' }] }]
			: [{ label: 'Login', key: 'login' }]
	})
);

const propsSelector = createSelector(
	loginSelector,
	state => state.dialogSelect,
	state => state.status.submitting,
	state => state.status.error,
	state => state.status.dialogShow,
	state => state.status.dialogLabel,
    (loginInfo, dialogSelect, submitting, error, dialogShow, dialogLabel) =>
    	({...loginInfo, dialogSelect, submitting, error, dialogShow, dialogLabel})
);

export default connect(propsSelector)(Application);

