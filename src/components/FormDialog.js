/**
 * Created by ruiqili on 20/9/15.
 */
import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GnInput, GnIconButton } from './elements';
import { errorStyle } from './styles';
import _ from 'underscore';

class FormDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let formFields;
        if (this.props.fields) {
            formFields = this.props.fields.map(
                (field, index) => <GnInput key={index} ref={field.ref} {...field} />);
        }

        let actionButtons;
        if (this.props.buttons) {
            actionButtons = this.props.buttons.map(
                (button, index) => <GnIconButton key={index} bsSize='small' icon={button.icon}
                    bsStyle={button.bsStyle} active={ (index + 1) == this.props.buttons.length ? this.props.processing : false}
                    label={button.label} onClick={this.onButonClicked.bind(this, button.ref, button.args)}/>);
        }

        return (
            <Modal bsSize={this.props.size} show={this.props.show}
                onHide={() => this.props.onPerformAction('cancel')} backdrop={this.props.processing ? 'static' : true}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formFields}
                    <div style={errorStyle}>{this.props.error}</div>
                </Modal.Body>
                <Modal.Footer>
                    {actionButtons}
                </Modal.Footer>
            </Modal>
        );
    }
    onButonClicked(ref, args) {
        if (ref == 'submit' && this.props.fields) {
            let allValidate = _.every(this.props.fields, field => this.refs[field.ref].validete());
            if (allValidate) {
                let fields = {};
                let attachment;
                this.props.fields.forEach(item => {
                    if (item.type == 'file') {
                        attachment = this.refs[item.ref].getValue();
                    } else {
                        fields[item.ref] = this.refs[item.ref].getValue();
                    }
                });
                this.props.onPerformAction(ref, args, fields, this.props.itemId, attachment);
            }
        } else {
            this.props.onPerformAction(ref, args, null, this.props.itemId, null);
        }
    }
}

FormDialog.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    itemId: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape(GnInput.propTypes)),
    buttons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string.isRequired,
        ref: PropTypes.string.isRequired,
        bsStyle: PropTypes.string,
        args: PropTypes.string
    })).isRequired,
    error: PropTypes.string,
    processing: PropTypes.bool,
    onPerformAction: PropTypes.func,
};

FormDialog.defaultProps = {
    size: 'medium'
};

export default FormDialog;

