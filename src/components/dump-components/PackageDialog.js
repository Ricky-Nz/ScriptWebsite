import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { GnInput, GnButton } from './elements';

class PackageDialog extends Component {
	render() {
        return (
            <Modal bsSize='small' show={this.props.show}
                onHide={this.props.onCancel} backdrop={this.props.submitting ? 'static' : true}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GnInput ref='title' icon='edit' help='Package title can not be empty'
                        placeholder='package title' required/>,
                    <GnInput ref='description' icon='edit'
                        placeholder='package description'/>,
                    <GnInput ref='file' icon='paperclip' type='file'
                        help='You must select a package file for upload' required/>
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