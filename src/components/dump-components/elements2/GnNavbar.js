import React, { Component, PropTypes } from 'react';
import { Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

class GnNavbar extends Component {
	render() {
		const { items, onSelect, ...navProps } = this.props;
		const sectionItems = items.map((item, index) => {
			if (item.key instanceof Array) {
				const menuItems = item.key.map((menu, index) => (
					<MenuItem key={index} eventKey={menu.key}>{menu.label}</MenuItem>
				));

				return (
					<NavDropdown id='dropdown' key={index} title={item.label}>
						{menuItems}
					</NavDropdown>
				);
			} else {
				return <NavItem key={index} eventKey={item.key}>{item.label}</NavItem>;
			}
		});

		return (
			<Nav navbar {...navProps} onSelect={onSelect}>
				{sectionItems}
			</Nav>
		);
	}
}

GnNavbar.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		key: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.shape({
				label: PropTypes.string,
				key: PropTypes.string
			}))
		]).isRequired
	})).isRequired,
	onSelect: PropTypes.func.isRequired
};

export default GnNavbar;