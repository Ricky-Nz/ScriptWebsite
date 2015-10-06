import React, { Component, PropTypes } from 'react';
import { ListGroup, Input } from 'react-bootstrap';
import { horVCenterSpaceBetween } from '../styles';
import GnSelectableListItem from './GnSelectableListItem';
import _ from 'underscore';

class GnSelectableList extends Component {
	constructor(props) {
		super(props);
		this.state = { mutiSelect: true, select: props.datas ?
				Object.assign(...props.datas.map(data => ({[data.ref]: true}))) : {} };
	}
	componentDidMount() {
		this.onReSelect(this.props.datas, this.state.select);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.datas != nextProps.datas) {
			let newSelect;
			if (nextProps.datas) {
				newSelect = Object.assign(...nextProps.datas.map(data => ({[data.ref]: true})), this.state.select);
			} else {
				newSelect = {};
			}

			this.setState({ select: newSelect });
			this.onReSelect(nextProps.datas, newSelect);
		}
	}
	render() {
		let listItems;
		let allChecked;
		if (this.props.datas) {
			listItems = this.props.datas.map((item, index) => (
				<GnSelectableListItem key={index} icon={item.icon} text={item.diaplayName}
					checked={this.state.select[item.ref]} mutiSelect={this.state.mutiSelect}
					onClick={() => this.onSingleSelectChange(item)} />
			));
			allChecked = _.every(this.props.datas, data => this.state.select[data.ref]);
		}

		return (
			<div>
				<div style={horVCenterSpaceBetween}>
					<Input type='checkbox' label='Multi-select' checked={this.state.mutiSelect}
						onChange={this.onSelectModeChange.bind(this)}/>
					<Input type='checkbox' label='Select all' checked={allChecked}
						onChange={this.onSelectAllChange.bind(this)}/>
				</div>
				<ListGroup>
					{listItems}
				</ListGroup>
			</div>
		);
	}
	onSelectModeChange() {
		if (!this.props.datas || this.props.datas.length == 0) {
			return;
		}

		if (this.state.mutiSelect) {
			const select = { [this.props.datas[0].ref]: true };

			this.setState({
				mutiSelect: !this.state.mutiSelect,
				select: select
			});
			this.onReSelect(this.props.datas, select);
		} else {
			this.setState({ mutiSelect: !this.state.mutiSelect });
		}
	}
	onSelectAllChange() {
		if (!this.props.datas || this.props.datas.length == 0) {
			return;
		}

		const allChecked = _.every(this.props.datas, data => this.state.select[data.ref]);
		const newSelect = allChecked ? {} : Object.assign(...this.props.datas.map(data => ({ [data.ref]: true })));
		this.setState({
			select: newSelect
		});
		this.onReSelect(this.props.datas, newSelect);
	}
	onSingleSelectChange(select) {
		let newSelect;

		if (this.state.mutiSelect) {
			newSelect = Object.assign(this.state.select, { [select.ref]: !this.state.select[select.ref] });
		} else {
			if (this.state.select[select.ref]) {
				return;
			}

			newSelect = Object.assign(...this.props.datas.map(data => ({ [data.ref]: false })),
					{ [select.ref]: true });
		}

		this.setState({ select: newSelect });
		this.onReSelect(this.props.datas, newSelect);

	}
	onReSelect(datas, select) {
		if (!datas || datas.length == 0) {
			return;
		}

		this.props.onSelectChange(_.pluck(_.filter(datas, data => select[data.ref]), 'ref'));
	}
}

GnSelectableList.propTypes = {
	datas: PropTypes.arrayOf(PropTypes.shape({
		ref: PropTypes.string.isRequired,
		diaplayName: PropTypes.string.isRequired,
		icon: PropTypes.string
	})),
	onSelectChange: PropTypes.func.isRequired
}

export default GnSelectableList;