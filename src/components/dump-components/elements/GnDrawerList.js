import React, { PropTypes } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';

let GnDrawerList = props => {
	const itemViews = props.children.map((item, index) => (
		<Panel key={index} eventKey={index} header={props.titles[index]}>
			{item}
		</Panel>
	));

	return (
		<PanelGroup defaultActiveKey={0} accordion>
			{itemViews}
		</PanelGroup>
	);
}

GnDrawerList.propTypes = {
	titles: PropTypes.arrayOf(PropTypes.node)
};

export default GnDrawerList;