import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { GnInput, GnButton } from './elements';

class RegisterDialog extends Component {
	render() {
        return (
            <Modal bsSize='small' show={this.props.show}
                onHide={this.props.onCancel} backdrop={this.props.submitting ? 'static' : true}>
                <Modal.Header closeButton>
                    <Modal.Title>User Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GnInput key='email' ref='email' icon='user' label='Username'
                        placeholder='login id' type='email' required/>,
                    <GnInput key='password' ref='password' icon='key' label='Password'
                        placeholder='login password' type='password' required/>,
                    <GnInput key='confirmPassword' ref='confirmPassword' icon='key' label='Confirm password'
                        placeholder='re-enter login password' type='password' required/>
                    <div className='errorText'>{this.props.error}</div>
                </Modal.Body>
                <Modal.Footer>
                    <GnButton label='Cancel'
                        onClick={this.props.onCancel} disabled={this.props.submitting}/>
                    <GnButton icon='user-plus' label='Submit'
                        onClick={this.onSubmit.bind(this)} gnStyle='primary'
                        disabled={this.props.submitting} active={this.props.submitting}/>
                </Modal.Footer>
            </Modal>
        );
	}
	onSubmit() {
		if (!this.refs.email.validate()
				|| !this.refs.password.validate()
				|| !this.refs.confirmPassword.validate()) {
			return;
		}

		this.props.onSubmit(this.refs.email.getValue(),
			this.refs.password.getValue());
	}
}

RegisterDialog.propTypes = {
    show: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default RegisterDialog;