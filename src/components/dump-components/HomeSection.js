import React, { PropTypes } from 'react';
import { Row, Col, PageHeader, SplitButton, MenuItem } from 'react-bootstrap';
import { GnIcon } from './elements';

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
		<Row className='fillHeightScroll'>
			<Col xs={10} xsOffset={1} md={8} mdOffset={2}>
				<br/><br/><br/><br/>
				<h4>Get Gear<small style={subTitleMargin}>Download application</small></h4>
				<br/>
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
				<br/>
				<h4>Environment preparation<small style={subTitleMargin}>Mac / Windows</small></h4>
				<br/>
				<p>Gear test automation is basing on Node.js®, in order to run Gear, you need to install Node.js®.</p>
				<p><GnIcon icon='chrome' style={padding}/><a href='https://nodejs.org' target='_blank'>Install NodeJS</a></p>
				<p>Run command below to verify your installation</p>
				<img src='/res/install-1.png' style={{width: 600}}/>
				<br/><br/>
				<div><GnIcon icon='android' style={padding}/>For android you need <a href='https://developer.android.com/sdk/installing/index.html?pkg=tools' target='_blank'>Install Android SDK</a></div>
				<div style={{paddingLeft: 33}}>After the installation complete, you nedd to <a href='https://spring.io/guides/gs/android/' target='_blank'>Set ANDROID_HOME environment variable and add tools/platform-tools to your system path</a></div>
				<div style={{paddingLeft: 33}}>Run command below to verify your configuration</div>
				<span style={{paddingLeft: 33}}><img src='/res/install-3.png' style={{width: 600}}/></span>
				<br/><br/>
				<p><GnIcon icon='apple' style={padding}/>For iOS you need <a href='https://developer.apple.com/xcode/download/' target='_blank'>Install xCode</a></p>
				<br/>
				<h4>You Are Good to Go<small style={subTitleMargin}>Run it!</small></h4>
				<br/>
				<p>Unzip the file you downloaded in step one, open terminal go to unziped folder, run "npm install", then run "node runner.js"</p>
				<img src='/res/install-2.png' style={{width: 600}}/>
				<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<p style={terms}><GnIcon icon='cogs'/>&nbsp;Gear Test Automation © 2015</p>
			</Col>
		</Row>
	);
}

HomeSection.propTypes = {
	versions: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		downlaod: PropTypes.string
	}))
};

export default HomeSection;

