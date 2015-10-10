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
		if (checkedList.length > 1) {
			this.props.onTagSelectChange(this.props.tags.map((tag, index) => ({ref: tag.ref, checked: index == 0})));
		}
	}
	onSelectAll(selectAll) {
		this.props.onTagSelectChange(this.props.tags.map(tag => ({ref: tag.ref, checked: selectAll})));
	}
	onSelectionChange(item, check) {
		this.props.onTagSelectChange(this.props.tags.map(tag =>
				({ref: tag.ref, checked: tag.ref == item.ref ? !tag.checked : tag.checked})));
	}
}

TagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string.isRequired),
	onTagSelectChange: PropTypes.func.isRequired
};

export default TagList;