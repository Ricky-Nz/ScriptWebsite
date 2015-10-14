import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnSelectList, GnAsyncPanel, GnSearchbar, GnList, GnListItem, GnIcon } from './elements';
import _ from 'underscore';

class ScriptSection extends Component {
	render() {
		const itemStyle = { border: 'none' };
		const listItems = this.props.array.map((item, index) => (
			<GnListItem key={index} style={itemStyle} leftView={<GnIcon icon='file-text-o'/>}
				primary={item.title} secondary={item.date} onClick={() => this.props.onOpenScript(item)}/>
		));

		return (
			<Row className='fillHeight'>
				<Col xs={5} sm={4} md={3} mdOffset={1}>
					<br/><br/><br/><br/>
					<Panel>
						<GnSelectList ref='tagList' items={this.props.tags}
							onSelectChange={selectTags => this.props.onLoadDatas(this.refs.search.getValue(), false, this.getTagSelection(selectTags))}/>
					</Panel>
				</Col>
				<Col xs={7} sm={8} md={7}>
					<br/><br/><br/><br/>
					<Panel>
						<GnSearchbar ref='search' placeholder='search for script by title' searching={this.props.loading}
							onSearch={searchText => this.props.onLoadDatas(searchText, false, this.getTagSelection())}/>
						<GnList total={this.props.total} skip={this.props.skip}
							loading={this.props.querying} header='Test Scripts'
							onAddItem={() => this.props.onOpenScript()}
							onLoadMore={() => this.props.onLoadDatas(this.refs.search.getValue(), true, this.getTagSelection())}>
							{listItems}
						</GnList>
					</Panel>
				</Col>
			</Row>
		);
	}
	getTagSelection(tags) {
		if (!tags) {
			tags = this.refs.tagList.getSelection();
		}
		return {
			where: {
				tags: {
					inq: tags
				}
			}
		};
	}
}

ScriptSection.propTypes = {
	tags: PropTypes.array,
	array: PropTypes.array.isRequired,
	skip: PropTypes.number,
	total: PropTypes.number,
	querying: PropTypes.bool,
	onLoadDatas: PropTypes.func.isRequired,
	onOpenScript: PropTypes.func.isRequired
};

export default ScriptSection;

