import React, { Component, PropTypes } from 'react';
import { GnTitlebar } from '../components/elements';
import { FormDialog } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { dismissDialog } from '../actions/dialog-actions';
import { dialogSubmit } from '../actions/crud-actions';

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
					onMenuSelected={() => this.props.dispatch(logout())}
					onSectionSelected={section => this.props.history.replaceState(null, `/dashboard/${section}`)}/>
				<br/>
				{this.props.children}
				<FormDialog {...this.props.dialog}
                    onHide={() => this.props.dispatch(dismissDialog())}
                    onSubmit={(itemId, fields, attachment, label) =>
                    	this.props.dispatch(dialogSubmit(itemId, fields, attachment, label))}/>
			</div>
		);
	}
}

const propsSelector = createSelector(
	state => state.app.access_token,
	state => state.app.dialog,
    (access_token, dialog) => ({ access_token, dialog })
);

export default connect(propsSelector)(DashboardPage);

