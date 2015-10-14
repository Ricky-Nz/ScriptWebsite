import React, { PropTypes } from 'react';
import GnIcon from './GnIcon';
import GnButton from './GnButton';
import GnDropdownButton from './GnDropdownButton';
import GnListItem from './GnListItem';

let GnMenuListItem = props => {
	const { icon, menus, onMenuSelected, ...itemProps } = props;
	let rigthMenu;
	if (menus) {
		if (menus.length < 3) {
			rigthMenu = (
				<span>
					{menus.map((menu, index) => (
						<GnButton bsStyle='link' key={index} icon={menu.icon} onClick={() => props.onMenuSelected(menu.ref)}/>
					))}
				</span>
			);
		} else {
			rigthMenu = <GnDropdownButton bsStyle='link' title={<GnIcon icon='list'/>} options={props.menus}
				onSelect={props.onMenuSelected}/>
		}
	}

	return (
		<GnListItem {...itemProps} leftView={icon ? <GnIcon icon={icon}/> : null}
			rightView={rigthMenu}/>
	);
}

GnMenuListItem.propTypes = {
	icon: PropTypes.string,
	primary: PropTypes.string.isRequired,
	secondary: PropTypes.string,
	menus: PropTypes.arrayOf(PropTypes.shape({
		icon: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ref: PropTypes.string.isRequired
	})).isRequired,
	onMenuSelected: PropTypes.func
};

export default GnMenuListItem;