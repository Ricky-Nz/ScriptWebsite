/**
 * Created by ruiqili on 19/9/15.
 */
import React, { Component, PropTypes } from 'react';
import { LoginPanel } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { userSignUp, userLogIn } from '../actions/user-actions';
// Material UI
import mui from 'material-ui';
let ThemeManager = new mui.Styles.ThemeManager();

const appStateSelector = state => state.app;

const stateSelector = createSelector(
    appStateSelector,
    app => ({ app })
);

class LoginPage extends Component {
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.app.access_token && nextProps.app.userId) {
            this.props.history.replaceState(null, '/dashboard/scripts');
        }
    }
    render() {
        return (
            <div>
                <LoginPanel
                    error={this.props.app.error}
                    loggingIn={this.props.app.loggingIn}
                    onSignUp={() => {
                        
                    }}
                    onLogIn={(username, password) => {
                        this.props.dispatch(userLogIn(username, password));
                    }}/>
            </div>
        );
    }
}

LoginPage.childContextTypes = {
    muiTheme: PropTypes.object
}

LoginPage.propTypes = {
    isLogingIn: PropTypes.bool
};

export default connect(stateSelector)(LoginPage);


