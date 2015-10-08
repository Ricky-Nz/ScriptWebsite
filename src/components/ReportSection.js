import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import SearchableList from './SearchableList';
import ReportPanel from './ReportPanel';
import { fillHeight, fillHeightScroll } from './styles';

class ReportSection extends Component {
	render() {
		const props = this.props;
		const config = {
			hideAddBtn: true,
			searchbarHint: 'search for report title',
			listHeader: 'Test Reports',
			itemIcon: 'description',
			showEditBtn: false,
			showDeleteBtn: true,
			primaryKey: 'date',
			secondaryKey: 'tags',
			searchable: ['tags', 'date']
		};

		return (
			<Row style={fillHeight}>
				<Col xs={4} md={3} mdOffset={1}>
					<SearchableList config={config} {...props.arrayData} onLoadData={this.props.onLoadDatas}
							onDeleteItem={this.props.onChangeItem} onItemClicked={this.props.onLoadItem}/>
				</Col>
				<Col xs={8} md={7} style={fillHeightScroll}>
					{props.detail.data ?
						<ReportPanel report={props.detail.data}
							error={props.detail.error}/> : null
					}
				</Col>
			</Row>
		);
	}
}

ReportSection.propTypes = {
	arrayData: PropTypes.object.isRequired,
	detail: PropTypes.object.isRequired,
	select: PropTypes.string,
	onLoadDatas: PropTypes.func.isRequired,
	onLoadItem: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired
};

export default ReportSection;

