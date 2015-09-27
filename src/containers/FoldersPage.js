import React, { PropTypes } from 'react';
import { Snackbar } from 'material-ui';
import { ThemeComponent, FolderDrawer } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectSection } from '../actions/dashboard-actions';
import { createFolder, updateFolder, deleteFolder, loadFolders } from '../actions/folder-actions';
import { extratProps } from '../utils';

class FoldersPage extends ThemeComponent {
	componentDidMount() {
		this.props.dispatch(selectSection('folders'))
	}
	render() {
		const drawerStyle = {
			marginTop: 66,
			width: 300
		};

		return (
			<div style={{paddingLeft: 300}}>
				<FolderDrawer style={drawerStyle}
					folders={this.props.folders}
					onLoadFolders={() => {
						this.props.dispatch(loadFolders());
					}}/>
			</div>
		);
	}
}

const propsSelector = createSelector(
	state => state.folders,
    state => state.folderState,
    (folders, folderState) => {
        return { folders, ...folderState };
    }
);

export default connect(propsSelector)(FoldersPage);

