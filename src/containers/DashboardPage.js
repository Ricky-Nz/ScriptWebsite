import React, { Component, PropTypes } from 'react';
import mui, { Snackbar } from 'material-ui';
import { AppTitlebar, ScriptsSection, ParametersSection, PackagesSection, ReportsSection } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { clearError, selectFolder } from '../actions/app-actions';
import { createFolder, updateFolder, deleteFolder, listFolders } from '../actions/folder-actions';

let ThemeManager = new mui.Styles.ThemeManager();

const appStateSelector = state => state.app;
const foldersSelector = (state, props) => {
	return props.params.section == 'scripts' ? state.folders : null;
};
const parametersSelector = (state, props) => {
	return props.params.section == 'parameters' ? state.parameters : null;
}
const packagesSelector = (state, props) => {
	return props.params.section == 'packages' ? state.packages : null;
}
const reportsSelector = (state, props) => {
	return props.params.section == 'reports' ? state.reports : null;
}

const stateSelector = createSelector(
	appStateSelector,
    foldersSelector,
    parametersSelector,
    packagesSelector,
    reportsSelector,
    (app, folders, parameters, packages, reports) => {
        return { app, folders, parameters, packages, reports };
    }
);

class DashboardPage extends Component {
	getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    _onSectionSelected(value) {
    	if (this.props.params.section === value) return;

    	this.props.history.replaceState(null, '/dashboard/' + value);
    }
    componentWillReceiveProps(nextProps) {
    	if (!nextProps.app.access_token || !nextProps.app.userId) {
            return this.props.history.replaceState(null, '/login');
        }

    	if (nextProps.app.newAction && nextProps.app.error) {
    		this.refs.toast.show();
    		this.props.dispatch(clearError());
    	}
    }
	render() {
		let sectionPanel;
		switch (this.props.params.section) {
			case 'scripts':
				sectionPanel = <ScriptsSection
					error={this.props.error}
					folders={this.props.folders}
					selectFolderIndex={this.props.app.selectFolderIndex}
					onLoadFolders={() => this.props.dispatch(listFolders())}
					onCreateFolder={title => this.props.dispatch(createFolder(title))}
					onSelectFolder={index => this.props.dispatch(selectFolder(index))}/>;
				break;
			case 'parameters':
				sectionPanel = <ParametersSection/>;
				break;
			case 'packages':
				sectionPanel = <PackagesSection/>;
				break;
			case 'reports':
				sectionPanel = <ReportsSection/>;
		}

		return (
			<div>
				<AppTitlebar selectItem={this.props.params.section}
					onSectionSelected={this._onSectionSelected.bind(this)}/>
				{sectionPanel}
			</div>
		);
	}
}

DashboardPage.childContextTypes = {
    muiTheme: PropTypes.object
}

export default connect(stateSelector)(DashboardPage);

