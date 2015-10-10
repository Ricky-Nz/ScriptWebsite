import React, { Component, PropTypes } from 'react';
import { Navbar, CollapsibleNav, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';
import GnIcon from './GnIcon';

class GnTitlebar extends Component {
	render() {
		return (
			<Navbar fixedTop style={{margin: 0}} toggleNavKey='collapsable-menu'
				brand={<a href='#' onClick={this.props.onBrandClicked}><GnIcon icon='cogs' style={{marginRight: 10}}/>{this.props.brand}</a>}>
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
		let menuItems;
		if (this.props.menus && this.props.menus.length > 0) {
			menuItems = this.props.menus.map((menu, index) => {
				if (menu.divider) {
					return <MenuItem key={index} divider />;
				} else {
					return <MenuItem key={index} eventKey={menu.ref}>{menu.label}</MenuItem>;
				}
			});
		}

		return (
			<Nav navbar right onSelect={(e, key)=> this.props.onMenuSelected(key ? key : e)}>
				{menuItems?
					<NavDropdown title={this.props.menuTitle}>
						{menuItems}
					</NavDropdown>
					: <NavItem eventKey={this.props.menuTitle}>{this.props.menuTitle}</NavItem>
				}
			</Nav>
		);
	}
}

GnTitlebar.propTypes = {
	brand: PropTypes.string.isRequired,
	brandHref: PropTypes.string,
	sections: PropTypes.arrayOf(PropTypes.shape({
		ref: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	})),
	menuTitle: PropTypes.string,
	menus: PropTypes.arrayOf(PropTypes.shape({
		ref: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		divider: PropTypes.bool
	})),
	onBrandClicked: PropTypes.func,
	onMenuSelected: PropTypes.func,
	onSectionSelected: PropTypes.func
};

export default GnTitlebar;

