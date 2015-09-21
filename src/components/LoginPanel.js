/**
 * Created by ruiqili on 20/9/15.
 */
import React, { Component, PropTypes } from 'react';
import { Paper, TextField, RaisedButton, CircularProgress } from 'material-ui';

class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: this.props.password
        };
    }
    _onLoginClicked() {
        this.props.onLogIn(this.state);
    }
    _onRegisterClicked() {
        this.props.onSignUp(this.state);
    }
    _renderBottomabr() {
        const bottomBar = {
            display: 'flex',
            flexDirection: 'row-reverse',
            marginTop: 10
        };
        const actionBtn = {
            marginLeft: 10
        };

        if (this.props.isLogingIn) {
            return (
                <div style={bottomBar}>
                    <CircularProgress mode="indeterminate" size={0.5} />
                </div>
            );
        } else {
            return (
                <div style={bottomBar}>
                    <RaisedButton label="Login" primary={true}
                        style={actionBtn} onClick={this._onLoginClicked.bind(this)}
                        disabled={!this.state.username || !this.state.password} />
                    <RaisedButton label="Sign up" primary={true}
                        onClick={this._onRegisterClicked.bind(this)} />
                </div>
            );
        }
    }
    render() {
        const container = {
            padding: '10px 20px'
        };

        return (
            <Paper style={container}>
                <TextField ref="username" fullWidth="true" hintText="enter username"
                    floatingLabelText="Username" type="text"
                    onChange={() => this.setState({username: this.refs.username.getValue()})} />
                <TextField ref="password" fullWidth="true" hintText="enter password"
                    floatingLabelText="Password" type="password"
                    onChange={() => this.setState({password: this.refs.password.getValue()})} />
                {this._renderBottomabr()}
            </Paper>
        );
    }
}

LoginPanel.propTypes = {
    onSignUp: PropTypes.func.isRequired,
    onLogIn: PropTypes.func.isRequired,
    username: PropTypes.string,
    password: PropTypes.string,
    isLogingIn: PropTypes.bool
};

export default LoginPanel;