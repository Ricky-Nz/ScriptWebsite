import React, { Component, PropTypes } from 'react';
import { Paper } from 'material-ui';
import { ThemeComponent } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectSection } from '../actions/dashboard-actions';

class ReportsPage extends ThemeComponent {
	componentDidMount() {
		this.props.dispatch(selectSection('reports'));
	}
	render() {
		return (
			<Paper>ReportsPage</Paper>
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

export default connect(propsSelector)(ReportsPage);

