import React, { Component, PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { horVCenter, smHorFill } from '../styles';
import GnIcon from './GnIcon';
import GnButton from './GnButton';

class GnListItem extends Component {
	render() {
		const primaryStyle = {
			fontSize: '1.1em'
		};
		const secondaryStyle = {
			fontSize: '0.8em',
			color: 'gray'
		};

		return (
			<ListGroupItem href='#' style={Object.assign({}, this.props.style, { border: 'none' })}>
				<div style={horVCenter}>
					{this.props.icon ? <GnIcon icon={this.props.icon}/> : null}
					<div style={smHorFill} onClick={this.props.onItemClicked}>
						<div style={primaryStyle}>{this.props.primary}</div>
						<div style={secondaryStyle}>{this.props.secondary}</div>
					</div>
					{this.props.showEditBtn ? <GnButton bsStyle='link' icon='edit' onClick={this.props.onEditItem}/> : null}
					{this.props.showDeleteBtn ? <GnButton bsStyle='link' icon='remove' onClick={this.props.onDeleteItem}/> : null}
				</div>
			</ListGroupItem>
		);
	}
}

GnListItem.propTypes = {
	icon: PropTypes.string,
	primary: PropTypes.string.isRequired,
	secondary: PropTypes.string,
	showEditBtn: PropTypes.bool,
	showDeleteBtn: PropTypes.bool,
	onItemClicked: PropTypes.func,
	onMenuSelected: PropTypes.func,
	onEditItem: PropTypes.func,
	onDeleteItem: PropTypes.func
};

export default GnListItem;