import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { GnSelectList, GnAsyncPanel, GnSearchbar, GnList, GnSelectInput,
	GnListItem, GnIcon, GnTagsbar, GnInput, GnButton, GnDynamicList } from './elements';
import _ from 'underscore';

class ScriptEditorSection extends Component {
	constructor(props) {
		super(props);
		this.state = this.getNewState(props.select);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.select != this.props.select) {
			this.setState(this.getNewState(nextProps.select));
		}
	}
	getNewState(script) {
		if (script && script.id) {
			return {
				title: script.title,
				tags: script.tags,
				actions: script.actions
			};
		} else {
			return {
				title: null,
				tags: [],
				actions: []
			};
		}
	}
	render() {
		const itemStyle = { border: 'none' };
		const listItems = this.props.array.map((item, index) => (
			<GnListItem key={index} style={itemStyle} leftView={<GnIcon icon='file-text-o'/>}
				primary={item.title} secondary={item.date} onClick={() => this.props.onLoadItem(item)}/>
		));

		return (
			<Row className='fillHeight'>
				<Col xs={5} sm={4} md={3} mdOffset={1}>
					<br/><br/><br/><br/>
					<GnButton gnStyle='link' icon='angle-double-left' label='Back' onClick={this.props.onBack}/>
					<Panel>
						<GnSearchbar ref='search' placeholder='search for script by title' searching={this.props.loading}
							onSearch={searchText => this.props.onLoadDatas(searchText)}/>
						<GnList total={this.props.total} skip={this.props.skip}
							loading={this.props.querying} header='Test Scripts'
							onAddItem={() => this.props.onLoadItem()}
							onLoadMore={() => this.props.onLoadDatas(this.refs.search.getValue(), true)}>
							{listItems}
						</GnList>
					</Panel>
				</Col>
				<Col xs={7} sm={8} md={7} className='fillHeightScroll'>
					<div style={{height: 120}}/>
					{this.renderScript()}
				</Col>
			</Row>
		);
	}
	renderScript() {
		const { title, tags, actions } = this.state;
		const actionItems = actions.map((action, index) => {
			const actionType = _.find(this.props.actionTypes, type => type.name == action.actionType);
			const actionOptionDisplay = `Perform action ${action.actionType ? action.actionType : '?'}`;
			const findOptionDisplay = `To element find by ${action.findType ? action.findType : '?'}`;

			return (
				<div key={index}>
					<GnSelectInput ref={`actiontype-${index}`} type='text' disabled={!actionType || !actionType.args}
						optionDiaplay={actionOptionDisplay} options={this.props.actionTypes} select={action.actionType}
						optionHelp='please select an action you want to mock'
						placeholder={actionType ? actionType.hint : null} value={action.actionArgs}
						regex={actionType ? actionType.regex : null} help={actionType ? actionType.help : null}
						onSelect={newType => this.setState({actions: [...actions.slice(0, index), Object.assign({}, action, {actionType: newType}), ...actions.slice(index + 1)]})}
						onChange={newArgs => this.setState({actions: [...actions.slice(0, index), Object.assign({}, action, {actionArgs: newArgs}), ...actions.slice(index + 1)]})}/>
					{actionType && actionType.element ?
						<GnSelectInput ref={`findtype-${index}`} type='text' disabled={!action.findType}
							optionDiaplay={findOptionDisplay} options={this.props.findTypes} select={action.findType}
							optionHelp='please method to tell Gear how to find the target element'
							value={action.findArgs} help='find argument can not be empty' required
							onSelect={newType => this.setState({actions: [...actions.slice(0, index), Object.assign({}, action, {findType: newType}), ...actions.slice(index + 1)]})}
							onChange={newArgs => this.setState({actions: [...actions.slice(0, index), Object.assign({}, action, {findArgs: newArgs}), ...actions.slice(index + 1)]})}/>
					: null}
				</div>
			);
		});

		return (
			<GnAsyncPanel loading={this.props.getting}>
				<Panel>
					<GnInput ref='title' required label='Script Title' type='text'
						value={title} placeholder='test script title' icon='file-text-o'
						help='Script title can not be empty'
						onInput={e => this.setState({title: e.target.value})}/>
					<GnTagsbar ref='tags' tags={tags} required help='Please add at least one tag in order to make this script selectable'
						onDeleteItem={index => this.setState({tags: [...tags.slice(0, index), ...tags.slice(index + 1)]})}
						onAddItem={newTag => this.setState({tags: [...tags, newTag]})}/>
					<GnDynamicList header='Actions' onUpdate={(index, remove) => {
							remove ? this.setState({actions: [...actions.slice(0, index), ...actions.slice(index + 1)]})
								: this.setState({actions: [...actions.slice(0, index), {}, ...actions.slice(index)]})
						}}>
						{actionItems}
					</GnDynamicList>
					<p className='errorText'>{this.props.error}</p>
					<div className='horizontalVerCenterRight'>
						{(this.props.select && this.props.select.id) ?
							<GnButton gnStyle='danger' icon='trash' label='Delete' disabled={this.props.submitting}
								onClick={() => this.props.onChangeItem({id: this.props.select.id, title: this.props.select.title}, true)}/>
							: null}
						<GnButton gnStyle='primary' icon='save' style={{marginLeft: 10}} 
							active={this.props.submitting} disabled={this.props.submitting}
							label={this.props.select && this.props.select.id ? 'Save' : 'Create'} onClick={this.onSubmitClicked.bind(this)}/>
					</div>
				</Panel>
			</GnAsyncPanel>
		);
	}
	onSubmitClicked() {
		const allValide = _.every(_.keys(this.refs), ref => {
			const field = this.refs[ref];
			if (field.validate) {
				return field.validate();
			} else {
				return true
			}
		});

		if (!allValide) {
			return;
		}

		this.props.onChangeItem({
			id: this.props.select ? this.props.select.id : null,
			title: this.state.title,
			tags: this.state.tags,
			actions: this.state.actions
		});
	}
}

ScriptEditorSection.propTypes = {
	findTypes: PropTypes.array.isRequired,
	actionTypes: PropTypes.array.isRequired,
	array: PropTypes.array.isRequired,
	skip: PropTypes.number,
	total: PropTypes.number,
	querying: PropTypes.bool,
	error: PropTypes.string,
	getting: PropTypes.bool,
	submitting: PropTypes.bool,
	select: PropTypes.object.isRequired,
	onLoadDatas: PropTypes.func.isRequired,
	onLoadItem: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired,
	onBack: PropTypes.func.isRequired
};

export default ScriptEditorSection;

