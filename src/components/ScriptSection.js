import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import SearchableList from './SearchableList';
import TagList from './TagList';
import { fillHeight, fillHeightScroll } from './styles';
import _ from 'underscore';

class ScriptSection extends Component {
	render() {
		const props = this.props;
		const scriptConfig = {
			searchbarPlaceholder: 'search for script by title',
			listHeader: 'Test Scripts',
			itemIcon: 'file-text-o',
			showEditBtn: false,
			showDeleteBtn: true,
			primaryKey: 'title',
			secondaryKey: 'date',
			searchable: ['title']
		};

		return (
			<Row style={fillHeight}>
				<Col xs={5} sm={4} md={3} mdOffset={1}>
					<br/><br/><br/><br/>
					<TagList tags={props.tags}
						onTagSelectChange={tags => {
							props.onTagSelectChange(tags);
							this.combineSelection(this.state, tags);
						}}/>
				</Col>
				<Col xs={7} sm={8} md={7} style={fillHeightScroll}>
					<br/><br/><br/><br/>
					<SearchableList config={scriptConfig} datas={props.array} skip={props.skip}
						total={props.total} loading={props.querying}
						onLoadData={selection => {
							this.setState(selection);
							this.combineSelection(selection, this.props.tags);
						}}
						onCreateItem={props.onSelectScript}
						onItemClicked={props.onSelectScript}
						onDeleteItem={props.onChangeItem}/>
				</Col>
			</Row>
		);
	}
	combineSelection(selection, tags) {
		let newSelection = {
			where: {
				tags: {
					inq: tags ? _.pluck(_.filter(tags, tag => tag.checked), 'ref') : []
				}
			}
		};

		if (selection) {
			newSelection = Object.assign({}, selection, newSelection,
				selection.where ? { where: Object.assign({}, selection.where, newSelection.where)} : null);
		}

		this.props.onLoadDatas(newSelection);
	}
}

ScriptSection.propTypes = {
	tags: PropTypes.array,
	array: PropTypes.array.isRequired,
	skip: PropTypes.number,
	total: PropTypes.number,
	querying: PropTypes.bool,
	onLoadDatas: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired,
	onSelectScript: PropTypes.func.isRequired,
	onTagSelectChange: PropTypes.func.isRequired
};

export default ScriptSection;

