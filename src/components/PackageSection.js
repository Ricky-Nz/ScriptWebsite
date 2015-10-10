import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import SearchableList from './SearchableList';

class PackageSection extends Component {
	render() {
		const props = this.props;
		const config = {
			searchbarPlaceholder: 'search for package title or descriptions',
			listHeader: 'Installation Packages',
			itemIcon: 'android',
			showEditBtn: false,
			showDeleteBtn: true,
			primaryKey: 'title',
			secondaryKey: 'description',
			searchable: ['title', 'description']
		};

		return (
			<Row>
				<Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
					<br/><br/><br/><br/>
					<SearchableList config={config} datas={props.array} skip={props.skip}
						total={props.total} loading={props.querying} onLoadData={props.onLoadDatas}
						onCreateItem={props.onChangeItem} onDeleteItem={props.onChangeItem}/>
				</Col>
			</Row>
		);
	}
}

PackageSection.propTypes = {
	array: PropTypes.array.isRequired,
	skip: PropTypes.number,
	total: PropTypes.number,
	querying: PropTypes.bool,
	onLoadDatas: PropTypes.func.isRequired,
	onLoadItem: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired
};

export default PackageSection;

