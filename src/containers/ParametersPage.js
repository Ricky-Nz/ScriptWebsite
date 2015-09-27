import React, { Component, PropTypes } from 'react';
import { ThemeComponent, SearchBar, SearchList, AutoLoadMoreList } from '../components';
import { verCenter } from '../styles';
// Redux
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectSection } from '../actions/dashboard-actions';
import { loadParameters, searchParameters } from '../actions/parameter-actions';

class ParametersPage extends ThemeComponent {
	componentDidMount() {
		this.props.dispatch(selectSection('parameters'));
		this.props.dispatch(loadParameters());
	}
	render() {
		return (
			<div style={verCenter}>
				<div style={{minWidth: 600, paddingTop: 50}}>
					<SearchBar searching={this.props.searching}
						hint='enter parameter key or value'
						onSearch={text => {
							this.props.dispatch(searchParameters(text));
						}}/>
					<br/>
					{this.props.searchText ?
						<SearchList datas={this.props.searchResults}
							primaryKey='key'
							secondaryKey='value'
							leftIcon='settings_ethernet'
							searchText={this.props.searchText}
							searching={this.props.searching}/>
						:
						<AutoLoadMoreList
							datas={this.props.parameters}
							header='Golabel Parameters'
							primaryKey='key'
							secondaryKey='value'
							leftIcon='settings_ethernet'
							loading={this.props.loading}/>
					}
					<br/>
				</div>
			</div>
		);
	}
}

const propsSelector = createSelector(
	state => state.parameters,
	state => state.parameterState.loading,
	state => state.parameterState.searching,
	state => state.parameterState.searchResults,
	state => state.parameterState.searchText,
    (parameters, loading, searching, searchResults, searchText) =>
    	({ parameters, loading, searching, searchResults, searchText })
);

export default connect(propsSelector)(ParametersPage);

