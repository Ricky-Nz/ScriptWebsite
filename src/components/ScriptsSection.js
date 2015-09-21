import React, { Component, PropTypes } from 'react';
import { Paper, LeftNav, MenuItem } from 'material-ui';
import FolderDrawer from './FolderDrawer';
import { extratProps, combinePropTypes } from '../utils';

class ScriptsSection extends Component {
	render() {
		const drawerStyle = {
			marginTop: 66
		};

		return (
			<div>
				<FolderDrawer style={drawerStyle}
					{...extratProps(this.props, FolderDrawer)}/>
			</div>
		);
	}
}

ScriptsSection.propTypes = combinePropTypes(FolderDrawer);

export default ScriptsSection;