import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { GnIcon, GnAccordionList, GnDataPanel } from './elements';
import ReportActionItem from './ReportActionItem';
import { PieChart } from 'react-d3';
import _ from 'underscore';

class ReportPanel extends Component {
	render() {
		return (
			<div>
				{this.renderDetailPanel()}
				{this.renderScriptList()}
			</div>
		);
	}
	renderDetailPanel() {
		const report = this.props.report;
		const detailDatas = [
			{ icon: 'tablet', label: 'Platform', content: <GnIcon icon={report.platform.toLowerCase()}/> },
			{ icon: 'code-fork', label: 'Version', content: report.platformVersion },
			{ icon: 'bug', label: 'Package', content: <a href={report.packagePath} target='_blank'>{report.packageName}</a> },
			{ icon: 'tags', label: 'Run Tags', content: report.tags },
			{ icon: 'clock-o', label: 'Duration', content: `${report.startDate}&nbsp;&nbsp;~&nbsp;&nbsp;${report.endDate}` }
		];

		let count = _.countBy(report.scripts, script => script.err ? 'failed' : 'success');
		count.failed = count.failed ? count.failed : 0;
		count.success = count.success ? count.success : 0;
		const pieData = [
			{label: 'Success', value: count.success ? (count.failed + count.success) / count.success * 100 : 0},
			{label: 'Failed', value: count.failed ? (count.failed + count.success) / count.failed * 100 : 0}
		];

		return (
			<Panel>
				<GnDataPanel datas={detailDatas}
					rightPanel={<PieChart data={pieData} width={200} height={200} radius={50} sectorBorderColor="white"
									colors={args => args == 0 ? '#4caf50' : '#e51c23'}/>}/>
			</Panel>
		);
	}
	renderScriptList() {
		const report = this.props.report;
		const panels = report.scripts.map((script, index) => {
			const actionItems = script.actions.map((action, index) => (
				<ReportActionItem key={index} index={index} action={action}/>
			));

			return {
				title: <span><GnIcon style={{color: script.err ? '#e51c23' : '#4caf50'}} icon={script.err ? 'times' : 'check'}/>&nbsp;&nbsp;{script.title}</span>,
				node: <div>{actionItems}</div>
			};
		});
		
		return <GnAccordionList panels={panels}/>;
	}
}

ReportPanel.propTypes = {
	report: PropTypes.shape({
		tags: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		platform: PropTypes.string.isRequired,
		platformVersion: PropTypes.string.isRequired,
		packageName: PropTypes.string.isRequired,
		packageDate: PropTypes.string.isRequired,
		packageDescription: PropTypes.string,
		packagePath: PropTypes.string.isRequired,
		scripts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
	}).isRequired
};

export default ReportPanel;

