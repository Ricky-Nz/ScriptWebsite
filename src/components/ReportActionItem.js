import React, { Component, PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import { horVCenter } from './styles';

class ReportActionItem extends Component {
	render() {
		return (
			<div>
				<p>
					<Label bsStyle={this.props.action.err ? 'danger' : 'success'}>{this.props.index + 1}</Label>
					&nbsp;&nbsp;{this.props.action.title}<small>&nbsp;&nbsp;{this.props.action.startDate}</small>
				</p>
				<p style={{color: 'red', overflow: 'auto'}}>{this.props.action.err}</p>
			</div>
		);
	}
}

ReportActionItem.propTypes = {
	action: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired
};

export default ReportActionItem;