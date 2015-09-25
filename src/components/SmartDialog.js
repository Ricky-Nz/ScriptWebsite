import React, { Component, PropTypes } from 'react';
import { Dialog } from 'material-ui';

class SmartDialog extends Component {
	show() {
		this.refs.dialog.show();
	}
	dismiss() {
		this.refs.dialog.dismiss();
	}
	render() {
		<Dialog ref='dialog'
			title={this.props.title}>
			TEST
		</Dialog>
	}
}

SmartDialog.propTypes = {
	title: PropTypes.string
};

export default SmartDialog;