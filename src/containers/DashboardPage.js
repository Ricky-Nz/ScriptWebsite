import React, { Component, PropTypes } from 'react';
import mui from 'material-ui';
import { AppTitlebar, ScriptsSection, ParametersSection, PackagesSection, ReportsSection } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { createFolder, updateFolder, deleteFolder, listFolders } from '../actions/folder-actions';

let ThemeManager = new mui.Styles.ThemeManager();

const foldersSelector = state => {
	console.log(11111111111111111111111111111);
	console.log(state);
	return state.folders;
};
const parametersSelector = state => state.parameters;
const packagesSelector = state => state.packages;
const reportsSelector = state => state.reports;

const stateSelector = createSelector(
    foldersSelector,
    parametersSelector,
    packagesSelector,
    reportsSelector,
    (folders, parameters, packages, reports) => {
        return { folders, parameters, packages, reports };
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
	render() {
		let sectionPanel;
		switch (this.props.params.section) {
			case 'scripts':
				sectionPanel = <ScriptsSection
					loadFolders={() => {
						this.props.dispatch(listFolders());
					}}
					createFolder={title => {
						this.props.dispatch(createFolder(title));
					}}/>;
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

DashboardPage.propTypes = {

};

DashboardPage.childContextTypes = {
    muiTheme: PropTypes.object
}

export default connect(stateSelector)(DashboardPage);

