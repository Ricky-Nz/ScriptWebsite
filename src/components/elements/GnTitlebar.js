import React, { Component, PropTypes } from 'react';
import { Navbar, CollapsibleNav, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';

class GnTitlebar extends Component {
	render() {
		return (
			<Navbar brand={<a href={this.props.brandHref}>{this.props.brand}</a>} toggleNavKey='collapsable-menu'>
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

		const sectionItems = this.props.sections.map(section => (
			<NavItem eventKey={section.ref}>{section.label}</NavItem>
		));

		return (
			<Nav navbar onSelect={key => this.props.onSectionSelected(key)}>
				{sectionItems}
			</Nav>
		);
	}
	renderRightNavbar() {
		if (!this.props.menus) {
			return null;
		}

		const menuItems = this.props.menus.map(menu => {
			if (menu.divider) {
				return <MenuItem divider />;
			} else {
				return <MenuItem eventKey={menu.ref}>{menu.label}</MenuItem>;
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
	onSectionSelected: PropTypes.func,
	onMenuSelected: PropTypes.func
};

export default GnTitlebar;

