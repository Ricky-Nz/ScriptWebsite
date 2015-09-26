/**
 * Created by ruiqili on 19/9/15.
 */
import React, { Component, PropTypes } from 'react';
import { LoginPanel } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { login } from '../actions/user-actions';

class LoginPage extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.access_token) {
            this.props.history.replaceState(null, '/dashboard');
        }
    }
    render() {
        return (
            <div>
                <LoginPanel
                    error={this.props.error}
                    loggingIn={this.props.loggingIn}
                    onSignUp={() => {
                        
                    }}
                    onLogIn={(username, password) => {
                        this.props.dispatch(login(username, password));
                    }}/>
            </div>
        );
    }
}

const stateSelector = createSelector(
    state => state.user.access_token,
    state => state.userState.loggingIn,
    state => state.userState.error,
    (access_token, loggingIn, error) => ({ access_token, loggingIn, error })
);

export default connect(stateSelector)(LoginPage);


