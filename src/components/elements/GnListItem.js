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
			<ListGroupItem href='#' style={Object.assign({}, this.props.style, { border: 'none' })}
				onClick={this.props.onItemClicked}>
				<div>
					{this.props.icon ? <GnIcon icon={this.props.icon}/> : null}
					<div style={smHorPadding}>
						<div style={primaryStyle}>{this.props.primary}</div>
						<div style={secondaryStyle}>{this.props.secondary}</div>
					</div>
				<GnIcon icon='list'/>
				</div>
			</ListGroupItem>
		);
	}
	renderMenu() {
		if (this.props.menus) {
			const menuItems = this.props.menus.map((menu, index) => {
				if (menu.divider) {
					return <MenuItem key={index} divider />;
				} else {
					return <MenuItem key={index} eventKey={menu.ref}>{menu.label}</MenuItem>;
				}
			});

			return (
				<Dropdown bsSize='xs' pullRight onSelect={this.props.onMenuSelected}>
					<Dropdown.Toggle>
						<GnIcon icon='list'/>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3" active>Active Item</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
					</Dropdown.Menu>
				</Dropdown>
			);
		}
	}
}

GnListItem.propTypes = {
	icon: PropTypes.string,
	primary: PropTypes.string.isRequired,
	secondary: PropTypes.string,
	menus: PropTypes.arrayOf({
		ref: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		divider: PropTypes.bool
	}),
	onItemClicked: PropTypes.func,
	onMenuSelected: PropTypes.func
};

export default GnListItem;