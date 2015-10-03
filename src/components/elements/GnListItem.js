import React, { Component, PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { horVCenter, smHorFill } from '../styles';
import GnIcon from './GnIcon';
import GnIconButton from './GnIconButton';

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
			<ListGroupItem href='#' style={Object.assign({}, this.props.style, { border: 'none' })}
				onClick={this.props.onItemClicked}>
				<div style={horVCenter}>
					{this.props.icon ? <GnIcon icon={this.props.icon}/> : null}
					<div style={smHorFill}>
						<div style={primaryStyle}>{this.props.primary}</div>
						<div style={secondaryStyle}>{this.props.secondary}</div>
					</div>
					{this.props.showEditBtn ? <GnIconButton bsStyle='link' icon='edit' onClick={this.props.onEditItem}/> : null}
					{this.props.showDeleteBtn ? <GnIconButton bsStyle='link' icon='remove' onClick={this.props.onDeleteItem}/> : null}
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