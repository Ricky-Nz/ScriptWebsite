import React, { Component, PropTypes } from 'react';
import { Dialog, FlatButton, TextField, CircularProgress } from 'material-ui';
import Dropzone from 'react-dropzone';
import { absoluteRT } from '../styles';
import _ from 'underscore';

class EditorDialog extends Component {
	constructor(props) {
		super(props);
		let state = {};
		if (this.props.fields) {
			this.props.fields.forEach(field => state[field.ref] = field.value);
		}
		this.state = state;
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.showDialog) {
			let state = {};
			if (this.props.fields) {
				this.props.fields.forEach(field => state[field.ref] = field.value);
			}
			this.setState(state);
			this.refs.dialog.show();
		}  else {
			this.refs.dialog.dismiss();
		}
	}
	render() {
		let editFields = this.props.fields ? this.props.fields.map((field, index) => {
			if (field.type == 'file') {
				return (
		            <Dropzone style={{width: '100%', border: '2px dashed gray', padding: 20 }} multiple={false} onDrop={this._onFileSelected.bind(this)}>
		            	<p>{this.state.file ? this.state.file.name : 'Dropping some files here, or click to select files to upload.'}</p>
		            </Dropzone>
				);
			} else {
				return (
					<TextField
						key={index}
						ref={field.ref}
						fullWidth={true}
						hintText={field.hint}
						errorText={field.errorText}
					    floatingLabelText={field.label}
					    type={field.type}
					    value={this.state[field.ref]}
					    onChange={this._textFieldChanged.bind(this, field)} />
				);
			}
		}) : null;

		let dialogActions = [
			<FlatButton
				label="Cancel"
				secondary={true}
				onTouchTap={this.props.onCancel} />,
			<FlatButton
				label="Submit"
				primary={true}
				disabled={_.some(this.props.fields, field => field.required && !this.state[field.ref])}
				onTouchTap={this._onSubmitClicked.bind(this)} />
		];

		return (
			<Dialog ref='dialog' modal={true} title={this.props.title} actions={dialogActions}>
				{editFields}
				{this.props.updating ?
					<CircularProgress style={absoluteRT} mode='indeterminate' size={0.6} /> : null}
			</Dialog>
		);
	}
	showProcess() {
		this.setState({ showProcess: true });
	}
	hide() {
		this.setState({ showProcess: false });
		this.refs.dialog.dismiss();
	}

	_onFileSelected(files) {
		this.setState({file: files[0]});
	}
	_textFieldChanged(field) {
		this.setState({[field.ref]: this.refs[field.ref].getValue()});
	}
	_onSubmitClicked() {
		let result = {};
		let attachment;
		if (this.props.fields) {
			this.props.fields.forEach(field => {
				if (field.type == 'file') {
					attachment = this.state[field.ref];
				} else {
					result[field.ref] = this.state[field.ref];
				}
			});
		}
		this.props.onSubmit(this.props.itemId, result, attachment);
	}
}

EditorDialog.propTypes = {
	title: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onDismiss: PropTypes.func,
	updating: PropTypes.bool,
	showDialog: PropTypes.bool,
	itemId: PropTypes.string,
	fields: PropTypes.arrayOf({
		ref: PropTypes.string.isRequired,
		hint: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		required: PropTypes.bool.isRequired,
		value: PropTypes.string,
		errorText: PropTypes.string
	}).isRequired
};

export default EditorDialog;



