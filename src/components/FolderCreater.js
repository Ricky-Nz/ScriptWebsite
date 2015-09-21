import React, { Component, PropTypes } from 'react';
import { TextField, FlatButton, FontIcon, CircularProgress } from 'material-ui';

class FolderCreater extends Component {
	_onSubmitClicked() {
		this.props.onCreateFolder(this.refs.folderName.getValue())
	}
	_renderActionBar() {
		const actionStyle = {
			alignSelf: 'flex-end'
		};

		if (this.props.creating) {
			return (
				<CircularProgress mode="indeterminate" size={0.5} style={actionStyle}/>
			);
		} else {
			return (
				<FlatButton secondary={true} label="Sumbit" style={actionStyle}
					onClick={this._onSubmitClicked.bind(this)}>
					<FontIcon className="muidocs-icon-custom-github"/>
				</FlatButton>
			);
		}
	}
	render() {
		let contentStyle = Object.assign({}, this.props.style, {
			display: 'flex',
			flexDirection: 'column'
		});
		const inputStyle = {
			width: 240
		};

		return (
			<div style={contentStyle}>
				<TextField ref="folderName" hintText="enter name" type="text"
					errorText={this.props.errorText} floatingLabelText="New Folder Name" style={inputStyle}/>
				{this._renderActionBar()}
			</div>
		);
	};
}

FolderCreater.propTypes = {
	errorText: PropTypes.string,
	creating: PropTypes.bool,
	createFolder: PropTypes.func
};

export default FolderCreater;

