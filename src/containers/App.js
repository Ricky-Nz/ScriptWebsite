/**
 * Created by ruiqili on 19/9/15.
 */
import React, { Component, PropTypes } from 'react';
import { Snackbar } from 'material-ui';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { clearError } from '../actions/app-actions';

class App extends Component {
    componentWillReceiveProps(nextProps) {
    	if (nextProps.newAction && nextProps.error) {
            this.refs.toast.show();
            this.props.dispatch(clearError());
    	}
    }
    render() {
        return (
            <div>
            	{this.props.children}
				<Snackbar ref='toast' message={this.props.error ? this.props.error : ''}
					autoHideDuration={3000} openOnMount={false}
					action='Dismiss' onActionTouchTap={() => this.refs.toast.dismiss()}/>
            </div>
        );
    }
}

const propsSelector = createSelector(
	state => state.errorState.error,
    state => state.errorState.newAction,
	(error, newAction) => ({ error, newAction })
);

export default connect(propsSelector)(App);


