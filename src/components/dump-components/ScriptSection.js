import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col, Fade } from 'react-bootstrap';
import { GnSelectList, GnAsyncPanel, GnSearchbar, GnList, GnListItem, GnIcon } from './elements2';
import _ from 'underscore';

let ScriptSection = props => {
	const itemStyle = { border: 'none' };
	const listItems = props.array.map((item, index) => (
		<GnListItem key={index} style={itemStyle} leftView={<GnIcon icon='file-text-o'/>}
			primary={item.title} secondary={item.date}/>
	));
	const combineSelection = (selection, tags) => {
		let newSelection = {
			where: {
				tags: {
					inq: tags ? _.pluck(_.filter(tags, tag => tag.checked), 'ref') : []
				}
			}
		};

		if (selection) {
			newSelection = Object.assign({}, selection, newSelection,
				selection.where ? { where: Object.assign({}, selection.where, newSelection.where)} : null);
		}

		props.onLoadDatas(newSelection);
	};

	return (
		<Row className='fillHeight'>
			<Col xs={5} sm={4} md={3} mdOffset={1}>
				<Panel>
					<GnSelectList items={props.tags} onSelectChange={select => console.log(select)}/>
				</Panel>
			</Col>
			<Col xs={7} sm={8} md={7}>
				<Panel>
					<GnSearchbar placeholder='search for script by title' searching={props.loading}/>
					<GnAsyncPanel loading={props.querying}>
						<GnList total={props.total} skip={props.skip} loading={props.querying}>
							{listItems}
						</GnList>
					</GnAsyncPanel>
				</Panel>
			</Col>
		</Row>
	);
}

ScriptSection.propTypes = {
	tags: PropTypes.array,
	array: PropTypes.array.isRequired,
	skip: PropTypes.number,
	total: PropTypes.number,
	querying: PropTypes.bool,
	onLoadDatas: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired,
	onSelectScript: PropTypes.func.isRequired
};

export default ScriptSection;

