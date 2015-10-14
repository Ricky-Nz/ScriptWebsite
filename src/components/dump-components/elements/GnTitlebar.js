import React, { PropTypes } from 'react';
import { Navbar, NavBrand, CollapsibleNav } from 'react-bootstrap';
import GnIcon from './GnIcon';

const GnTitlebar = props => {
	const { brandIcon, brandLabel, onBrandClicked, children, ...narbarProps } = props;

	return (
		<Navbar fixedTop style={{margin: 0}} {...narbarProps} toggleNavKey='collapsable-menu'>
			<NavBrand onClick={onBrandClicked}>
				<GnIcon icon={brandIcon} style={{marginRight: 10}}/>{brandLabel}
			</NavBrand>
			<CollapsibleNav eventKey='collapsable-menu'>
				{children}
			</CollapsibleNav>
		</Navbar>
	);
}

GnTitlebar.propTypes = {
	brandIcon: PropTypes.string,
	brandLabel: PropTypes.string,
	onBrandClicked: PropTypes.func
};

export default GnTitlebar