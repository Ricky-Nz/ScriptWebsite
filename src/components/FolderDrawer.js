import React, { Component, PropTypes } from 'react';
import { LeftNav, MenuItem } from 'material-ui';
import FolderCreater from './FolderCreater';
import { extratProps, combinePropTypes } from '../utils';

class FolderDrawer extends Component {
	componentDidMount() {
		this.props.loadFolders();
	}
	_onFolderSelcted(e, index, menuItem) {
		this.props.onSelectFolder(index);
	}
	getDrawerHeader() {
		const drawerTitleStyle = {
			padding: '0px 10px'
		};

		return (
			<FolderCreater style={drawerTitleStyle}
				{...extratProps(this.props, FolderCreater)}/>
		);
	}
	render() {
		let menuItems = [{ type: MenuItem.Types.SUBHEADER, text: 'Folders' }];
		if (this.props.folders) {
			this.props.folders.forEach(folder => {
				menuItems.push({ text: folder.name, payload: folder.id });
			});
		}

		return (
			<LeftNav ref="leftNav" header={this.getDrawerHeader()} menuItems={menuItems} selectedIndex={this.props.selectedIndex}
				style={this.props.style} onChange={this._onFolderSelcted.bind(this)}/>
		);
	}
}

FolderDrawer.propTypes = combinePropTypes({
	folders: PropTypes.array,
	loadFolders: PropTypes.func,
	onSelectFolder: PropTypes.func,
	loadingFolders: PropTypes.bool,
	selectedIndex: PropTypes.number
});

export default FolderDrawer;
