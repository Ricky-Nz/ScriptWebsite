import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import SearchableList from './SearchableList';
import ReportPanel from './ReportPanel';
import { fillHeight, fillHeightScroll } from './styles';

class ReportSection extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.select == null && nextProps.array.length > 0
				&& !nextProps.getting && !nextProps.error) {
			nextProps.onLoadItem(nextProps.array[0]);
		}
	}
	render() {
		const props = this.props;
		const config = {
			hideAddBtn: true,
			searchbarPlaceholder: 'search for report title',
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
					<br/><br/><br/><br/>
					<SearchableList config={config} datas={props.array} skip={props.skip}
						total={props.total} loading={props.querying} onLoadData={props.onLoadDatas}
						onDeleteItem={props.onChangeItem} onItemClicked={props.onLoadItem}/>
				</Col>
				<Col xs={8} md={7} style={fillHeightScroll}>
					<br/><br/><br/><br/>
					<ReportPanel report={props.select} error={props.error} getting={props.getting}/>
				</Col>
			</Row>
		);
	}
}

ReportSection.propTypes = {
	array: PropTypes.array.isRequired,
	skip: PropTypes.number,
	total: PropTypes.number,
	querying: PropTypes.bool,
	getting: PropTypes.bool,
	error: PropTypes.string,
	select: PropTypes.object,
	onLoadDatas: PropTypes.func.isRequired,
	onLoadItem: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired
};

export default ReportSection;

