import React, {, PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import GnIcon from './GnIcon';
import GnButton from './GnButton';
import GnDropdownButton from './GnDropdownButton';

const GnListItem = props => {
	let itemManus;
	if (props.menus) {
		if (props.menus.length < 3) {
			itemManus = itemManus.map((menu, index) => (
				<GnButton key={index} icon={menu.icon} onClick={() => props.onMenuSelected(menu.ref)}/>
			));
		} else {

		}
	}

	return (
		<ListGroupItem href='#' style={Object.assign({}, props.style, { border: 'none' })}>
			<div className={horizontalVerCenter}>
				{props.icon ? <GnIcon icon={props.icon}/> : null}
				<div className={itemGrow}>
					<div className={fontPrimary}>{props.primary}</div>
					<div className={fontSecondary}>{props.secondary}</div>
				</div>
				{itemManus}
			</div>
		</ListGroupItem>
	};
}

GnListItem.propTypes = {
	icon: PropTypes.string,
	primary: PropTypes.string.isRequired,
	secondary: PropTypes.string,
	menus: PropTypes.arrayOf(PropTypes.shape({
		icon: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ref: PropTypes.string.isRequired
	})),
	onMenuSelected: PropTypes.func
};

export default GnListItem;