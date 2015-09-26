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
        this.props.onLogIn(this.state.username, this.state.password);
    }
    _onRegisterClicked() {
        this.props.onSignUp(this.state);
    }
    _renderBottomabr() {
        const bottomBar = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10
        };
        const actionBtn = {
            marginLeft: 10
        };
        const errorMsg = {
            color: 'red'
        };

        if (this.props.loggingIn) {
            return (
                <div style={bottomBar}>
                    <CircularProgress mode="indeterminate" size={0.5} />
                </div>
            );
        } else {
            return (
                <div style={bottomBar}>
                    <div style={errorMsg}>{this.props.error}</div>
                    <div style={bottomBar}>
                        <RaisedButton label="Sign up" primary={true}
                            onClick={this._onRegisterClicked.bind(this)} />
                        <RaisedButton label="Login" primary={true}
                            style={actionBtn} onClick={this._onLoginClicked.bind(this)}
                            disabled={!this.state.username || !this.state.password} />
                    </div>
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
                <TextField ref="username" fullWidth={true} hintText="enter username"
                    floatingLabelText="Username" type="text"
                    onChange={() => this.setState({username: this.refs.username.getValue()})} />
                <TextField ref="password" fullWidth={true} hintText="enter password"
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
    loggingIn: PropTypes.bool,
    error: PropTypes.string
};

export default LoginPanel;

