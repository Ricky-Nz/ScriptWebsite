import React, { Component, PropTypes } from 'react';
import { Panel, Fade, Label } from 'react-bootstrap';
import { GnInput, GnButton, GnIcon, GnTag } from './elements';
import { horVCenterRight, horCenterPadding, errorStyle, horCenter, horWrap } from './styles';
import ActionItem from './ActionItem';
import _ from 'underscore';

class ScriptPanel extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.script != this.props.script) {
			this.setState({ error: null });
		}
	}
	render() {
		if (this.props.getting) {
			return (
				<Panel style={horCenter}>
					<GnIcon icon='spinner' size='sm' active/>
				</Panel>
			);
		}

		const tagStyle = {
			margin: '8px 2px 0px 2px'
		};
		const findTypes = [
			"Id",
			"Name",
			"ClassName",
			"TagName",
			"XPath",
			"IosUIAutomation",
			"AndroidUIAutomator",
			"AccessibilityId",
			"LinkText",
			"PartialLinkText",
			"Css",
			"CssSelector"
		];
		const actionTypes = [
			{ "name": "Click", "element": true },
			{ "name": "Input", "element": true, "args": ".*" },
			{ "name": "Touch", "args": "\\((\\d*\\.?\\d+), ?(\\d*\\.?\\d+)\\)", "help": "plaese follow this format: (x_number, y_number)" },
			{ "name": "TouchRelative", "args": "\\((0\\.\\d+), ?(0\\.\\d+)\\)", "help": "plaese follow this format: (0.x_precentage, 0.y_precentage)" },
			{ "name": "ClearInput", "element": true },
			{ "name": "FlickUp", "args": "^[0-9]*$", "help": "enter the distance in pixel." },
			{ "name": "FlickDown", "args": "^[0-9]*$", "help": "enter the distance in pixel." },
			{ "name": "FlickLeft", "args": "^[0-9]*$", "help": "enter the distance in pixel." },
			{ "name": "FlickRight", "args": "^[0-9]*$", "help": "enter the distance in pixel." },
			{ "name": "Back" },
			{ "name": "Wait", "args": "^[0-9]*$", "help": "number in milliseconds to wait." }
		];

		const script = this.props.script;
		const tagItems = script.tags ? script.tags.map((tag, index) => (
			<GnButton style={tagStyle} label={tag} bsStyle='success' bsSize='xs' icon='times'
				onClick={() => this.props.onUpdateScript({ target: 'tags', position: index, action: 'delete'})}/>
		)) : null;
		const actionItems = script.actions ? script.actions.map((action, index) => (
			<ActionItem ref={`action-${index}`} key={index} action={action}
				index={index} findTypes={findTypes} actionTypes={actionTypes}
				onInsert={index => this.props.onUpdateScript({ target: 'actions', position: index, action: 'insert', args: {}})}
				onDelete={index => this.props.onUpdateScript({ target: 'actions', position: index, action: 'delete'})}/>
		)) : null;

		return (
			<Panel>
				<GnInput required ref='title' label='Script Title' type='text'
					initialValue={script.title} placeholder='test script title' icon='file-text-o'/>
				<div style={Object.assign({paddingLeft: 15}, horWrap)}>
					{tagItems}
				</div>
				<GnInput ref='tagInput' style={{maxWidth: 150}} type='text' placeholder='new tag' icon='tag'
					onKeyPress={e => {
						if (e.which == 13 && e.target.value) {
							this.props.onUpdateScript({ target: 'tags', action: 'append', args: e.target.value});
							this.refs.tagInput.clear();
						}
					}}/>
				<div style={{margin: '10px 0px 30px 0px'}}>
					<p>Actions</p>
					{actionItems}
					<div style={horVCenterRight}>
						<GnButton bsSize='small' bsStyle='link' icon='arrow-up' label='Append'
							onClick={() => this.props.onUpdateScript({ target: 'actions', action: 'append', args: {}})}/>
					</div>
				</div>
				<div style={horVCenterRight}>
					<div style={errorStyle}>{this.props.error || (this.state ? this.state.error : null)}</div>
					{script.id ?
						<GnButton bsSize='small' bsStyle='danger' icon='trash' label='Delete' disabled={this.props.submitting}
							onClick={() => this.props.onDelete(this.props.script, true)}/>
						: null}
					<GnButton bsSize='small' bsStyle='primary' icon='save' style={{marginLeft: 10}}
						active={this.props.submitting} disabled={this.props.submitting}
						label={script.id ? 'Save' : 'Submit'} onClick={this.onSubmitClicked.bind(this)}/>
				</div>
			</Panel>
		);
	}
	onSubmitClicked() {
		const script = this.props.script;
		if (!this.refs.title.validete()) {
			return;
		} else if (!script.actions || script.actions.length == 0) {
			return this.setState({error: 'script action can not be empty'});
		} else if (!_.every(script.actions, (action, index) => this.refs[`action-${index}`].validete())) {
			return;
		} else if (!script.tags || script.tags.length == 0) {
			return this.setState({error: 'script must have at least one tag in order to able to get selected.'})
		}

		this.props.onSubmit({
			id: script.id,
			title: this.refs.title.getValue(),
			tags: script.tags,
			actions: script.actions.map((item, index) => this.refs[`action-${index}`].getValue())
		});
	}
}

ScriptPanel.propTypes = {
	error: PropTypes.string,
	script: PropTypes.string,
	getting: PropTypes.bool,
	submitting: PropTypes.bool,
	onUpdateScript: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}

export default ScriptPanel;