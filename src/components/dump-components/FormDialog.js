/**
 * Created by ruiqili on 20/9/15.
 */
import React, { Component, PropTypes } from 'react';
import { GnInput, GnDialog } from './elements';
import _ from 'underscore';

class FormDialog extends Component {
    render() {
        let title, content, size, leftIcon, leftLabel, rightIcon, rightLabel, rightBsStyle;
        const select = this.props.select;
        switch(this.props.label) {
            case 'login':
                size = 'small';
                title = 'User Login';
                content = [
                    <GnInput key='email' ref='email' icon='user' label='Username'
                        placeholder='login id' type='email' required/>,
                    <GnInput key='password' ref='password' icon='key' label='Password'
                        placeholder='login password' type='password' required/>
                ];
                leftIcon = 'user-plus';
                leftLabel = 'Register';
                rightIcon = 'send';
                rightLabel = 'Login';
                break;
            case 'register':
                size = 'small';
                title = 'User Register';
                content = [
                    <GnInput key='email' ref='email' icon='user' label='Username'
                        placeholder='login id' type='email' required/>,
                    <GnInput key='password' ref='password' icon='key' label='Password'
                        placeholder='login password' type='password' required/>,
                    <GnInput key='confirmPassword' ref='confirmPassword' icon='key' label='Confirm password'
                        placeholder='re-enter login password' type='password' required/>
                ];
                rightIcon = 'user-plus';
                break;
            case 'parameter':
                title = `${select && select.id ? 'Edit' : 'New'} Parameter`;
                content = [
                    <GnInput key='key' ref='key' icon='edit' label='Key' initialValue={select ? select.key : null}
                        placeholder='parameter key' disabled={select&&select.id} required/>,
                    <GnInput key='value' ref='value' icon='edit' label='Value' initialValue={select ? select.value : null}
                        placeholder='parameter value' required/>
                ];
                rightIcon = 'check';
                break;
            case 'package':
                title = 'Upload Package';
                content = [
                    <GnInput key='title' ref='title' icon='edit' label='Title'
                        placeholder='package title' required/>,
                    <GnInput key='description' ref='description' icon='edit' label='Description'
                        placeholder='parameter value'/>,
                    <GnInput key='file' ref='file' icon='paperclip' label='Attachment' type='file'
                        required/>
                ];
                rightIcon = 'check';
                break;
            case 'del-parameter':
                title = 'Confirm';
                content = `Are you sure you want to delete parameter ${select ? select.key : ''}(${select ? select.value : ''})?`;
                rightBsStyle = 'danger';
                rightLabel = 'Delete';
                break;
            case 'del-package':
                title = 'Confirm';
                content = `Are you sure you want to delete package ${select ? select.title : ''}?`;
                rightBsStyle = 'danger';
                rightLabel = 'Delete';
                break;
            case 'del-report':
                title = 'Confirm';
                content = `Are you sure you want to delete report ${select ? select.tags : ''}-${select ? select.date : ''}?`;
                rightBsStyle = 'danger';
                rightLabel = 'Delete';
                break;
            case 'del-script':
                title = 'Confirm';
                content = `Are you sure you want to delete script ${select ? select.title : ''}?`;
                rightBsStyle = 'danger';
                rightLabel = 'Delete';
                break;
            default:
                return null;
        }

        return (
            <GnDialog show={this.props.show} size={size} title={title} content={content} error={this.props.error}
                lock={this.props.submitting} leftIcon={leftIcon} leftLabel={leftLabel} rightIcon={rightIcon}
                rightLabel={rightLabel} rightBsStyle={rightBsStyle} submitting={this.props.submitting}
                leftClicked={this.onLeftButtonClicked.bind(this)} rightClicked={this.onRightButtonClicked.bind(this)}
                onCloseDialog={this.onCloseDialog.bind(this)}/>
        );
    }
    onCloseDialog() {
        this.props.onCancelAction();
    }
    onLeftButtonClicked() {
        if (this.props.label == 'login') {
            this.props.onPerformAction('go-register');
        } else {
            this.props.onCancelAction();
        }
    }
    onRightButtonClicked() {
        if (_.contains(['login', 'register', 'parameter', 'package'], this.props.label)) {
            let allValidate = _.every(_.keys(this.refs), ref => this.refs[ref].validete());
            if (allValidate) {
                let fields = {};
                let attachment;
                _.keys(this.refs).forEach(ref => {
                    const element = this.refs[ref];
                    if (element.props.type == 'file') {
                        attachment = element.getValue();
                    } else {
                        fields[ref] = element.getValue();
                    }
                });
                this.props.onPerformAction(this.props.label, fields, attachment);
            }
        } else {
            this.props.onPerformAction(this.props.label, this.props.select);
        }
    }
}

FormDialog.propTypes = {
    show: PropTypes.bool,
    label: PropTypes.oneOf(['login', 'register', 'del-parameter', 'parameter',
                'del-package', 'package', 'del-report', 'del-script']),
    submitting: PropTypes.bool,
    error: PropTypes.string,
    select: PropTypes.object,
    onCancelAction: PropTypes.func.isRequired,
    onPerformAction: PropTypes.func.isRequired
};

export default FormDialog;

