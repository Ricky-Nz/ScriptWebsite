import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import SearchableList from './SearchableList';

class ParameterSection extends Component {
	render() {
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
					<SearchableList config={config} {...this.props.arrayData}
						onLoadData={this.props.onLoadDatas}
						onCreateItem={this.props.onChangeItem}
						onEditItem={this.props.onChangeItem}
						onDeleteItem={this.props.onChangeItem}/>
				</Col>
			</Row>
		);
	}
}

ParameterSection.propTypes = {
	arrayData: PropTypes.object.isRequired,
	onLoadDatas: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired
};

export default ParameterSection;

