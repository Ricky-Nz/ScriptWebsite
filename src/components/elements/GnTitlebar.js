import React, { Component, PropTypes } from 'react';
import { Navbar, CollapsibleNav, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';

class GnTitlebar extends Component {
	render() {
		return (
			<Navbar style={{margin: 0}} brand={<a href='/'>{this.props.brand}</a>} toggleNavKey='collapsable-menu'>
				<CollapsibleNav eventKey='collapsable-menu'>
					{this.renderLeftNavbar()}
					{this.renderRightNavbar()}
				</CollapsibleNav>
			</Navbar>
		);
	}
	renderLeftNavbar() {
		if (!this.props.sections) {
			return null;
		}

		const sectionItems = this.props.sections.map((section, index) => (
			<NavItem key={index} eventKey={section.ref}>{section.label}</NavItem>
		));

		return (
			<Nav navbar onSelect={this.props.onSectionSelected}>
				{sectionItems}
			</Nav>
		);
	}
	renderRightNavbar() {
		if (!this.props.menus) {
			return null;
		}

		const menuItems = this.props.menus.map((menu, index) => {
			if (menu.divider) {
				return <MenuItem key={index} divider />;
			} else {
				return <MenuItem key={index} eventKey={menu.ref}>{menu.label}</MenuItem>;
			}
		});

		return (
			<Nav navbar right onSelect={(e, key)=> this.props.onMenuSelected(key)}>
				<NavDropdown title={this.props.menuTitle}>
					{menuItems}
				</NavDropdown>
			</Nav>
		);
	}
}

GnTitlebar.propTypes = {
	brand: PropTypes.string.isRequired,
	brandHref: PropTypes.string,
	sections: PropTypes.arrayOf({
		ref: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	}),
	menuTitle: PropTypes.string,
	menus: PropTypes.arrayOf({
		ref: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		divider: PropTypes.bool
	}),
	onMenuSelected: PropTypes.func,
	onSectionSelected: PropTypes.func
};

export default GnTitlebar;

