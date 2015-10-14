import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { GnInput, GnButton } from './elements2';

class ParameterDialog extends Component {
	render() {
        const select = this.props.select;
        return (
            <Modal bsSize='small' show={this.props.show}
                onHide={this.onCancel} backdrop={this.props.submitting ? 'static' : true}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${select && select.id ? 'Edit' : 'New'} Parameter`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GnInput key='key' ref='key' icon='edit' label='Key' initialValue={select ? select.key : null}
                        placeholder='parameter key' disabled={select&&select.id} required/>,
                    <GnInput key='value' ref='value' icon='edit' label='Value' initialValue={select ? select.value : null}
                        placeholder='parameter value' required/>
                    <div className='errorText'>{this.props.error}</div>
                </Modal.Body>
                <Modal.Footer>
                    <GnButton label='Cancel'
                        onClick={this.onLeftButtonClicked.bind(this)} disabled={this.props.submitting}/>
                    <GnButton icon='check' label='Submit'
                        onClick={this.onRightButtonClicked.bind(this)} gnStyle='primary'
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

