import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import SearchableList from './SearchableList';
import TagList from './TagList';
import { fillHeight, fillHeightScroll } from './styles';

class ScriptSection extends Component {
	render() {
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
					<TagList tags={this.props.tags}
						onTagSelectChange={this.props.onTagSelectChange}/>
				</Col>
				<Col xs={7} sm={8} md={7} style={fillHeightScroll}>
					<br/><br/><br/><br/>
					<SearchableList config={scriptConfig} {...this.props.arrayData}
						onLoadData={this.props.onLoadDatas}
						onCreateItem={this.props.onSelectScript}
						onItemClicked={this.props.onSelectScript}
						onDeleteItem={this.props.onChangeItem}/>
				</Col>
			</Row>
		);
	}
}

ScriptSection.propTypes = {
	tags: PropTypes.array,
	arrayData: PropTypes.object.isRequired,
	onLoadDatas: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired,
	onSelectScript: PropTypes.func.isRequired,
	onTagSelectChange: PropTypes.func.isRequired
};

export default ScriptSection;

