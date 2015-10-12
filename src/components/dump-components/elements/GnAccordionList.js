import React, { Component, PropTypes } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';

class GnAccordionList extends Component {
	render() {
		const panelItems = this.props.panels ? this.props.panels.map((panel, index) => (
			<Panel header={panel.title} eventKey={index}>
				{panel.node}
			</Panel>
		)) : null;

		return (
			<PanelGroup defaultActiveKey={0} accordion>
				{panelItems}
			</PanelGroup>
		);
	}
}

GnAccordionList.propTypes = {
	panels: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.node.isRequired,
		node: PropTypes.node.isRequired
	}))
};

export default GnAccordionList;