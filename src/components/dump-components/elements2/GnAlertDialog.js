import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import GnButton from './GnButton';

const GnAlertDialog = props => {
    return (
        <Modal bsSize='small' show={props.show} onHide={props.onCancel}
            backdrop={props.submitting ? 'static' : true}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.message}
                <div className={errorText}>{props.error}</div>
            </Modal.Body>
            <Modal.Footer>
                <GnButton label='Cancel'
                    onClick={props.onCancel} disabled={props.submitting}/>
                <GnButton icon='check' label='Confirm'
                    onClick={props.onSubmit} gnStyle='danger'
                    disabled={props.submitting} active={props.submitting}/>
            </Modal.Footer>
        </Modal>
	);
}

GnAlertDialog.propTypes = {
	submitting: PropTypes.bool,
	show: PropTypes.bool,
    title: PropTypes.node,
    message: PropTypes.node,
    error: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
};

export default GnAlertDialog;