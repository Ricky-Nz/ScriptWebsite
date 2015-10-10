import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import GnInput from './GnInput';
import GnIconButton from './GnIconButton';
import { errorStyle } from '../styles';

class GnDialog extends Component {
	render() {
        const props = this.props;
		return (
            <Modal bsSize={props.size} show={props.show}
                onHide={props.onCloseDialog} backdrop={props.lock ? 'static' : true}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.content}
                    <div style={errorStyle}>{props.error}</div>
                </Modal.Body>
                <Modal.Footer>
                	{props.leftClicked ?
                        <GnIconButton icon={props.leftIcon} label={props.leftLabel}
                            onClick={props.leftClicked} disabled={props.submitting}/> : null}
                    {props.rightClicked ?
                        <GnIconButton icon={props.rightIcon} label={props.rightLabel}
                            onClick={props.rightClicked} bsStyle={props.rightBsStyle}
                            disabled={props.submitting} active={props.submitting}/> : null}
                </Modal.Footer>
            </Modal>
		);
	}
}

GnDialog.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	lock: PropTypes.bool,
	show: PropTypes.bool,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    error: PropTypes.string,
    leftIcon: PropTypes.string,
    leftLabel: PropTypes.string,
    leftClicked: PropTypes.func,
    rightIcon: PropTypes.string,
    rightLabel: PropTypes.string,
    rightClicked: PropTypes.func,
    rightBsStyle: PropTypes.node,
    onCloseDialog: PropTypes.func,
    submitting: PropTypes.bool
};

GnDialog.defaultProps = {
	size: 'medium',
    leftLabel: 'Cancel',
    rightLabel: 'Submit',
    rightBsStyle: 'primary'
}

export default GnDialog;