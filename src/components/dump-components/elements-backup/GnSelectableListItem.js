import React, { Component, PropTypes } from 'react';
import { ListGroupItem, Input } from 'react-bootstrap';
import { horVCenter, smHorFill } from '../styles';
import GnIcon from './GnIcon';

class GnListItem extends Component {
	render() {
		return (
			<ListGroupItem href='#' style={Object.assign({}, this.props.style, { border: 'none', padding: 0 })}
				onClick={this.props.onClick}>
				<div style={horVCenter}>
					{this.props.icon ? <GnIcon icon={this.props.icon}/> : null}
					<div style={smHorFill}>{this.props.text}</div>
					<Input type={this.props.mutiSelect ? 'checkbox' : 'radio'} checked={this.props.checked} readOnly/>
				</div>
			</ListGroupItem>
		);
	}
}

GnListItem.propTypes = {
	icon: PropTypes.string,
	text: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	mutiSelect: PropTypes.bool
};

export default GnListItem;