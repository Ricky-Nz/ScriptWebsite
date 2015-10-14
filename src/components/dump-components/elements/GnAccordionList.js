import React, { Component, PropTypes } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';

let GnAccordionList = props => {
	const itemViews = props.items.map((item, index) => (
		<Panel key={index} header={item.title}>
			{item.node}
		</Panel>
	));

	return (
		<PanelGroup defaultActiveKey={0} accordion>
			{itemViews}
		</PanelGroup>
	);
}

GnAccordionList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.node.isRequired,
		node: PropTypes.node.isRequired
	}))
};

export default GnAccordionList;