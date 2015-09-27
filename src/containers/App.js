/**
 * Created by ruiqili on 19/9/15.
 */
import React, { PropTypes } from 'react';
import { Snackbar, Styles } from 'material-ui';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ThemeComponent } from '../components';

class App extends ThemeComponent {
    componentWillReceiveProps(nextProps) {
    	if (nextProps.error !== this.props.error && nextProps.error.message) {
            this.refs.toast.show();
    	}
    }
    render() {
        return (
            <div>
            	{this.props.children}
				<Snackbar ref='toast' message={this.props.error.message ? this.props.error.message : ''}
					autoHideDuration={3000} openOnMount={false}
					action='Dismiss' onActionTouchTap={() => this.refs.toast.dismiss()}/>
            </div>
        );
    }
}

const propsSelector = createSelector(
	state => state.errorState,
	error => ({ error })
);

export default connect(propsSelector)(App);


