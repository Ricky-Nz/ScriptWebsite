import React, { Component, PropTypes } from 'react';
import { Panel, Fade, Label } from 'react-bootstrap';
import { GnInput, GnIconButton, GnIcon, GnTag } from './elements';
import { horVCenterRight, horCenterPadding, errorStyle, horCenter, horWrap } from './styles';
import ActionItem from './ActionItem';
import _ from 'underscore';

class ScriptPanel extends Component {
	constructor(props) {
		super(props);
		this.state = this.updateState(props.script);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.script != this.props.script) {
			this.setState(this.updateState(nextProps.script));
		}
	}
	render() {
		if (this.props.loading) {
			return (
				<Panel style={Object.assign({height: 500, overflow: 'auto'}, horCenter)}>
					<GnIcon icon='spinner' size='sm' active/>
				</Panel>
			);
		}

		let actionItems;
		if (this.state.actions) {
			actionItems = this.state.actions.map((action, index) => (
				<ActionItem ref={`action-${index}`} key={index} action={action}
					index={index} findTypes={this.props.findTypes} actionTypes={this.props.actionTypes}
					onInsert={index => {
						let newActions = this.state.actions.map((item, index) => this.refs[`action-${index}`].getValue());
						newActions.splice(index, 0, {});
						this.setState({ actions: newActions });
					}}
					onDelete={index => {
						let newActions = this.state.actions.map((item, index) => this.refs[`action-${index}`].getValue());
						newActions.splice(index, 1);
						this.setState({ actions: newActions });
					}}/>
			));
		}

		let tagItems;
		if (this.state.tags) {
			const tagStyle = {
				margin: '8px 2px 0px 2px'
			};
			
			tagItems = this.state.tags.map((tag, index) => (
				<GnIconButton style={tagStyle} label={tag} bsStyle='success' bsSize='xs'
					icon='times' onClick={() => {
						this.state.tags.splice(index, 1);
						this.setState({tags: this.state.tags});
					}}/>
			));
		}

		return (
			<Panel style={{height: 500, overflow: 'auto'}}>
				<GnInput required
					ref='title'
					label='Script Title'
					type='text'
					initialValue={this.state.title}
					placeholder='test script title'
					icon='file-text-o'/>
				<div style={Object.assign({paddingLeft: 15}, horWrap)}>
					{tagItems}
				</div>
				<GnInput ref='tagInput' style={{maxWidth: 150}} type='text' placeholder='new tag' icon='tag'
					onKeyPress={e => {
						if (e.which == 13 && e.target.value) {
							if (!this.state.tags || this.state.tags.indexOf(e.target.value) < 0) {
								this.setState({ tags: this.state.tags ?
									[...this.state.tags, e.target.value] : [e.target.value]});
							}
							this.refs.tagInput.clear();
						}
					}}/>
				<div style={{margin: '10px 0px 30px 0px'}}>
					<p>Actions</p>
					{actionItems}
					<div style={horVCenterRight}>
						<GnIconButton bsSize='small' bsStyle='link' icon='arrow-up'
							label='Append' onClick={() => {
								if (!this.state.actions) {
									this.state.actions = [];
								}
								this.state.actions.push({});
								this.setState({ actions: this.state.actions });
							}}/>
					</div>
				</div>
				<div style={horVCenterRight}>
					<div style={errorStyle}>{this.props.error || this.state.error}</div>
					{this.state.id ?
						<GnIconButton bsSize='small' bsStyle='danger' icon='trash' label='Delete' disabled={this.props.deleting}
							onClick={() => this.props.onDelete(this.state.id)} active={this.props.deleting}/>
						: null}
					<GnIconButton bsSize='small' bsStyle='primary' icon='save' style={{marginLeft: 10}}
						active={this.props.submiting} disabled={this.props.submiting}
						label={this.state.id ? 'Save' : 'Submit'} onClick={this.onSubmitClicked.bind(this)}/>
				</div>
			</Panel>
		);
	}
	updateState(script) {
		if (script) {
			return {
				id: script.id,
				title: script.title,
				tags: script.tags,
				actions: script.actions,
				error: null
			}
		} else {
			return {
				id: null,
				title: null,
				tags: null,
				actions: null,
				error: null
			};
		}
	}
	onSubmitClicked() {
		if (!this.refs.title.validete()) {
			return;
		} else if (!this.state.actions || this.state.actions.length == 0) {
			return this.setState({error: 'script action can not be empty'});
		} else if (!_.every(this.state.actions, (action, index) => this.refs[`action-${index}`].validete())) {
			return;
		} else if (!this.state.tags || this.state.tags.length == 0) {
			return this.setState({error: 'script must have at least one tag in order to able to get selected.'})
		}

		this.props.onSubmit(this.state.id, {
			title: this.refs.title.getValue(),
			tags: this.state.tags,
			actions: this.state.actions.map((item, index) => this.refs[`action-${index}`].getValue())
		});
	}
}

ScriptPanel.propTypes = {
	error: PropTypes.string,
	script: PropTypes.string,
	findTypes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	actionTypes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	loading: PropTypes.bool,
	submiting: PropTypes.bool,
	deleting: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}

export default ScriptPanel;