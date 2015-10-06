import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

class DashboardGuide extends Component {
	render() {
		return (
			<Row>
				<Col xs={6} sm={5} md={4} mdOffset={1}>
					Guide
				</Col>
			</Row>
		);
	}
}

export default DashboardGuide;