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
			<div className='horizontalVerCenterRight'>
				<GnButton icon='angle-double-down' label={`(${props.skip}/${props.total}) Load more`} gnStyle='link'
					onClick={props.onLoadMore}/>
			</div>
		);
	}

	return (
		<ListGroup>
			<div className='horizontalVerCenterSpaceBetween' style={{padding: '10px 0px'}}>
				<span>{`${props.header} (${props.skip})`}</span>
				{props.onAddItem ? <GnButton icon='plus' label='Add' gnStyle='primary' onClick={props.onAddItem}/> : null}
			</div>
			<div style={props.scrollHeight ? {maxHeight: props.scrollHeight, overflow: 'auto'} : null}>
				{props.children}
				{bottomView}
			</div>
		</ListGroup>
	);
}

GnList.propTypes = {
	scrollHeight: PropTypes.number,
	header: PropTypes.string,
	total: PropTypes.number,
	skip: PropTypes.number,
	loading: PropTypes.bool,
	onLoadMore: PropTypes.func,
	onAddItem: PropTypes.func
};

export default GnList;