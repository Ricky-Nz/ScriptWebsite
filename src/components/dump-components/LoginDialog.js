import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { GnInput, GnButton } from './elements';

class LoginDialog extends Component {
	render() {
		return (
		    <Modal bsSize='small' show={this.props.show}
		        onHide={this.props.onCancel} backdrop={this.props.submitting ? 'static' : true}>
		        <Modal.Header closeButton>
		            <Modal.Title>User Login</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		            <GnInput ref='email' icon='user' defaultValue='ruiqi.sg@gmail.com'
		                regex='^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$'
		                help='Username must be a valid email address'
		                placeholder='login id' type='email' required/>,
		            <GnInput ref='password' icon='key' defaultValue='123456'
		            	regex='^(?!\s*$).+' help='Password can not be empty'
		                placeholder='login password' type='password' required/>
		            <div className='errorText'>{this.props.error}</div>
		        </Modal.Body>
		        <Modal.Footer>
		            <GnButton icon='user-plus' label='Register'
		                onClick={this.props.onRegister} disabled={this.props.submitting}/>
		            <GnButton icon='send' label='Login'
		                onClick={this.onSubmit.bind(this)} gnStyle='primary'
		                disabled={this.props.submitting} active={this.props.submitting}/>
		        </Modal.Footer>
		    </Modal>
		);
	}
	onSubmit() {
		if (!this.refs.email.validate() || !this.refs.password.validate()) {
			return;
		}

		this.props.onLogin(this.refs.email.getValue(),
			this.refs.password.getValue());
	}
}

LoginDialog.propTypes = {
    show: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};

export default LoginDialog;