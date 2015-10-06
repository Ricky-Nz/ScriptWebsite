import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { GnSelectableList } from './elements';
import _ from 'underscore';

class TagList extends Component {
	constructor(props) {
		super(props);
		this.state = { mutiSelect: true };
	}
	render() {
		const tags = this.props.tags ? this.props.tags.map(tag => ({
			icon: 'tag',
			ref: tag.ref,
			diaplayName: tag.ref,
			checked: tag.checked
		})) : null;

		return (
			<Panel>
				<GnSelectableList
					datas={tags}
					mutiSelect={this.state.mutiSelect}
					onSelectModeChange={this.onSelectModeChange.bind(this)}
					onSelectAll={this.onSelectAll.bind(this)}
					onSelectChange={this.onSelectionChange.bind(this)}/>
			</Panel>
		);
	}
	onSelectModeChange() {
		this.setState({ mutiSelect: !this.state.mutiSelect });
		const checkedList = _.filter(this.props.tags, tag => tag.checked);
		if (checkedList > 1) {
			this.props.onTagSelctChange({
				ref: checkedList[0].ref,
				check: true,
				single: true
			});
		}
	}
	onSelectAll(selectAll) {
		if (selectAll) {
			this.props.onTagSelctChange({
				all: true
			});
		} else {
			this.props.onTagSelctChange({
				clear: true
			});
		}
	}
	onSelectionChange(item, check) {
		this.props.onTagSelctChange({
			ref: item.ref,
			check: check
		});
	}
	getLastSelection() {
		return this.state ? this.state.selection : null;
	}
}

TagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string.isRequired),
	onTagSelctChange: PropTypes.func.isRequired
};

export default TagList;