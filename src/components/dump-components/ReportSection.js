import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnAsyncPanel, GnSearchbar, GnList, GnListItem, GnIndexItem,
	GnIcon, GnButton, GnIconItem, GnChart, GnAccordionList } from './elements';
import _ from 'underscore';

class ReportSection extends Component {
	render() {
		const itemStyle = { border: 'none' };
		const reportItems = this.props.array.map((item, index) => (
			<GnListItem key={index} style={itemStyle} leftView={<GnIcon icon='flag-o'/>}
				primary={item.date} secondary={item.title}
				rightView={<GnButton gnStyle='link' icon='remove'
					onClick={() => this.props.onLoadItem(item)}/>}/>
		));

		return (
			<Row className='fillHeight'>
				<Col xs={4} md={3} mdOffset={1}>
					<Panel>
						<GnSearchbar ref='search' placeholder='search for parameter title or date'
							searching={this.props.querying} onSearch={this.props.onLoadDatas}/>
						<GnList total={this.props.total} skip={this.props.skip} header='Test Reports'
							loading={this.props.querying} onLoadMore={() =>
								this.props.onLoadDatas(this.refs.search.getValue(), true)}>
							{reportItems}
						</GnList>
					</Panel>
				</Col>
				<Col xs={8} md={7} className='fillHeightScroll'>
					{this.renderReport()}
				</Col>
			</Row>
		);
	}
	renderReport() {
		const report = this.props.select;
		if (!report) {
			return null;
		}

		let count = _.countBy(report.scripts, script => script.err ? 'failed' : 'success');
		count.failed = count.failed ? count.failed : 0;
		count.success = count.success ? count.success : 0;
		const pieData = [
			{label: 'Success', color: '#4caf50',
				value: count.success ? (count.failed + count.success) / count.success * 100 : 0},
			{label: 'Failed', color: '#e51c23',
				value: count.failed ? (count.failed + count.success) / count.failed * 100 : 0}
		];
		const scriptReports = report.scripts.map((script, index) => {
			const actionItems = script.actions.map((action, index) => (
				<GnIndexItem key={index} index={index + 1} indexStyle={action.err ? 'success' : 'danger'}
					primary={action.title} secondary={<p className='errorText'>{action.err}</p>}/>
			));

			return {
				title: <GnIconItem icon={script.err ? 'times' : 'check'}
					iconClass={script.err ? 'errorText' : 'successText'} content={script.title}/>,
				node: {actionItems}
			};
		});

		return (
			<GnAsyncPanel>
				<Panel className='horizontalVerCenter'>
					<div>
						<GnIconItem icon='tablet'
							content={<span>Platform: <GnIcon icon={report.platform.toLowerCase()}/></span>}/>
						<GnIconItem icon='code-fork'
							content={`Version: ${report.platformVersion}`}/>
						<GnIconItem icon='bug'
							content={<span>Package: <a href={report.packagePath} target='_blank'>{report.packageName}</a></span>}/>
						<GnIconItem icon='tags'
							content={`Run Tags: ${report.tags}`}/>
						<GnIconItem icon='clock-o'
							content={`${Duration}: ${report.startDate} ~ ${report.endDate}`}/>
					</div>
					<GnChart width={200} height={200} datas={pieData}/>
				</Panel>
				<GnAccordionList items={scriptReports}/>
			</GnAsyncPanel>
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
	onLoadItem: PropTypes.func.isRequired
};

export default ReportSection;

