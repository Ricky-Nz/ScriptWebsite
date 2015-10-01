import React, { Component, PropTypes } from 'react';
import { ListGroupItem, Dropdown, MenuItem } from 'react-bootstrap';
import { horVCenter, smHorPadding } from '../styles';
import GnIcon from './GnIcon';

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
			<ListGroupItem href={this.props.href ? this.props.href : '#'}
				style={this.props.style} active={this.props.selected}
				onClick={this.props.onItemClicked ? () => (
					this.props.onItemClicked(this.props.index)
				) : null}>
				<div style={horVCenter}>
					{this.props.icon ? <GnIcon icon={this.props.icon}/> : null}
					<div style={smHorPadding}>
						<div style={primaryStyle}>{this.props.primary}</div>
						<div style={secondaryStyle}>{this.props.secondary}</div>
					</div>
					{this.renderMenu()}
				</div>
			</ListGroupItem>
		);
	}
	renderMenu() {
		if (this.props.menus) {
			const menuItems = this.props.menus.map((menu, index) => (
				menu.divider ? <MenuItem key={index} divider /> :
					<MenuItem key={index} eventKey={menu.ref}>{menu.label}</MenuItem>
			));

			return (
				<Dropdown bsSize='xs' pullRight onSelect={this.props.onMenuSelected}>
					<Dropdown.Toggle>
						<GnIcon icon='list'/>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{menuItems}
					</Dropdown.Menu>
				</Dropdown>
			);
		}
	}
}

GnListItem.propTypes = {
	index: PropTypes.number.isRequired,
	icon: PropTypes.string,
	primary: PropTypes.string.isRequired,
	secondary: PropTypes.string,
	selected: PropTypes.bool,
	menus: PropTypes.arrayOf({
		ref: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		divider: PropTypes.bool
	}),
	onItemClicked: PropTypes.func,
	onMenuSelected: PropTypes.func
};

export default GnListItem;