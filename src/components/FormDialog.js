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
                    <GnSpinnerButton bsStyle="primary" active={this.props.processing}
                        label={this.props.submitText} onClick={this.onSubmitClicked.bind(this)}/>
                </Modal.Footer>
            </Modal>
        );
    }
    renderFromFields() {
        if (!this.props.fields) {
            return null;
        }

        return this.props.fields.map(field => <GnInput ref={field.ref} {...field} />);
    }

    onSubmitClicked() {
        if (this.props.fields) {
            let allValidate = _.every(this.props.fields, field => this.refs[field.ref].isValidete());
            if (allValidate) {
                let resultItem = {};
                this.props.fields.forEach(item => resultItem[item.ref] = this.refs[item.ref].getValue());
                this.props.onSubmit(resultItem);
            }
        } else {
            this.props.onSubmit();
        }
    }
}

FormDialog.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fields: PropTypes.arrayOf(
                Object.assign({ ref: PropTypes.string.isRequired }, GnInput.propTypes)
            ),
    submitText: PropTypes.string.isRequired,
    error: PropTypes.string,
    processing: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

FormDialog.defaultProps = {
    size: 'medium'
};

export default FormDialog;

