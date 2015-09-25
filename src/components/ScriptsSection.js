import React, { Component, PropTypes } from 'react';
import { Paper, LeftNav, FontIcon, FloatingActionButton } from 'material-ui';
import FolderDrawer from './FolderDrawer';
import { extratProps, combinePropTypes } from '../utils';
import MenuItem from 'material-ui/lib/menus/menu-item';

class ScriptsSection extends Component {
	render() {
		const drawerStyle = {
			marginTop: 66,
			width: 300
		};
		const fabBtn = {
			position: 'absolute',
			bottom: 20,
			right: 20
		};

		return (
			<div style={{paddingLeft: 300}}>
				<FolderDrawer style={drawerStyle}
					{...extratProps(this.props, FolderDrawer)}/>

				<FloatingActionButton style={fabBtn}>
					<FontIcon className="material-icons">add</FontIcon>
				</FloatingActionButton>
			</div>
		);
	}
}

ScriptsSection.propTypes = combinePropTypes(FolderDrawer);

export default ScriptsSection;