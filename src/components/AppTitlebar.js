import React, { Component, PropTypes } from 'react';
import { AppBar, Tabs, Tab } from 'material-ui';

class AppTitlebar extends Component {
	render() {
		const itemStyle = {
			padding: '25px 10px'
		};

		return (
			<AppBar title="Jupiter Mobile Automation">
				<Tabs value={this.props.selectItem} onChange={value => this.props.onSectionSelected(value)}>
					<Tab label="Scripts" value="scripts" style={itemStyle} />
					<Tab label="Parameters" value="parameters" style={itemStyle} />
					<Tab label="Packages" value="packages" style={itemStyle} />
					<Tab label="Reports" value="reports" style={itemStyle} />
				</Tabs>
			</AppBar>
		);
	}
}

AppTitlebar.propTypes = {
	selectItem: PropTypes.string.isRequired,
	onSectionSelected: PropTypes.func.isRequired
};

export default AppTitlebar;