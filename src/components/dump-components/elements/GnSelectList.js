import React, { Component, PropTypes } from 'react';
import { ListGroup, Input } from 'react-bootstrap';
import GnListItem from './GnListItem';
import GnIcon from './GnIcon';
import _ from 'underscore';

class GnSelectList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.updateState(this.props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.items !== this.props.items) {
			this.updateState(nextProps);
		}
	}
	updateState(props) {
		let newState = { multiSelect: props.defaultMutiple };
		let selectCount = 0;
		props.items.forEach(item => {
			if (_.has(this.state, item.key)) {
				newState[item.key] = this.state[item.key];
			} else {
				newState[item.key] = item.defaultChecked;
			}
			if (newState[item.key]) {
				selectCount++;
			}
		});
		if (selectCount > 1) {
			newState.multiSelect = true;
		}
		this.setState(newState);
	}
	render() {
		const itemStyle = { border: 'none', padding: '0px 10px' };
		const { scrollHeight, items } = this.props;
		const status = _.countBy(items, item => this.state[item.key] ? 'checked' : 'uncheck');
		const listItems = items.map((item, index) => (
			<GnListItem style={itemStyle} key={index} leftView={item.icon ? <GnIcon icon={item.icon}/> : null}
				primary={item.label} rightView={<Input type={this.state.multiSelect ? 'checkbox' : 'radio'}
				checked={this.state[item.key]}/>} onClick={() => this.onItemClicked(item)} />
		));

		return (
			<div style={this.props.style}>
				<div className='horizontalVerCenterSpaceBetween'>
					<Input type='checkbox' label='Multi-select' checked={this.state.multiSelect}
						onChange={this.onSelectModeChange.bind(this)}/>
					{this.state.multiSelect ? <Input type='checkbox' label='Select all' checked={status && !status.uncheck}
						onChange={this.onToggleAll.bind(this)}/> : null}
				</div>
				<ListGroup style={scrollHeight ? {height: scrollHeight, overflow: 'auto'} : null}>
					{listItems}
				</ListGroup>
				<div>{status ? `${status.checked ? status.checked : 0} / ${this.props.items.length}` : ''}</div>
			</div>
		);
	}
	onSelectModeChange(e) {
		const checkedList = _.filter(this.props.items, item => this.state[item.key]);
		if (checkedList.length > 1) {
			this.props.onSelectChange([checkedList[0].key]);
			let newState = { multiSelect: e.target.checked };
			this.props.items.forEach((item, index) => newState[item.key] = (index == 0));
			this.setState(newState);
		} else {
			this.setState({ multiSelect: e.target.checked });
		}
	}
	onToggleAll(e) {
		if (e.target.checked) {
			this.props.onSelectChange(this.props.items.map(item => item.key));
		} else {
			this.props.onSelectChange([]);
		}
		let newState = {};
		this.props.items.forEach(item => newState[item.key] = e.target.checked);
		this.setState(newState);
	}
	onItemClicked(select) {
		if (this.state.multiSelect) {
			const checkedList = _.filter(this.props.items, item =>
				item.key == select.key ? !this.state[item.key] : this.state[item.key]);
			this.props.onSelectChange(_.pluck(checkedList, 'key'));
			this.setState({ [select.key]: !this.state[select.key] });
		} else {
			this.props.onSelectChange([select.key]);
			let newState = {};
			this.props.items.forEach(item => newState[item.key] = (item.key == select.key));
			this.setState(newState);
		}
	}
	getSelection() {
		const checkedList = _.filter(this.props.items, item => this.state[item.key]);
		return _.pluck(checkedList, 'key'); 
	}
}

GnSelectList.propTypes = {
	defaultMutiple: PropTypes.bool,
	scrollHeight: PropTypes.number,
	items: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		icon: PropTypes.string,
		defaultChecked: PropTypes.bool
	})).isRequired,
	onSelectChange: PropTypes.func.isRequired
}

export default GnSelectList;

