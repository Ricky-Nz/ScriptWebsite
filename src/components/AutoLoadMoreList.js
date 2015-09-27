import React, { Component, PropTypes } from 'react';
import { CircularProgress, Paper } from 'material-ui';
import ContentList from './ContentList';
import { horCenter } from '../styles';
import { combinePropTypes, extratProps } from '../utils';

class AutoLoadMoreList extends Component {
	render() {
		return (
			<Paper style={this.props.style}>
				<ContentList {...extratProps(this.props, ContentList)}/>
				{this.props.loading ?
					<div style={horCenter}>
						<CircularProgress style={{margin: '0px auto'}} mode="indeterminate" size={0.6} />
					</div> : null
				}
			</Paper>
		);
	}
}

AutoLoadMoreList.propTypes = combinePropTypes(ContentList, {
	loading: PropTypes.bool.isRequired
});

export default AutoLoadMoreList;