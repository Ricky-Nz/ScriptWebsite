import React, { Component, PropTypes } from 'react';
import { Row, Col, Tabs, Tab, Table  } from 'react-bootstrap';
import { GnIcon } from './elements';
import { fillHeight, fillHeightScroll } from './styles';

class GuideSection extends Component {
	render() {
		return (
			<Row style={fillHeight}>
				<Col xs={10} xsOffset={1} style={fillHeightScroll}>
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
							<td>Script title, use for identify a script, multiple script may have a
								same title, but can not be empty.</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Tags</td>
							<td>A test script must have at least one tag, tag is using for group script.
								In the Gear client application, you use tag to tell Gear which script you
								want to run.</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Actions</td>
							<td>A test script consisted of an sequence of actions, each action simulate a
								single user action, like 'click', 'input', 'flip', etc. to define a action,
								first Click on the left button to select one action type you want to run, and then
								if the action you choose need target on a view element, your need to select a
								method to tell Gear how to find the target element. Each element find method support
								two form of argument, single and plural. for example, if you choose find by 'Name'
								and enter argument 'Yes', Gear will try to find you the first view element with content
								text equal to 'Yes'. or you can enter argument 'Yes[X]', X is a integer number, which
								in turn, Gear will try to find the Xth element with content 'Yes' in the reading order.</td>
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
							<td>Parameter key, to use parameter in script, put parameter key in curly brace,
								for example {'{PHONE_NUMBER}'}, at the time script get execute, fileds with parameter
								key in curly brase will replced by the respect parameter value.</td>
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
							<td>Package title, use for identify a package, multiple package may have a
								same title, but can not be empty.</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Description</td>
							<td>Optional package description.</td>
						</tr>
						<tr>
							<td>3</td>
							<td>File</td>
							<td>Click or drop the package file to upload.</td>
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
							<td>Which platform version was testing.</td>
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
							<td>Select the script you want to runn by script tags, you can enter multiple tags split by space.</td>
						</tr>
						<tr>
							<td>5</td>
							<td>Running</td>
							<td>Application will download all the scripts you selected and start to run.</td>
						</tr>
						<tr>
							<td>6</td>
							<td>Report uplaod</td>
							<td>After all script finished, your test report will going to uplaod to your account automatically.</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

export default GuideSection;