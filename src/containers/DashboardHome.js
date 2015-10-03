import React, { Component, PropTypes } from 'react';
import { Row, Col, PageHeader, SplitButton, MenuItem } from 'react-bootstrap';
import { GnIcon } from '../components/elements';
import { horCenter } from '../components/styles';

class DashboardHome extends Component {
	render() {
		const subTitleMargin = {
			marginLeft: 10
		};
		const center = {
			margin: '0px auto'
		};
		const padding = {
			margin: '0px 10px'
		};
		const footer = {
			padding: '80px 0px 60px 0px'
		};
		const terms = {
			textAlign: center
		};

		return (
			<Row>
				<Col xs={10} xsOffset={1} md={8} mdOffset={2}>
					<PageHeader><h4>Get Gear<small style={subTitleMargin}>Download application</small></h4></PageHeader>
					<div style={Object.assign({padding: 30}, horCenter)}>
						<SplitButton style={center} bsStyle='primary' title='Latest v1.0.0'>
							<MenuItem eventKey="1">Latest v1.0.0</MenuItem>
						</SplitButton>
					</div>
					<PageHeader><h4>Environment preparation<small style={subTitleMargin}>Mac / Windows</small></h4></PageHeader>
					<p>Gear test automation is basing on Node.js®, in order to run Gear, you need to install Node.js®.</p>
					<p><GnIcon icon='chrome' style={padding}/><a href='https://nodejs.org' target='_blank'>Install NodeJS</a></p>
					<p>
						Gear test automation currently supported platform including:&nbsp;&nbsp;
						<a href='https://www.android.com/' target='_blank'>Android</a>&nbsp;&nbsp;
						<a href='http://www.apple.com/sg/ios/' target='_blank'>iOS</a>&nbsp;&nbsp;
						<a href='http://www.google.com/chrome/' target='_blank'>Chrome</a>&nbsp;&nbsp;
						<a href='https://www.mozilla.org/en-US/firefox/new/' target='_blank'>Firefox</a>
					</p>
					<p><GnIcon icon='android' style={padding}/>For android <a href='https://developer.android.com/sdk/installing/index.html?pkg=tools' target='_blank'>Install Android SDK</a></p>
					<p><GnIcon icon='apple' style={padding}/>For iOS <a href='https://developer.apple.com/xcode/download/' target='_blank'>Install xCode</a></p>
					<PageHeader><h4>You Are Good to Go<small style={subTitleMargin}>Run it!</small></h4></PageHeader>
					<p><GnIcon icon='windows' style={padding}/>For windows, run run.bat.</p>
					<p><GnIcon icon='apple' style={padding}/>For Mac, run run.command.</p>
					<Row style={footer}>
						<Col xs={10} xsOffset={1} sm={3}>
							<h5>Multi-Platform</h5>
							<p>Gear Test Automation support Android, iOS, Chrome, Firefox.</p>
						</Col>
						<Col xs={10} xsOffset={1} sm={3}>
							<h5>Simple Test Script</h5>
							<p>Provide tools including Script editor, Script manager and Install Package manager and more.</p>
						</Col>
						<Col xs={10} xsOffset={1} sm={3}>
							<h5>Rich Test Report</h5>
							<p>Rich test report including Execution, Networking, Memory and more.</p>
						</Col>
					</Row>
					<p style={terms}><GnIcon icon='cogs'/>&nbsp;Gear Test Automation © 2015-2025</p>
				</Col>
			</Row>
		);
	}
}

export default DashboardHome;