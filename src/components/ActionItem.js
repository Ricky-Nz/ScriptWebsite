import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem, Label, Input, Row, Col } from 'react-bootstrap';
import { GnIconButton } from './elements';
import { horVCenter, horCenter, horizontal, horVCenterSpaceBetween } from './styles';
import _ from 'underscore';

class ActionItem extends Component {
	constructor(props) {
		super(props);
		this.state = Object.assign({}, props.action);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.action != this.props.action) {
			this.setState(Object.assign({findType: null, findArgs: null, actionType: null,
				actionArgs: null, actionError: null, findError: null}, nextProps.action));
		}
	}
	render() {
		let actionItems = this.props.actionTypes.map((actionType, index) => {
			return <MenuItem key={index} eventKey={actionType.name}>{actionType.name}</MenuItem>;
		});
		let findTypeItems = this.props.findTypes.map((findType, index) => {
			return <MenuItem key={index} eventKey={findType}>{findType}</MenuItem>;
		});
		let showActionArgs;
		let showElement;
		if (this.state.actionType) {
			const actionConfig = _.find(this.props.actionTypes, actionType =>
					actionType.name.toUpperCase() == this.state.actionType.toUpperCase());
			showElement = actionConfig.element;
			showActionArgs = actionConfig.args;
		}
		
		return (
			<div>
				<div style={horVCenterSpaceBetween}>
					<Label style={{marginLeft: 15}} bsSize='small'>{this.props.index + 1}</Label>
					<div style={horizontal}>
						<GnIconButton bsSize='small' bsStyle='link' icon='arrow-up'
							label='Insert' onClick={() => this.props.onInsert(this.props.index)}/>
						<GnIconButton bsSize='small' bsStyle='link' icon='arrow-down'
							label='Remove' onClick={() => this.props.onDelete(this.props.index)}/>
					</div>
				</div>
				<Input type='text' disabled={!showActionArgs}
					help={this.state.actionError ? <div style={{color: 'red'}}>{this.state.actionError}</div> : null}
					addonBefore={
						<DropdownButton bsSize='small' onSelect={(e, type) => this.setState({ actionType: type, actionArgs: null })}
							title={`perform action ${this.state.actionType ? this.state.actionType : ' ? '}`}>
							{actionItems}
						</DropdownButton>
					} value={this.state.actionArgs} onChange={e => this.setState({actionArgs : e.target.value})}/>
				{showElement ?
					<Input type="text" help={this.state.findError ? <div style={{color: 'red'}}>{this.state.findError}</div> : null}
						addonBefore={
							<DropdownButton bsSize='small' onSelect={(e, type) => this.setState({ findType: type })}
								title={`on element find by ${this.state.findType ? this.state.findType : ' ? '}`}>
								{findTypeItems}
							</DropdownButton>
						} value={this.state.findArgs} onChange={e => this.setState({findArgs : e.target.value})}/>
				: null}
			</div>
		);
	}
	validete() {
		if (!this.state.actionType) {
			this.setState({ actionError: 'you must select a action type' });
			return false;
		}

		const actionConfig = _.find(this.props.actionTypes, actionType =>
				actionType.name.toUpperCase() == this.state.actionType.toUpperCase());
		if (actionConfig.args) {
			var re = new RegExp(actionConfig.args, "g");
			if (!re.exec(this.state.actionArgs)) {
				this.setState({ actionError: actionConfig.help });
				return false;
			}
		}

		if (actionConfig.element) {
			if (!this.state.findType) {
				this.setState({ findError: 'you must select a find element type', actionError: null });
				return false;
			} else if (!this.state.findArgs) {
				this.setState({ findError: 'you must provide a argument for element finding usage', actionError: null });
				return false;
			}
		}
		
		this.setState({
			actionError: null,
			findError: null
		});

		return true;
	}
	getValue() {
		return {
			findType: this.state.findType,
			findArgs: this.state.findArgs,
			actionType: this.state.actionType,
			actionArgs: this.state.actionArgs
		};
	}
}

ActionItem.propTypes = {
	index: PropTypes.number.isRequired,
	findTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
	actionTypes: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		args: PropTypes.string,
		element: PropTypes.string
	})).isRequired,
	action: PropTypes.shape({
		findType: PropTypes.string,
		findArgs: PropTypes.string,
		actionType: PropTypes.string,
		actionArgs: PropTypes.string
	}).isRequired,
	onInsert: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}

export default ActionItem;