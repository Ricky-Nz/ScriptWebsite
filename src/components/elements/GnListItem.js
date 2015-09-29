import React, { Component, PropTypes } from 'react';

class GnListItem extends Component {
	render() {
		return (
			<ListGroupItem style={this.props.style} href='' header={this.props.primary}>{this.props.secondary}</ListGroupItem>
		);
	}
}

GnListItem.propTypes = {
	primary: PropTypes.string,
	secondary: PropTypes.string.isRequired
};

export default GnListItem;