import React, { Component, PropTypes } from 'react';
import { Paper } from 'material-ui';
import { ThemeComponent } from '../components';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectSection } from '../actions/dashboard-actions';

class PackagesPage extends ThemeComponent {
	componentDidMount() {
		this.props.dispatch(selectSection('packages'));
	}
	render() {
		return (
			<Paper>PackagesPage</Paper>
		);
	}
}

const propsSelector = createSelector(
	state => state.packages,
    state => state.packageState,
    (packages, packageState) => {
        return { packages, ...packageState };
    }
);

export default connect(propsSelector)(PackagesPage);

