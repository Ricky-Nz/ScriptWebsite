import React, { Component, PropTypes } from 'react';
import { ReportSection, PackageSection, ParameterSection, ScriptSection, ScriptEditorSection, HomeSection, GuideSection } from './dump-components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showDialog } from '../actions/dialog-actions';
import { changeSection } from '../actions/app-actions';
import {
	queryReports, getReport,
	queryPackages, getTags,
	queryParameters,
	queryScripts, getScript, createScript, updateScript, clearSelect
} from '../actions/crud-actions';
// Tools
import _ from 'underscore';

class Dashboard extends Component {
	componentDidMount() {
		this.updateSectionCheck(this.props);
		if (this.requireLogin(this.props)) {
			if (this.props.dialogLabel != 'login') {
				this.props.dispatch(showDialog('login'));
			}
		} else {
			this.onInitDatas();
		}
	}
	componentWillReceiveProps(nextProps) {
		this.updateSectionCheck(nextProps);
		if (this.requireLogin(nextProps)) {
			if (nextProps.section != this.props.section) {
				nextProps.dispatch(showDialog('login'));
			}
		} else {
			if (nextProps.section != this.props.section
					|| !this.props.accessToken) {
				this.onInitDatas(nextProps);
			}

			if (nextProps.location.query.select
					&& (nextProps.section != this.props.section
						|| nextProps.location.query.select != this.props.location.query.select
						|| !this.props.accessToken)) {
				this.onDoLoadItem(nextProps, nextProps.location.query.select);
			} else if (nextProps.select && nextProps.select.id && !nextProps.location.query.select) {
				nextProps.dispatch(clearSelect());
			}
		}
	}
	updateSectionCheck(props) {
		if (props.section != props.params.section) {
			props.dispatch(changeSection(props.params.section));
		}
	}
	render() {
		if (this.requireLogin(this.props)) {
			return null;
		}

		const props = this.props;
		switch(props.section){
			case 'reports':
				return <ReportSection array={props.array} skip={props.skip}
							total={props.total} querying={props.querying} getting={props.getting}
							error={props.error} select={props.select}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onLoadItem={this.onLoadItem.bind(this)}
							onChangeItem={this.onChangeItem.bind(this)}/>;
			case 'packages':
				return <PackageSection array={props.array} skip={props.skip}
							total={props.total} querying={props.querying}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onLoadItem={this.onLoadItem.bind(this)}
							onChangeItem={this.onChangeItem.bind(this)}/>;
			case 'parameters':
				return <ParameterSection array={props.array} skip={props.skip}
							total={props.total} querying={props.querying}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onChangeItem={this.onChangeItem.bind(this)}/>;
			case 'scripts':
				return <ScriptSection array={props.array} skip={props.skip}
							total={props.total} querying={props.querying} tags={props.tags}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onOpenScript={item => props.history.pushState(null, `/scripteditor${item ? ('?select=' + item.id) : ''}`)}/>;
			case 'scripteditor':
				return <ScriptEditorSection array={props.array} skip={props.skip}
							total={props.total} querying={props.querying}
							error={props.error} getting={props.getting}
							findTypes={props.findTypes} actionTypes={props.actionTypes}
							submitting={props.submitting} select={props.select}
							onLoadDatas={this.onLoadDatas.bind(this)}
							onLoadItem={this.onLoadItem.bind(this)}
							onChangeItem={this.onChangeItem.bind(this)}
							onBack={() => this.props.history.replaceState(null, '/scripts')}/>;
			case 'guide':
				return <GuideSection/>;
			default:
				return <HomeSection versions={props.versions}/>;
		}
	}
	requireLogin(props) {
		return !props.accessToken &&
			_.contains(['scripts', 'scripteditor', 'parameters', 'packages', 'reports'], props.section);
	}
	onLoadItem(item) {
		if (item && item.id) {
			this.props.history.replaceState(null, `/${this.props.section}?select=${item.id}`);
		} else {
			this.props.history.replaceState(null, `/${this.props.section}`);
		}
	}
	onInitDatas(props) {
		if (!props) {
			props = this.props;
		}
		if (props.section == 'scripts') {
			props.dispatch(getTags());
		}
		this.onLoadDatas(null, false, null, props);
	}
	onLoadDatas(searchText, loadmore, extraSelection, props) {
		if (!props) {
			props = this.props;
		}

		let selection = extraSelection ? extraSelection : {};
		if (loadmore) {
			Object.assign(selection, { skip: this.props.skip });
		}

		switch(props.section) {
			case 'reports':
				if (searchText) {
					Object.assign(selection, { where: { or: [
						{ title: { regexp: searchText }},
						{ date: { regexp: searchText }}
					]}});
				}
				props.dispatch(queryReports(selection));
				break;
			case 'packages':
				if (searchText) {
					Object.assign(selection, { where: { or: [
						{ title: { regexp: searchText }},
						{ description: { regexp: searchText }}
					]}});
				}
				props.dispatch(queryPackages(selection));
				break;
			case 'parameters':
				if (searchText) {
					Object.assign(selection, { where: { or: [
						{ key: { regexp: searchText }},
						{ value: { regexp: searchText }}
					]}});
				}
				props.dispatch(queryParameters(selection));
				break;
			case 'scripts':
			case 'scripteditor':
				if (searchText) {
					Object.assign(selection, { where: { or: [
						{ title: { regexp: searchText }},
						{ date: { regexp: searchText }}
					]}});
				}
				props.dispatch(queryScripts(selection));
				break;
		}
	}
	onDoLoadItem(props, id) {
		switch(props.section) {
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
			switch(props.section) {
				case 'reports':
					props.dispatch(showDialog('del-report', item));
					break;
				case 'packages':
					props.dispatch(showDialog('del-package', item));
					break;
				case 'parameters':
					props.dispatch(showDialog('del-parameter', item));
					break;
				case 'scripts':
				case 'scripteditor':
					props.dispatch(showDialog('del-script', item));
					break;
			}
		} else if (item.id) {
			switch(props.section) {
				case 'parameters':
					props.dispatch(showDialog('parameter', item));
					break;
				case 'scripteditor':
					props.dispatch(updateScript(item.id, item));
					break;
			}
		} else {
			switch(props.section) {
				case 'packages':
					props.dispatch(showDialog('package', item));
					break;
				case 'parameters':
					props.dispatch(showDialog('parameter', item));
					break;
				case 'scripteditor':
					props.dispatch(createScript(item));
					break;
			}
		}
	}
}

const loginSelector = createSelector(
	state => state.user.accessToken,
	accessToken => {
		return {
			accessToken: accessToken,
			findTypes: [
				{ name: 'Id' },
				{ name: 'Name' },
				{ name: 'ClassName' },
				{ name: 'TagName' },
				{ name: 'XPath' },
				{ name: 'IosUIAutomation' },
				{ name: 'AndroidUIAutomator' },
				{ name: 'AccessibilityId' },
				{ name: 'LinkText' },
				{ name: 'PartialLinkText' },
				{ name: 'Css' },
				{ name: 'CssSelector' }
			],
			actionTypes: [
				{ name: "Click", element: true },
				{ name: "Input", element: true, args: true, hint: 'input text' },
				{ name: "Touch", args: true, regex: /\((\d*\.?\d+), ?(\d*\.?\d+)\)/g,
					help: "plaese follow this format: (x_number, y_number)", hint: '(x, y)' },
				{ name: "TouchRelative", args: true, regex: /\((0\.\d+), ?(0\.\d+)\)/g, help: "plaese follow this format: (0.x_precentage, 0.y_precentage)" },
				{ name: "ClearInput", element: true },
				{ name: "FlickUp", args: true, regex: /^[0-9]*$/g, help: "enter the distance in pixel.", hint: 'number in pixel' },
				{ name: "FlickDown", args: true, regex: /^[0-9]*$/g, help: "enter the distance in pixel.", hint: 'number in pixel' },
				{ name: "FlickLeft", args: true, regex: /^[0-9]*$/g, help: "enter the distance in pixel.", hint: 'number in pixel' },
				{ name: "FlickRight", args: true, regex: /^[0-9]*$/g, help: "enter the distance in pixel.", hint: 'number in pixel' },
				{ name: "Back" },
				{ name: "Wait", args: true, regex: "^[0-9]*$", help: "number in milliseconds to wait.", hint: 'milliseconds' }
			]
		}
	}
)

const tagSelector = createSelector(
	state => state.tags,
	tags => {
		return {
			tags : tags.map(tag => ({
	    		key: tag,
	    		label: tag,
	    		icon: 'tag',
	    		defaultChecked: true
	    	}))
		};
	}
);

const propsSelector = createSelector(
	loginSelector,
	state => state.array,
	tagSelector,
	state => state.select,
	state => state.status.section,
	state => state.status.skip,
	state => state.status.total,
	state => state.status.error,
	state => state.status.querying,
	state => state.status.getting,
	state => state.status.submitting,
	state => state.status.dialogLabel,
	state => state.versions,
    (loginInfo, array, tags, select, section, skip, total, error,
    		querying, getting, submitting, dialogLabel, versions) => {
    	return {...loginInfo, array, ...tags, select, section, skip, total, error,
    		querying, getting, submitting, dialogLabel, versions};
    }
);

export default connect(propsSelector)(Dashboard);

