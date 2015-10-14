import React, { PropTypes } from 'react';
import { ListGroup } from 'react-bootstrap';
import GnIcon from './GnIcon';
import GnButton from './GnButton';

const GnList = props => {
	let bottomView;
	if (props.loading) {
		bottomView = (
			<div className='horizontalCenter content'>
				<GnIcon icon='spinner' active/>
			</div>
		);
	} else if (props.skip < props.total) {
		bottomView = (
			<div className={horizontalVerCenterRight}>
				<GnButton icon='angle-double-down' label='load more'
					onClick={props.onLoadMore}/>
			</div>
		);
	}

	return (
		<ListGroup>
			{props.children}
			{bottomView}
		</ListGroup>
	);
}

GnList.propTypes = {
	total: PropTypes.number,
	skip: PropTypes.number,
	loading: PropTypes.bool,
	onLoadMore: PropTypes.func
};

export default GnList;