import React, { Component, PropTypes } from 'react';
import { Paper } from 'material-ui';
import { ThemeComponent } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class ScriptPage extends ThemeComponent {
	render() {
		return (
			<Paper>ScriptPage</Paper>
		);
	}
}

const propsSelector = createSelector(
	state => state.reports,
    state => state.reportState,
    (reports, reportState) => {
        return { reports, ...reportState };
    }
);

export default connect(propsSelector)(ScriptPage);

