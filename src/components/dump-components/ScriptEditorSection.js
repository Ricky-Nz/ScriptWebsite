import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnButton } from './elements';
import SearchableList from './SearchableList';
import ScriptPanel from './ScriptPanel';
import { fillHeight, fillHeightScroll } from './styles';

class ScriptEditorSection extends Component {
	render() {
		const props = this.props;
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
					<GnButton bsStyle='link' icon='angle-double-left' label='Back' onClick={props.onBack}/>
					<SearchableList config={scriptConfig} datas={props.array} skip={props.skip}
						total={props.total} loading={props.querying}
						onLoadData={props.onLoadDatas}
						onCreateItem={props.onNewBlankScript}
						onItemClicked={props.onLoadItem}/>
				</Col>
				<Col xs={7} sm={8} md={7} style={fillHeightScroll}>
					<div style={{height: 120}}/>
					<ScriptPanel
						getting={props.getting}
						submitting={props.submitting}
						error={props.error}
						script={props.select}
						onSubmit={props.onChangeItem}
						onDelete={props.onChangeItem}
						onUpdateScript={props.onUpdateScript}/>
				</Col>
			</Row>
		);
	}
}

ScriptEditorSection.propTypes = {
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

