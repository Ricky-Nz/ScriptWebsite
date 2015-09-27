import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, FontIcon } from 'material-ui';

class FabButton extends Component {
	render() {
		return (
			<FloatingActionButton {...this.props}>
				<FontIcon className="material-icons">{this.props.icon}</FontIcon>
			</FloatingActionButton>
		);
	}
}

FabButton.propTypes = {
	icon: PropTypes.string.isRequired
};

export default FabButton;