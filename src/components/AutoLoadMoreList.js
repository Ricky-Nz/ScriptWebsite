import React, { Component, PropTypes } from 'react';
import { CircularProgress } from 'material-ui';
import ContentList from './ContentList';
import { horCenter } from '../styles';
import { combinePropTypes, extratProps } from '../utils';

class AutoLoadMoreList extends Component {
	render() {
		return (
			<div style={this.props.style}>
				<ContentList {...extratProps(this.props, ContentList)}/>
				{this.props.loading ?
					<div style={{...horCenter, paddingBottom: 10}}>
						<CircularProgress style={{margin: '0px auto'}} mode="indeterminate" size={0.6} />
					</div> : null
				}
			</div>
		);
	}
}

AutoLoadMoreList.propTypes = combinePropTypes(ContentList, {
	loading: PropTypes.bool.isRequired
});

export default AutoLoadMoreList;