/**
 * Created by ruiqili on 19/9/15.
 */
import React, { Component, PropTypes } from 'react';
import mui, { Snackbar } from 'material-ui';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { clearError } from '../actions/app-actions';

let ThemeManager = new mui.Styles.ThemeManager();

class App extends Component {
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    componentWillReceiveProps(nextProps) {
    	if (nextProps.toast && nextProps.error) {
    		this.refs.toast.show();
    		this.props.dispatch(clearError());
    	}
    }
    render() {
        return (
            <div>
            	{this.props.children}
				<Snackbar ref='toast' message={this.props.error}
					autoHideDuration='3000' openOnMount='false'
					action='Dismiss' onActionTouchTap={() => this.refs.toast.dismiss()}/>
            </div>
        );
    }
}

App.childContextTypes = {
    muiTheme: PropTypes.object
}

const propsSelector = createSelector(
	state => state.error,
	state => state.toast,
	(error, toast) => ({
		error,
		toast
	})
);

export default connect(propsSelector)(App);