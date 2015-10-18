import React, { Component, PropTypes } from 'react';
import { Row, Col, Tabs, Tab, Table  } from 'react-bootstrap';
import { GnIcon } from './elements';

class GuideSection extends Component {
	render() {
		return (
			<Row className='fillHeightScroll'>
				<Col xs={10} xsOffset={1}>
					<br/><br/><br/><br/>
					<Tabs defaultActiveKey={1} position="left" tabWidth={3} bsStyle='tabs'>
						<Tab eventKey={1} title='Write a script'>{this.renderScriptGuide()}</Tab>
						<Tab eventKey={2} title='Define a parameter'>{this.renderParameterGuide()}</Tab>
						<Tab eventKey={3} title='Upload a package'>{this.renderPackageGuide()}</Tab>
						<Tab eventKey={4} title='Run your script'>{this.renderRunnerGuide()}</Tab>
						<Tab eventKey={5} title='View your report'>{this.renderReportGuide()}</Tab>
					</Tabs>
				</Col>
			</Row>
		);
	}
	renderScriptGuide() {
		return (
			<div>
				<img src='/res/guide-1.png' style={{width: 500}}/>
				<br/><br/>
				<Table striped condensed hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Field</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Title</td>
							<td>Script title, use for visually identify a script, multiple script may have a
								same title, can not be empty.</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Tags</td>
							<td>Tag is using for group scripts.
								In Gear terminal application, you use tag to tell Gear which script you
								want to run. A valid test script must have at least one tag.</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Actions</td>
							<td>Basicly a test script is consisted of an sequence of actions, each action simulate a
								single user action, like 'click', 'input', 'flip', etc. to mock a action,
								first Click on the selectable button to select one of the many action types you want to run. and then
								if the action you choose need target on specific view element, another selectable button will appear,
								this time your need to select a
								method to tell Gear how to find the target element. Each element find method support
								two form of arguments, single and plural. for example, if you choose find by 'Name'
								and enter argument 'Yes', Gear will try to find you the first view element with content
								text equal to 'Yes'. or you can enter argument 'Yes[X]', X is a integer number, which
								in turn, Gear will try to find the Xth element with content 'Yes' in reading order.</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
	renderParameterGuide() {
		return (
			<div>
				<img src='/res/guide-2.png' style={{width: 500}}/>
				<br/><br/>
				<Table striped condensed hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Field</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Key</td>
							<td>To use parameter when writing script, put parameter key in curly brace and put it in
								any input fields you want make it dynamic.
								for example if we put {'{PHONE_NUMBER}'} in action input fields, at the time script get execute,
								this fileds will be replaced with the parameter value accordingly.</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Value</td>
							<td>Value the parameter key stands for.</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
	renderPackageGuide() {
		return (
			<div>
				<img src='/res/guide-3.png' style={{width: 500}}/>
				<br/><br/>
				<Table striped condensed hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Field</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Title</td>
							<td>Package title, use to visually identify a package, multiple package may have a
								same title, can not be empty.</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Description</td>
							<td>Optional package description.</td>
						</tr>
						<tr>
							<td>3</td>
							<td>File</td>
							<td>Select the package file for uploading.</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
	renderReportGuide() {
		return (
			<div>
				<img src='/res/guide-4.png' style={{width: 500}}/>
				<br/><br/>
				<Table striped condensed hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Field</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Platform</td>
							<td>Which platform was testing.</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Versions</td>
							<td>Which platform version was testing on.</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Package</td>
							<td>Which package was using.</td>
						</tr>
						<tr>
							<td>4</td>
							<td>Tags</td>
							<td>Which script was running.</td>
						</tr>
						<tr>
							<td>5</td>
							<td>Times</td>
							<td>Test duration.</td>
						</tr>
						<tr>
							<td>6</td>
							<td>Chart</td>
							<td>Pass rate pie chart.</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
	renderRunnerGuide() {
		return (
			<div>
				<img src='/res/guide-5.png' style={{width: 500}}/>
				<img src='/res/guide-6.png' style={{width: 500}}/>
				<br/><br/>
				<Table striped condensed hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Field</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Login</td>
							<td>You need to do a one time login when you first run the application.</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Platform</td>
							<td>Selct which platform you want to test.</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Package</td>
							<td>For android and iOS, select which pacakge to test on.</td>
						</tr>
						<tr>
							<td>4</td>
							<td>Tags</td>
							<td>Select which scripts you want to run using tags, you can enter multiple tags split by space.</td>
						</tr>
						<tr>
							<td>5</td>
							<td>Running</td>
							<td>Application will automatically download all the scripts and test package you selected,
								do auto-installaction on your connect devices and start to run.</td>
						</tr>
						<tr>
							<td>6</td>
							<td>Report uplaod</td>
							<td>After test finished, your test report will uplaod to your account automatically.</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

export default GuideSection;