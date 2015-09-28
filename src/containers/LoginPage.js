/**
 * Created by ruiqili on 19/9/15.
 */
import React, { PropTypes } from 'react';
import { Styles } from 'material-ui';
import { ThemeComponent, LoginPanel } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { login } from '../actions/user-actions';

class LoginPage extends ThemeComponent {
    componentWillReceiveProps(nextProps) {
        if (nextProps.access_token) {
            this.props.history.replaceState(null, '/dashboard/folders');
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
    state => state.app.access_token,
    state => state.app.loggingIn,
    state => state.app.error,
    (access_token, loggingIn, error) => ({ access_token, loggingIn, error })
);

export default connect(stateSelector)(LoginPage);


