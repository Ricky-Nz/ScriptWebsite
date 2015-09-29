/**
 * Created by ruiqili on 19/9/15.
 */
import React, { Component, PropTypes } from 'react';
import { FormDialog } from '../components';
import { GnIconButton } from '../components/elements';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { login } from '../actions/user-actions';
import { openLoginDialog, dismissDialog } from '../actions/dialog-actions';

class LoginPage extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.access_token) {
            this.props.history.replaceState(null, '/dashboard/folders');
        }
    }
    render() {
        return (
            <div style={{height: '100%', backgroundColor: '#66cdaa', padding: 15}}>
                <GnIconButton icon='user' label='Login' onClick={this.onLoginClicked.bind(this)}/>
                <FormDialog {...this.props.dialog}
                    onHide={() => this.props.dispatch(dismissDialog())}
                    onSubmit={this.onDialogSubmit.bind(this)}/>
            </div>
        );
    }
    onLoginClicked() {
        this.props.dispatch(openLoginDialog());
    }
    onDialogSubmit(data) {
        this.props.dispatch(login(data.email, data.password));
    }
}

const stateSelector = createSelector(
    state => state.dialog,
    state => state.app.access_token,
    (dialog, access_token) => ({ dialog, access_token })
);

export default connect(stateSelector)(LoginPage);