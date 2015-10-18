import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { GnAsyncPanel, GnSearchbar, GnList, GnListItem, GnIcon, GnButton } from './elements';

class ParameterSection extends Component {
	render() {
		const itemStyle = { border: 'none' };
		const listItems = this.props.array.map((item, index) => (
			<GnListItem key={index} style={itemStyle} leftView={<GnIcon icon='code'/>}
				primary={item.key} secondary={item.value}
				rightView={
					<span>
						<GnButton gnStyle='link' icon='edit'
							onClick={() => this.props.onChangeItem(item)}/>,
						<GnButton gnStyle='link' icon='remove'
							onClick={() => this.props.onChangeItem(item, true)}/>
					</span>
				}/>
		));

		return (
			<Row className='fillHeightScroll'>
				<Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
					<br/><br/><br/><br/>
					<Panel>
						<GnSearchbar ref='search' placeholder='search for parameter key or value'
							searching={this.props.querying} onSearch={this.props.onLoadDatas}/>
						<GnList total={this.props.total} skip={this.props.skip} header='Global Parameters'
							loading={this.props.querying} onLoadMore={() =>
								this.props.onLoadDatas(this.refs.search.getValue(), true)}
							onAddItem={() => this.props.onChangeItem({})}>
							{listItems}
						</GnList>
					</Panel>
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

