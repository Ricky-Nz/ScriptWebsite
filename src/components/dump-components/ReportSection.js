import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade, Modal } from 'react-bootstrap';
import { GnAsyncPanel, GnSearchbar, GnList, GnListItem, GnIndexItem,
	GnIcon, GnButton, GnIconItem, GnChart, GnDrawerList } from './elements';
import _ from 'underscore';

class ReportSection extends Component {
	componentWillReceiveProps(nextProps) {
		if (!nextProps.getting && nextProps.array.length > 0 && !nextProps.error && (!nextProps.select || !nextProps.select.id)) {
			this.props.onLoadItem(nextProps.array[0]);
		}
	}
	render() {
		const itemStyle = { border: 'none' };
		const reportItems = this.props.array.map((item, index) => (
			<GnListItem key={index} style={itemStyle} leftView={<GnIcon icon='flag-o'/>}
				primary={item.date} secondary={item.title}
				onClick={() => this.props.onLoadItem(item)}
				rightView={<GnButton gnStyle='link' icon='remove'
					onClick={() => this.props.onChangeItem(item, true)}/>}/>
		));

		return (
			<Row className='fillHeight'>
				<Col xs={4} md={3} mdOffset={1}>
					<br/><br/><br/><br/>
					<Panel>
						<GnSearchbar ref='search' placeholder='search for parameter title or date'
							searching={this.props.querying} onSearch={this.props.onLoadDatas}/>
						<GnList total={this.props.total} skip={this.props.skip} header='Test Reports'
							loading={this.props.querying} scrollHeight={400} onLoadMore={() =>
								this.props.onLoadDatas(this.refs.search.getValue(), true)}>
							{reportItems}
						</GnList>
					</Panel>
				</Col>
				<Col xs={8} md={7} className='fillHeightScroll'>
					<br/><br/><br/><br/>
					{this.renderReport()}
				</Col>
			</Row>
		);
	}
	renderReport() {
		const report = this.props.select;
		let detailPanel, actionList = null;

		if (report){
			let count = _.countBy(report.scripts, script => script.err ? 'failed' : 'success');
			count.failed = count.failed ? count.failed : 0;
			count.success = count.success ? count.success : 0;
			const pieData = [
				{label: 'Success', color: '#4caf50',
					value: count.success ? (count.failed + count.success) / count.success * 100 : 0},
				{label: 'Failed', color: '#e51c23',
					value: count.failed ? (count.failed + count.success) / count.failed * 100 : 0}
			];
			const scriptTitles = report.scripts.map((script, index) => (
				<span className={script.err ? 'errorText' : 'successText'}><GnIcon icon={script.err ? 'times' : 'check'}/>{script.title}</span>
			));
			const scriptContents = report.scripts.map((script, index) => {
				return script.actions.map((action, index) => (
					<GnIndexItem key={index} index={index + 1} indexStyle={action.err ? 'danger' : 'success'}
						primary={action.title} secondary={action.err ? <p className='errorText'>{action.err}</p> : null}
						rightIcon={action.screenshoot && 'camera-retro'} onIconClicked={() => this.setState({selectAction: action})}/>
				));
			});
			const selectAction = this.state && this.state.selectAction;

			detailPanel = (
				<div className='horizontalVerCenter'>
					<div className='itemGrow'>
						<GnIconItem icon='tablet'
							content={<span>Platform: <GnIcon icon={report.platform.toLowerCase()}/></span>}/>
						<GnIconItem icon='code-fork'
							content={`Version: ${report.platformVersion}`}/>
						<GnIconItem icon='bug'
							content={<span>Package: <a href={report.packagePath} target='_blank'>{report.packageName}</a></span>}/>
						<GnIconItem icon='tags'
							content={`Run Tags: ${report.tags}`}/>
						<GnIconItem icon='clock-o'
							content={`Duration: ${report.startDate} ~ ${report.endDate}`}/>
					</div>
					<GnChart width={200} height={200} datas={pieData}/>
			        <Modal show={selectAction ? true : false} onHide={() => this.setState({selectAction: null})}>
			            <Modal.Header closeButton>
			                <Modal.Title>{selectAction&&selectAction.title}</Modal.Title>
			            </Modal.Header>
			            <Modal.Body>
			                <img style={{width: '100%', padding: 10, backgroundColor: 'black', borderRadius: 16}}
			                	src={selectAction&&`/storage/${report.testerId}/reports/${report.id}/screenshoot/${selectAction.screenshoot}`}/>
			            </Modal.Body>
			        </Modal>
				</div>
			);
			actionList = (
				<GnDrawerList titles={scriptTitles}>
					{scriptContents}
				</GnDrawerList>
			);
		}

		return (
			<div>
				<Panel>
					<GnAsyncPanel loading={this.props.getting}>
						{detailPanel}
					</GnAsyncPanel>
				</Panel>
				{this.props.getting ? null : actionList}
			</div>
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

