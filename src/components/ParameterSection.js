import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import SearchableList from './SearchableList';

class ParameterSection extends Component {
	render() {
		const props = this.props;
		const config = {
			searchbarPlaceholder: 'search for parameter key or value ',
			listHeader: 'Golabel Parameters',
			itemIcon: 'code',
			showEditBtn: true,
			showDeleteBtn: true,
			primaryKey: 'key',
			secondaryKey: 'value',
			searchable: ['key', 'value']
		};

		return (
			<Row>
				<Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
					<br/><br/><br/><br/>
					<SearchableList config={config} datas={props.array} skip={props.skip}
						total={props.total} loading={props.querying}
						onLoadData={props.onLoadDatas}
						onCreateItem={props.onChangeItem}
						onEditItem={props.onChangeItem}
						onDeleteItem={props.onChangeItem}/>
				</Col>
			</Row>
		);
	}
}

ParameterSection.propTypes = {
	array: PropTypes.array.isRequired,
	skip: PropTypes.number,
	total: PropTypes.number,
	querying: PropTypes.bool,
	onLoadDatas: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired
};

export default ParameterSection;

