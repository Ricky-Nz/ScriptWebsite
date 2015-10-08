import React, { Component, PropTypes } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

class GnAccordionList extends Component {
	render() {
		const panelItems = this.props.panels ? this.props.panels.map((panel, index) => (
			<Panel header={panel.title} eventKey={index} defaultExpanded={index == 0}>
				{panel.node}
			</Panel>
		)) : null;

		return (
			<Accordion>
				{panelItems}
			</Accordion>
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