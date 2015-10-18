import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { GnInput, GnButton } from './elements';

class ParameterDialog extends Component {
	render() {
        const select = this.props.select;
        return (
            <Modal bsSize='small' show={this.props.show}
                onHide={this.props.onCancel} backdrop={this.props.submitting ? 'static' : true}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${select && select.id ? 'Edit' : 'New'} Parameter`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GnInput ref='key' icon='edit' defaultValue={select ? select.key : null}
                        placeholder='parameter key' disabled={select&&select.id} required/>,
                    <GnInput ref='value' icon='edit' defaultValue={select ? select.value : null}
                        placeholder='parameter value' required/>
                    <p className='errorText' style={{padding: '10px 0px 0px 10px'}}>{this.props.error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <GnButton label='Cancel'
                        onClick={this.props.onCancel} disabled={this.props.submitting}/>
                    <GnButton icon='check' label='Submit'
                        onClick={this.onSubmit.bind(this)} gnStyle='primary'
                        disabled={this.props.submitting} active={this.props.submitting}/>
                </Modal.Footer>
            </Modal>
        );
	}
	onSubmit() {
		if (!this.refs.key.validate()
				|| !this.refs.value.validate()) {
			return;
		}

		this.props.onSubmit(
			this.refs.key.getValue(),
			this.refs.value.getValue(),
			this.props.select ? this.props.select.id : null);
	}
}

ParameterDialog.propTypes = {
    show: PropTypes.bool,
    submitting: PropTypes.bool,
    select: PropTypes.object,
    error: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ParameterDialog;

