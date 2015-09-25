import React, { Component, PropTypes } from 'react';
import { LeftNav, List, ListItem, FontIcon, IconMenu, IconButton } from 'material-ui';
import FolderCreater from './FolderCreater';
import { extratProps, combinePropTypes } from '../utils';
import MenuItem from 'material-ui/lib/menus/menu-item';

class FolderDrawer extends Component {
	componentDidMount() {
		this.props.onLoadFolders();
	}
	_onFolderSelcted(e, index, menuItem) {
		this.props.onSelectFolder(index);
	}
	_renderContent() {

	}
	render() {
		const drawerTitleStyle = {
			padding: '0px 10px'
		};
		let menuItems = this.props.folders.map(folder => {
			return (<ListItem primaryText={folder.title} secondaryText={folder.date}
						leftIcon={<FontIcon className="material-icons">folder</FontIcon>} />);
		});

		return (
			<LeftNav style={this.props.style} ref="leftNav" menuItems={[]} header={
				<div>
					<FolderCreater style={drawerTitleStyle}
						{...extratProps(this.props, FolderCreater)}/>
					<List>
						{menuItems}
					</List>
				</div>
			} />
		);
	}
}

FolderDrawer.propTypes = combinePropTypes(FolderCreater, {
	folders: PropTypes.array,
	onLoadFolders: PropTypes.func,
	onSelectFolder: PropTypes.func,
	loadingFolders: PropTypes.bool,
	selectFolderIndex: PropTypes.number
});

export default FolderDrawer;
