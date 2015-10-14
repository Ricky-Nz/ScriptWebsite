import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnAsyncPanel, GnSearchbar, GnList, GnListItem, GnIcon, GnButton } from './elements2';

class PackageSection extends Component {
	render() {
		const itemStyle = { border: 'none' };
		const listItems = this.props.array.map((item, index) => (
			<GnListItem key={index} style={itemStyle} leftView={<GnIcon icon='android'/>}
				primary={item.title} secondary={item.description}
				rightView={
					<GnButton gnStyle='link' icon='remove'
						onClick={() => this.props.onChangeItem(item, true)}/>
				}/>
		));

		return (
			<Row>
				<Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
					<br/><br/><br/><br/>
					<Panel>
						<GnSearchbar ref='search' placeholder='search for package title or descriptions'
							searching={this.props.querying} onSearch={this.onLoadDatas}/>
						<GnAsyncPanel loading={this.props.querying}>
							<GnList total={this.props.total} skip={this.props.skip}
								loading={this.props.querying} onLoadMore={() => this.onLoadDatas(this.refs.search.getValue(), true)}>
								{listItems}
							</GnList>
						</GnAsyncPanel>
					</Panel>
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
	onChangeItem: PropTypes.func.isRequired
};

export default PackageSection;

