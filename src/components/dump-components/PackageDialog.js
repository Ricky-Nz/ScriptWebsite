import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { GnInput, GnButton } from './elements2';

class PackageDialog extends Component {
	render() {
        return (
            <Modal bsSize='small' show={this.props.show}
                onHide={this.props.onCancel} backdrop={this.props.submitting ? 'static' : true}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GnInput key='title' ref='title' icon='edit' label='Title'
                        placeholder='package title' required/>,
                    <GnInput key='description' ref='description' icon='edit' label='Description'
                        placeholder='parameter value'/>,
                    <GnInput key='file' ref='file' icon='paperclip' label='Attachment' type='file'
                        required/>
                    <div className='errorText'>{this.props.error}</div>
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
		if (!this.refs.title.validate()
				|| !this.refs.description.validate()
				|| !this.refs.file.validate()) {
			return;
		}

		this.props.onSubmit(
			this.refs.title.getValue(),
			this.refs.description.getValue(),
			this.refs.file.getValue());
	}
}

PackageDialog.propTypes = {
    show: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default PackageDialog;