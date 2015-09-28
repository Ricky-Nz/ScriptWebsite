import React, { Component, PropTypes } from 'react';
import { List, ListItem, FontIcon, IconButton, IconMenu } from 'material-ui';
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');

class ContentList extends Component {
	renderItemMenu(data) {
		if (this.props.itemActions) {
			const menuItems = this.props.itemActions.map(menu => (
				<MenuItem primaryText={menu.title} leftIcon={menu.icon ? <FontIcon className="material-icons">{menu.icon}</FontIcon> : null}
					onClick={() => menu.action(data)}/>
			));

			return (
				<IconMenu iconButtonElement={<IconButton iconClassName="material-icons">more_vert</IconButton>}>
					{menuItems}
				</IconMenu>
			);
		}
	}
	render() {
		let listItems;
		if (this.props.datas) {
			listItems = this.props.datas.map((data, index) => {
				const rightMenu = this.renderItemMenu(data);
				return <ListItem key={index}
							primaryText={data[this.props.primaryKey]}
							secondaryText={data[this.props.secondaryKey]}
							leftIcon={<FontIcon className="material-icons">{this.props.leftIcon}</FontIcon>}
							rightIconButton={rightMenu} />;
			});
		}

		return (
			<List subheader={this.props.header}>
				{listItems}
			</List>
		);
	}
}

ContentList.propTypes = {
	header: PropTypes.string,
	datas: PropTypes.array.isRequired,
	primaryKey: PropTypes.string.isRequired,
	secondaryKey: PropTypes.string,
	leftIcon: PropTypes.string,
	itemActions: PropTypes.arrayOf({
		title: PropTypes.string.isRequired,
		action: PropTypes.func.isRequired,
		icon: PropTypes.string
	})
};

export default ContentList;
