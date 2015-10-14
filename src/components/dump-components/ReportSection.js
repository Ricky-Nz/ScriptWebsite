import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnAsyncPanel, GnSearchbar, GnList, GnListItem, GnIndexItem,
	GnIcon, GnButton, GnIconItem, GnChart, GnAccordionList } from './elements2';

class ReportSection extends Component {
	render() {
		const itemStyle = { border: 'none' };
		const reportItems = props.array.map((item, index) => (
			<GnListItem key={index} style={itemStyle} leftView={<GnIcon icon='flag-o'/>}
				primary={item.date} secondary={item.title}
				rightView={<GnButton gnStyle='link' icon='remove'
					onClick={() => props.onChangeItem(item, true)}/>}/>
		));

		const report = props.select;
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
			<Row className={fillHeight}>
				<Col xs={4} md={3} mdOffset={1}>
					<Panel>
						<GnSearchbar ref='search' placeholder='search for parameter title or date'
							searching={props.querying} onSearch={this.loadData.bind(this)}/>
						<GnAsyncPanel loading={props.querying}>
							<GnList total={props.total} skip={props.skip}
								loading={props.querying} onLoadMore={() => this.loadData(this.refs.search.getValue(), true)}>
								{reportItems}
							</GnList>
						</GnAsyncPanel>
					</Panel>
				</Col>
				<Col xs={8} md={7} style={fillHeightScroll}>
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

