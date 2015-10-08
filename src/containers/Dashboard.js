import React, { Component, PropTypes } from 'react';
import { ReportSection, PackageSection, ParameterSection, ScriptSection, ScriptEditorSection, HomeSection, GuideSection } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showLoginDialog, showReportDialog, showPackageDialog, showParameterDialog, showScriptDialog } from '../actions/dialog-actions';
import { getTags, updateTagSelection, changeSelection } from '../actions/user-actions';
import {
	queryReports, getReport,
	queryPackages,
	queryParameters,
	queryScripts, getScript, createScript, updateScript, clearScript
} from '../actions/crud-actions';
// Tools
import _ from 'underscore';

class Dashboard extends Component {
	componentDidMount() {
		if (this.requireLogin(this.props)) {
			this.props.dispatch(showLoginDialog());
		} else {
			this.onInitDatas();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.requireLogin(nextProps)) {
			this.props.dispatch(showLoginDialog());
		} else {
			if (nextProps.location.query.select
					&& (nextProps.location.query.select != this.props.location.query.select || !this.props.user.id)) {
				this.onDoLoadItem(nextProps, nextProps.location.query.select);
			} else if (!nextProps.location.query.select && nextProps.detail.data) {
				this.props.dispatch(clearScript());
			}

			if (nextProps.params.section != this.props.params.section
					|| !this.props.user.id) {
				this.onInitDatas(null, nextProps)
			}

			if (nextProps.user.selection != this.props.user.selection) {
				this.props.dispatch(queryScripts(nextProps.user.selection));
			}
		}
	}
	render() {
		if (this.requireLogin(this.props)) {
			return null
		}

		const props = this.props;
		switch(props.params.section){
			case 'reports':
				return <ReportSection arrayData={props.arrayData} detail={props.detail}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onLoadItem={this.onLoadItem.bind(this)}
							onChangeItem={this.onChangeItem.bind(this)}/>;
			case 'packages':
				return <PackageSection arrayData={props.arrayData}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onLoadItem={this.onLoadItem.bind(this)}
							onChangeItem={this.onChangeItem.bind(this)}/>;
			case 'parameters':
				return <ParameterSection arrayData={props.arrayData}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onChangeItem={this.onChangeItem.bind(this)}/>;
			case 'scripts':
				return <ScriptSection arrayData={props.arrayData} tags={props.user.tags}
							onLoadDatas={selection => this.props.dispatch(changeSelection(selection))}
							onChangeItem={this.onChangeItem.bind(this)}
							onSelectScript={item => props.history.pushState(null, `/scripteditor${(item && item.id) ? ('?select=' + item.id) : ''}`)}
							onTagSelectChange={change => this.props.dispatch(updateTagSelection(change))}/>;
			case 'scripteditor':
				return <ScriptEditorSection user={props.user}
							arrayData={props.arrayData} detail={props.detail}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onLoadItem={this.onLoadItem.bind(this)}
							onChangeItem={(item, del) => item.id ? this.onChangeItem(item, del) : props.history.replaceState(null, '/scripteditor')}
							onBack={() => this.props.history.replaceState(null, '/scripts')}/>;
			case 'guide':
				return <GuideSection/>;
			default:
				return <HomeSection/>;
		}
	}
	requireLogin(props) {
		return !props.user.id &&
			_.contains(['scripts', 'scripteditor', 'parameters', 'packages', 'reports'], props.params.section);
	}
	onLoadItem(item) {
		this.props.history.replaceState(null, `/${this.props.params.section}?select=${item.id}`);
	}
	onInitDatas(selection, props) {
		if (!props) {
			props = this.props;
		}
		if (props.params.section == 'scripts') {
			props.dispatch(getTags());
		}
		this.onLoadDatas(selection, props);
	}
	onLoadDatas(selection, props) {
		if (!props) {
			props = this.props;
		}

		switch(props.params.section) {
			case 'reports':
				props.dispatch(queryReports(selection));
				break;
			case 'packages':
				props.dispatch(queryPackages(selection));
				break;
			case 'parameters':
				props.dispatch(queryParameters(selection));
				break;
			case 'scripts':
			case 'scripteditor':
				props.dispatch(queryScripts(selection));
				break;
		}
	}
	onDoLoadItem(props, id) {
		switch(props.params.section) {
			case 'reports':
				props.dispatch(getReport(id));
				break;
			case 'scripteditor':
				props.dispatch(getScript(id));
				break;
		}
	}
	onChangeItem(item, del) {
		const props = this.props;
		if (del) {
			switch(props.params.section) {
				case 'reports':
					props.dispatch(showReportDialog(item, del));
					break;
				case 'packages':
					props.dispatch(showPackageDialog(item, del));
					break;
				case 'parameters':
					props.dispatch(showParameterDialog(item, del));
					break;
				case 'scripts':
				case 'scripteditor':
					props.dispatch(showScriptDialog(item, del));
					break;
			}
		} else if (item.id) {
			switch(props.params.section) {
				case 'parameters':
					props.dispatch(updateParameter(item.id, item));
					break;
				case 'scripteditor':
					props.dispatch(updateScript(item.id, item));
					break;
			}
		} else {
			switch(props.params.section) {
				case 'packages':
					props.dispatch(createPackage(item));
					break;
				case 'parameters':
					props.dispatch(createParameter(item));
					break;
				case 'scripteditor':
					props.dispatch(createScript(item));
					break;
			}
		}
	}
}

const propsSelector = createSelector(
	state => state.user,
	state => state.arrayData,
	state => state.detail,
    (user, arrayData, detail) => ({ user, arrayData, detail })
);

export default connect(propsSelector)(Dashboard);

