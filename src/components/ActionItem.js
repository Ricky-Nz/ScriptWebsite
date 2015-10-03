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
		this.setState(Object.assign({findType: null, findArgs: null, actionType: null, actionArgs: null},
				nextProps.action));
	}
	render() {
		let findTypeItems = this.props.findTypes.map((findType, index) => {
			return <MenuItem key={index} eventKey={findType}>{findType}</MenuItem>;
		});
		let actionItems = this.props.actionTypes.map((actionType, index) => {
			return <MenuItem key={index} eventKey={actionType}>{actionType}</MenuItem>;
		});

		return (
			<div>
				<div style={horVCenterSpaceBetween}>
					<Label style={{marginLeft: 15}} bsSize='small'>{this.props.index + 1}</Label>
					<div style={horizontal}>
						<GnIconButton bsSize='small' bsStyle='link' icon='arrow-up'
							label='Insert' onClick={() => this.props.onInsert(this.props.index)}/>
						<GnIconButton bsSize='small' bsStyle='link' icon='remove'
							label='Remove' onClick={() => this.props.onDelete(this.props.index)}/>
					</div>
				</div>
				<Input type="text" addonBefore={
					<DropdownButton bsSize='small' onSelect={(e, type) => this.setState({ findType: type })}
						title={`find element by ${this.state.findType ? this.state.findType : ' (empty)'}`}>
						{findTypeItems}
					</DropdownButton>
				} value={this.state.findArgs} onChange={e => this.setState({findArgs : e.target.value})}/>
				<Input type='text' addonBefore={
					<DropdownButton bsSize='small' onSelect={(e, type) => this.setState({ actionType: type })}
						title={`perform action ${this.state.actionType ? this.state.actionType : ' (empty)'}`}>
						{actionItems}
					</DropdownButton>
				} value={this.state.actionArgs} onChange={e => this.setState({actionArgs : e.target.value})}/>
			</div>
		);
	}
	validete() {
		if (!this.state.actionType) {
			return false;
		}
		
		return true;
	}
	getValue() {
		return this.state;
	}
}

ActionItem.propTypes = {
	index: PropTypes.number.isRequired,
	findTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
	actionTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
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