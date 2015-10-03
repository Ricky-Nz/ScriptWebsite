/**
 * Created by ruiqili on 20/9/15.
 */
import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GnInput, GnSpinnerButton } from './elements';
import { errorStyle } from './styles';
import _ from 'underscore';

class FormDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Modal bsSize={this.props.size} show={this.props.show}
                onHide={this.props.onHide} backdrop={this.props.processing ? 'static' : true}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderFromFields()}
                    <div style={errorStyle}>{this.props.error}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <GnSpinnerButton bsStyle={this.props.submitStyle} active={this.props.processing}
                        label={this.props.submitText} onClick={this.onSubmitClicked.bind(this)}/>
                </Modal.Footer>
            </Modal>
        );
    }
    renderFromFields() {
        if (!this.props.fields) {
            return null;
        }

        return this.props.fields.map((field, index) => <GnInput key={index} ref={field.ref} {...field} />);
    }

    onSubmitClicked() {
        if (this.props.fields) {
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
                this.props.onSubmit(fields, this.props.itemId, attachment, this.props.label);
            }
        } else {
            this.props.onSubmit(null, this.props.itemId, null, this.props.label);
        }
    }
}

FormDialog.propTypes = {
    label: PropTypes.string,
    itemId: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    show: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fields: PropTypes.array,
    submitText: PropTypes.string,
    submitStyle: PropTypes.string,
    error: PropTypes.string,
    processing: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

FormDialog.defaultProps = {
    size: 'medium',
    submitText: 'Submit',
    submitStyle: 'primary'
};

export default FormDialog;

