import React, { Component, PropTypes } from 'react';
import { GnTitlebar } from '../components/elements';
import { FormDialog } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { dismissDialog, showLoginDialog } from '../actions/dialog-actions';
import { dialogSubmit } from '../actions/crud-actions';
import { login, logout } from '../actions/user-actions';

class Application extends Component {
	componentDidMount() {
		if (['/folders', '/scripts', '/reports', '/parameters', '/packages'].indexOf(this.props.location.pathname) >= 0 && !this.props.access_token) {
			this.props.dispatch(showLoginDialog(`/${this.props.location.path}`));
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.redirect != nextProps.redirect) {
			this.props.history.replaceState(null, nextProps.redirect);
		}
	}
	render() {
		return (
			<div>
				<GnTitlebar brand='Gear Test Automation'
					sections={[
						{ ref: 'folders', label: 'Script' },
						{ ref: 'parameters', label: 'Parameter' },
						{ ref: 'packages', label: 'Package' },
						{ ref: 'reports', label: 'Report' },
						{ ref: 'guide', label: 'Guide' }
					]}
					menuTitle={this.props.email ? this.props.email : 'Login'}
					menus={this.props.email ? [
						{ ref: 'logout', label: 'Logout' },
					] : []}
					onMenuSelected={key => {
						if (key == 'Login') {
							this.props.dispatch(showLoginDialog());
						} else if (key == 'logout') {
							this.props.dispatch(logout());
						}
					}}
					onSectionSelected={this.onSectionSelected.bind(this)}/>
				<br/><br/><br/><br/>
				{this.renderSection()}
				<FormDialog {...this.props.dialog}
                    onPerformAction={(ref, args, fields, id, attachment) => {
                    	this.props.dispatch(dismissDialog());
                    	if (['folders', 'scripts', 'reports', 'parameters', 'packages'].indexOf(label) >= 0) {
                    		this.props.dispatch(dialogSubmit(fields, itemId, attachment, label));
                    	} else {
                    		this.props.dispatch(login(fields.email, fields.password, label));
                    	}
                    }}/>
			</div>
		);
	}
	renderSection() {
		if (!this.props.access_token &&
			['/folders', '/scripts', '/reports', '/parameters', '/packages'].indexOf(this.props.location.pathname) >= 0) {
			return null;
		}

		return this.props.children;
	}
	onSectionSelected(section) {
		if (['folders', 'scripts', 'reports', 'parameters', 'packages'].indexOf(section) < 0 || this.props.access_token) {
			this.props.history.replaceState(null, `/${section}`);
		} else {
			this.props.dispatch(showLoginDialog(`/${section}`));
		}
	}
}

const propsSelector = createSelector(
	state => state.app.access_token,
	state => state.app.redirect,
	state => state.app.email,
	state => state.dialog,
    (access_token, redirect, email, dialog) => ({ access_token, redirect, email, dialog })
);

export default connect(propsSelector)(Application);

