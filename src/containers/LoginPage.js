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

const userSelector = (state) => {
    if (state.user) return state.user;

    return {};
};

const stateSelector = createSelector(
    userSelector,
    user => {
        return user;
    }
);

class LoginPage extends Component {
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    render() {
        return (
            <div>
                <LoginPanel
                    isLogingIn={this.props.isLogingIn}
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


