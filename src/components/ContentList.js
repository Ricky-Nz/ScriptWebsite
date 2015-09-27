import React, { Component, PropTypes } from 'react';
import { List, ListItem, FontIcon, IconButton, IconMenu } from 'material-ui';
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');

class ContentList extends Component {
	render() {
		let listItems;
		if (this.props.datas) {
			listItems = this.props.datas.map((data, index) => {
				const rightbtn = (
					<IconMenu iconButtonElement={<IconButton iconClassName="material-icons">more_vert</IconButton>}>
						<MenuItem primaryText="Edit" leftIcon={<FontIcon className="material-icons">mode_edit</FontIcon>} />
						<MenuDivider/>
						<MenuItem primaryText="Delete" leftIcon={<FontIcon className="material-icons">delete</FontIcon>}/>
					</IconMenu>
				);
				return <ListItem primaryText={data[this.props.primaryKey]}
							secondaryText={data[this.props.secondaryKey]}
							leftIcon={<FontIcon className="material-icons">{this.props.leftIcon}</FontIcon>}
							rightIconButton={rightbtn} />;
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
	leftIcon: PropTypes.string
};

export default ContentList;
