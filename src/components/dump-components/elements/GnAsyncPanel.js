import React, { PropTypes } from 'react';
import GnIcon from './GnIcon';

let GnAsyncPanel = props => {
	if (props.loading) {
		return (
			<div className='horizontalCenter content'>
				<GnIcon icon='spinner' active/>
			</div>
		);
	} else {
		return props.children ? props.children : <div/>;
	}
}

GnAsyncPanel.propTypes = {
	loading: PropTypes.bool
}

export default GnAsyncPanel;