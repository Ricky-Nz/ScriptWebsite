import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { GnSelectList, GnAsyncPanel, GnSearchbar, GnList,
	GnListItem, GnIcon, GnTagsbar, GnInput } from './elements2';

class ScriptEditorSection extends Component {
	render() {
		const props = this.props;
		const script = props.select;
		const actionItems = script.actions ? script.actions.map((action, index) => (
			<ActionItem ref={`action-${index}`} key={index} action={action}
				index={index} findTypes={props.findTypes} actionTypes={props.actionTypes}
				onInsert={index => this.props.onUpdateScript({ target: 'actions', position: index, action: 'insert', args: {}})}
				onDelete={index => this.props.onUpdateScript({ target: 'actions', position: index, action: 'delete'})}/>
		)) : null;

		return (
			<Row style={fillHeight}>
				<Col xs={5} sm={4} md={3} mdOffset={1}>
					<br/><br/><br/><br/>
					<GnButton bsStyle='link' icon='angle-double-left' label='Back' onClick={props.onBack}/>
					<Panel>
						<GnSearchbar placeholder='search for script by title' searching={props.loading}/>
						<GnAsyncPanel loading={props.querying}>
							<GnList total={props.total} skip={props.skip} loading={props.querying}>
								{listItems}
							</GnList>
						</GnAsyncPanel>
					</Panel>
				</Col>
				<Col xs={7} sm={8} md={7} style={fillHeightScroll}>
					<div style={{height: 120}}/>
					<Panel>
						<GnInput required ref='title' label='Script Title' type='text'
							initialValue={script.title} placeholder='test script title' icon='file-text-o'/>
						<GnTagsbar tags={script.tags} onDeleteItem={index =>
							this.props.onUpdateScript({ target: 'tags', position: index, action: 'delete'})}/>
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
				</Col>
			</Row>
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
	onUpdateScript: PropTypes.func.isRequired,
	onNewBlankScript: PropTypes.func.isRequired,
	onBack: PropTypes.func.isRequired
};

export default ScriptEditorSection;

