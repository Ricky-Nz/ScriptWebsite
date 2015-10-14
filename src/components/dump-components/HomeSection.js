import React, { PropTypes } from 'react';
import { Row, Col, PageHeader, SplitButton, MenuItem } from 'react-bootstrap';
import { GnIcon } from './elements2';

let HomeSection = props => {
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

	const menuItems = props.versions.map((version, index) => (
		<MenuItem key={index} eventKey={version.download}>{version.name}</MenuItem>
	));
	const firstItem = props.versions.length > 0 ? props.versions[0].name : null;

	return (
		<Row className='fillHeight'>
			<Col xs={10} xsOffset={1} md={8} mdOffset={2} className='fillHeightScroll'>
				<br/><br/><br/><br/>
				<PageHeader><p>Get Gear<small style={subTitleMargin}>Download application</small></p></PageHeader>
				<div className='horizontalCenter'>
					{firstItem ?
						<SplitButton id='version-button' style={center} bsStyle='primary'
							title={firstItem} onSelect={(e, key) => {
								var dl = document.createElement('a');
								dl.setAttribute('href', key);
								dl.click();
							}} onClick={() => {
								var dl = document.createElement('a');
								dl.setAttribute('href', props.versions[0].download);
								dl.click();
							}}>
							{menuItems}
						</SplitButton> : null
					}
				</div>
				<PageHeader><p>Environment preparation<small style={subTitleMargin}>Mac / Windows</small></p></PageHeader>
				<p>Gear test automation is basing on Node.js®, in order to run Gear, you need to install Node.js®.</p>
				<p><GnIcon icon='chrome' style={padding}/><a href='https://nodejs.org' target='_blank'>Install NodeJS</a></p>
				<p>Run command below to verify your installation</p>
				<img src='/res/install-1.png' style={{width: 600}}/>
				<br/><br/>
				<p>
					Gear test automation currently supported platform including:&nbsp;&nbsp;
					<a href='https://www.android.com/' target='_blank'>Android</a>&nbsp;&nbsp;
					<a href='http://www.apple.com/sg/ios/' target='_blank'>iOS</a>&nbsp;&nbsp;
					<a href='http://www.google.com/chrome/' target='_blank'>Chrome</a>&nbsp;&nbsp;
					<a href='https://www.mozilla.org/en-US/firefox/new/' target='_blank'>Firefox</a>
				</p>
				<div><GnIcon icon='android' style={padding}/>For android you must <a href='https://developer.android.com/sdk/installing/index.html?pkg=tools' target='_blank'>Install Android SDK</a></div>
				<div style={{paddingLeft: 33}}>After install you nedd to <a href='https://spring.io/guides/gs/android/' target='_blank'>Set ANDROID_HOME environment variable and add tools/platform-tools to your system path</a></div>
				<div style={{paddingLeft: 33}}>Run command below to verify your configuration</div>
				<span style={{paddingLeft: 33}}><img src='/res/install-3.png' style={{width: 600}}/></span>
				<br/><br/>
				<p><GnIcon icon='apple' style={padding}/>For iOS you must <a href='https://developer.apple.com/xcode/download/' target='_blank'>Install xCode</a></p>
				<PageHeader><p>You Are Good to Go<small style={subTitleMargin}>Run it!</small></p></PageHeader>
				<p><GnIcon icon='windows' style={padding}/>For windows, run run.bat.</p>
				<p><GnIcon icon='apple' style={padding}/>For Mac, run run.command.</p>
				<img src='/res/install-2.png' style={{width: 600}}/>
				<Row style={footer}>
					<Col sm={4}>
						<h5>Multi-Platform</h5>
						<p>Gear Test Automation currently support Android, iOS, Chrome and Firefox.</p>
					</Col>
					<Col sm={4}>
						<h5>Simple</h5>
						<p>Provide tools including Script editor, Script/Pacakge/Parameter manager, command line runner and more to reduce your testing payload.</p>
					</Col>
					<Col sm={4}>
						<h5>Rich Report</h5>
						<p>Rich test report including Execution, Networking, Memory and more.</p>
					</Col>
				</Row>
				<p style={terms}><GnIcon icon='cogs'/>&nbsp;Gear Test Automation © 2015</p>
			</Col>
		</Row>
	);
}

HomeSection.propTypes = {
	versions: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		downlaod: PropTypes.string.isRequired
	})).isRequired
};

export default HomeSection;

