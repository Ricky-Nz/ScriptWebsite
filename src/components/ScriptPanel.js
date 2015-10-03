import React, { Component, PropTypes } from 'react';
import { Panel, Fade } from 'react-bootstrap';
import { GnInput, GnIconButton, GnIcon } from './elements';
import { horVCenterRight, horCenterPadding, errorStyle, horCenter } from './styles';
import ActionItem from './ActionItem';
import _ from 'underscore';

class ScriptPanel extends Component {
	constructor(props) {
		super(props);
		this.state = this.updateState(props.script);
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.script) {
			this.setState({id: null, title: null, actions: null});
		} else if (nextProps.script != this.props.script) {
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

		const findTypes = [
			'Name'
		];

		const actionTypes = [
			'Click',
			'Input',
			'ClearInput',
			'ScrollUp',
			'ScrollDown',
			'ScrollLeft',
			'ScrollRight'
		];

		let actionItems;
		if (this.state.actions) {
			actionItems = this.state.actions.map((action, index) => (
				<ActionItem ref={`action-${index}`} key={index} action={action}
					index={index} findTypes={findTypes} actionTypes={actionTypes}
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

		return (
			<Panel style={{height: 500, overflow: 'auto'}}>
				<GnInput required
					ref='title'
					label='Script Title'
					type='text'
					initialValue={this.state.title}
					placeholder='test script title'
					icon='file-text-o'/>
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
					<div style={errorStyle}>{this.props.error}</div>
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
				actions: script.content
			}
		} else {
			return {};
		}
	}
	onSubmitClicked() {
		if (!this.refs.title.validete()) {
			return;
		} else if (!this.state.actions || this.state.actions.length == 0) {
			return this.setState({error: 'script action can not be empty'});
		} else if (!_.every(this.state.actions, (action, index) => this.refs[`action-${index}`].validete())) {
			return this.setState({error: 'action list contains illegal action'});
		}

		this.props.onSubmit(this.state.id, {
			title: this.refs.title.getValue(),
			content: JSON.stringify(this.state.actions.map((item, index) =>
					this.refs[`action-${index}`].getValue()))
		});
	}
}

ScriptPanel.propTypes = {
	error: PropTypes.string,
	script: PropTypes.string,
	loading: PropTypes.bool,
	submiting: PropTypes.bool,
	deleting: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}

export default ScriptPanel;