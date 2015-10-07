import React, { Component, PropTypes } from 'react';
import { ListGroup, Input } from 'react-bootstrap';
import { horVCenterSpaceBetween } from '../styles';
import GnSelectableListItem from './GnSelectableListItem';
import _ from 'underscore';

class GnSelectableList extends Component {
	render() {
		let listItems;
		let status;
		if (this.props.datas) {
			listItems = this.props.datas.map((item, index) => (
				<GnSelectableListItem key={index} icon={item.icon} text={item.diaplayName}
					checked={item.checked} mutiSelect={this.props.mutiSelect}
					onClick={() => this.onItemClicked(item)} />
			));
			status = _.countBy(this.props.datas, data => data.checked ? 'checked' : 'uncheck');
		}

		return (
			<div>
				<div style={horVCenterSpaceBetween}>
					<Input type='checkbox' label='Multi-select' checked={this.props.mutiSelect}
						onChange={this.props.onSelectModeChange}/>
					<Input type='checkbox' label='Select all' checked={status && !status.uncheck}
						onChange={this.onSelectAllChange.bind(this, status && !status.uncheck)}/>
				</div>
				<ListGroup style={{height: 420, overflow: 'auto'}}>
					{listItems}
				</ListGroup>
				<div>{status ? `${status.checked ? status.checked : 0} / ${this.props.datas.length}` : ''}</div>
			</div>
		);
	}
	onSelectAllChange(allChecked) {
		if (!this.props.datas || this.props.datas.length == 0) {
			return;
		}
		
		this.props.onSelectAll(!allChecked);
	}
	onItemClicked(item) {
		if (this.props.mutiSelect) {
			this.props.onSelectChange(item, !item.checked);
		} else if (!item.checked) {
			this.props.onSelectChange(item, true);
		}
	}
}

GnSelectableList.propTypes = {
	mutiSelect: PropTypes.bool,
	datas: PropTypes.arrayOf(PropTypes.shape({
		ref: PropTypes.string.isRequired,
		diaplayName: PropTypes.string.isRequired,
		icon: PropTypes.string,
		checked: PropTypes.bool
	})),
	onSelectModeChange: PropTypes.func.isRequired,
	onSelectAll: PropTypes.func.isRequired,
	onSelectChange: PropTypes.func.isRequired
}

export default GnSelectableList;