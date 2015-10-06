import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { GnSelectableList } from './elements';

class TagList extends Component {
	constructor(props) {
		super(props);
		this.state = this.onTagsPropChanged(props.tags);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.tags !== this.props.tags) {
			this.setState(this.onTagsPropChanged(nextProps.tags));
		}
	}
	render() {
		return (
			<Panel>
				<GnSelectableList datas={this.state.tags}
					onSelectChange={this.onSelectionChange.bind(this)}/>
			</Panel>
		);
	}
	onTagsPropChanged(tags) {
		const newTags = tags ? tags.map(tag => ({
			icon: 'tag',
			ref: tag,
			diaplayName: tag
		})) : null;

		return { tags: newTags };
	}
	onSelectionChange(selectList) {
		const selection = {
			where: {
				tags: {
					inq: selectList
				}
			}
		}
		this.setState({ selection: JSON.stringify(selection) });
		this.props.onTagSelectionChange(selection);
	}
	getLastSelection() {
		return this.state ? this.state.selection : null;
	}
}

TagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string.isRequired),
	onTagSelectionChange: PropTypes.func.isRequired
};

export default TagList;