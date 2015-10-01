import React, { Component, PropTypes } from 'react';
import { GnTitlebar } from '../components/elements';
import { SearchableList, FormDialog } from '../components';
import { Panel, Row, Col } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showFormDialog, dismissDialog } from '../actions/dialog-actions';
import { dialogSubmit, querySectionData, queryScripts } from '../actions/crud-actions';

const panelConfigs = {
	folders: {
		mainPanel: { xs: 6, sm: 5, md: 4 },
		secondaryPanel: { xs: 6, sm: 7, md: 8 },
		secondaryLabel: 'scripts'
	},
	parameters: {
		mainPanel: { xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2, lg: 6, lgOffset: 3 }
	},
	packages: {
		mainPanel: { xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2, lg: 6, lgOffset: 3 }
	},
	reports: {
		mainPanel: { xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2, lg: 6, lgOffset: 3 }
	}
};

class DashboardPage extends Component {
    componentDidMount() {
    	if (!this.props.access_token) {
            return this.props.history.replaceState(null, '/login');
        }
    }
	render() {
		const config = panelConfigs[this.props.params.section];
		if (!this.props.access_token || !config) {
			return null;
		}

		return (
			<div>
				<GnTitlebar brand='Granny Test Automation'
					sections={[
						{ ref: 'folders', label: 'Script' },
						{ ref: 'parameters', label: 'Parameter' },
						{ ref: 'packages', label: 'Package' },
						{ ref: 'reports', label: 'Report' },
						{ ref: 'guide', label: 'Guide' }
					]}
					menuTitle='Menu'
					menus={[
						{ ref: 'logout', label: 'Logout' },
					]}
					onSectionSelected={section => this.props.history.replaceState(null, `/dashboard/${section}`)}
					onMenuSelected={() => this.props.dispatch(logout())}/>
				<Row>
					{config.mainPanel ?
						<Col {...config.mainPanel}>
							<SearchableList
								label={this.props.params.section}
								datas={this.props.mainDatas}
								loading={this.props.mainState.loading}
								skip={this.props.mainState.skip}
								total={this.props.mainState.total}
								selectIndex={this.props.location.query ? this.props.location.query.folder : null}
								onLoadData={(label, selection) => this.props.dispatch(querySectionData(label, selection))}
								onCreateItem={label => this.props.dispatch(showFormDialog(label))}
								onItemClicked={(label, index, item) => {
									if (label == 'folders') {
										this.props.history.replaceState(null, `/dashboard/folders?select=${index}`);
									}
								}}/>
						</Col> : null
					}
					{config.secondaryPanel && this.props.location.query.select >= 0 ?
						<Col {...config.secondaryPanel}>
							<SearchableList
								label={config.secondaryLabel}
								args={this.props.location.query.select}
								datas={this.props.secondaryDatas}
								loading={this.props.secondaryDatas.loading}
								skip={this.props.secondaryState.skip}
								total={this.props.secondaryState.total}
								onLoadData={(label, selection, args) => {
									if (label == 'scripts') {
										this.props.dispatch(queryScripts(this.props.mainDatas[args].id, selection));
									}
								}}
								onCreateItem={label => console.log(label)}
								onItemClicked={(label, index, item) => {
									console.log(item);
								}}/>
						</Col> : null
					}
				</Row>
				<FormDialog {...this.props.dialog}
                    onHide={() => this.props.dispatch(dismissDialog())}
                    onSubmit={(itemId, fields, attachment, label) =>
                    	this.props.dispatch(dialogSubmit(itemId, fields, attachment, label))}/>
			</div>
		);
	}
}

const propsSelector = createSelector(
	state => state.app.access_token,
	state => state.dialog,
	state => state.mainDatas,
	state => state.mainState,
	state => state.secondaryDatas,
	state => state.secondaryState,
    (access_token, dialog, mainDatas, mainState, secondaryDatas, secondaryState) =>
    	({ access_token, dialog, mainDatas, mainState, secondaryDatas, secondaryState })
);

export default connect(propsSelector)(DashboardPage);

