import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import SearchableList from './SearchableList';

class PackageSection extends Component {
	render() {
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
					<SearchableList config={config} {...this.props.arrayData} onLoadData={this.props.onLoadDatas}
						onCreateItem={this.props.onChangeItem} onDeleteItem={this.props.onChangeItem}/>
				</Col>
			</Row>
		);
	}
}

PackageSection.propTypes = {
	arrayData: PropTypes.object.isRequired,
	onLoadDatas: PropTypes.func.isRequired,
	onLoadItem: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired
};

export default PackageSection;

