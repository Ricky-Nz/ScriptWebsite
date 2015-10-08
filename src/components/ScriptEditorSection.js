import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnIconButton } from './elements';
import SearchableList from './SearchableList';
import ScriptPanel from './ScriptPanel';
import { fillHeight, fillHeightScroll } from './styles';

class ScriptEditorSection extends Component {
	render() {
		const scriptConfig = {
			limitScroll: true,
			searchbarPlaceholder: 'search for script by title',
			listHeader: 'Test Scripts',
			itemIcon: 'file-text-o',
			showEditBtn: false,
			showDeleteBtn: false,
			primaryKey: 'title',
			secondaryKey: 'date',
			searchable: ['title']
		};

		return (
			<Row style={fillHeight}>
				<Col xs={5} sm={4} md={3} mdOffset={1}>
					<br/><br/><br/><br/>
					<GnIconButton bsStyle='link' icon='angle-double-left' label='Back' onClick={this.props.onBack}/>
					<SearchableList config={scriptConfig} {...this.props.arrayData}
						onLoadData={this.props.onLoadDatas}
						onCreateItem={this.props.onChangeItem}
						onItemClicked={this.props.onLoadItem}/>
				</Col>
				<Col xs={7} sm={8} md={7} style={fillHeightScroll}>
					<div style={{height: 126}}/>
					<ScriptPanel
						loading={this.props.detail.loading}
						submiting={this.props.arrayData.updating}
						error={this.props.detail.error}
						script={this.props.detail.data}
						findTypes={this.props.user.config.findTypes}
						actionTypes={this.props.user.config.actionTypes}
						onSubmit={this.props.onChangeItem}
						onDelete={this.props.onChangeItem}/>
				</Col>
			</Row>
		);
	}
}

ScriptEditorSection.propTypes = {
	user: PropTypes.object.isRequired,
	arrayData: PropTypes.object.isRequired,
	detail: PropTypes.object.isRequired,
	onLoadDatas: PropTypes.func.isRequired,
	onLoadItem: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired,
	onBack: PropTypes.func.isRequired
};

export default ScriptEditorSection;

