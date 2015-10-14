import React, { PropTypes } from 'react';
import GnButton from './GnButton';
import GnLabel from './GnLabel';

let GnDynamicList = props => {
	const listItems = props.children ? props.children.map((item, index) => (
		<div key={index}>
			<div className='horizontalVerCenterSpaceBetween'>
				<GnLabel bsSize='small'>{index + 1}</GnLabel>
				<span>
					<GnButton bsSize='small' gnStyle='link' icon='arrow-up'
						label='Insert' onClick={() => props.onUpdate(index)}/>
					<GnButton bsSize='small' gnStyle='link' icon='arrow-down'
						label='Remove' onClick={() => props.onUpdate(index, true)}/>
				</span>
			</div>
			{item}
		</div>
	)) : null;

	return (
		<div>
			<p>{props.header}</p>
			{listItems}
			<div className='horizontalVerCenterRight'>
				<GnButton bsSize='small' gnStyle='link' icon='arrow-up' label='Append'
					onClick={() => props.onUpdate(props.children ? props.children.length : 0)}/>
			</div>
		</div>
	);
};

GnDynamicList.propTypes = {
	header: PropTypes.string,
	onUpdate: PropTypes.func.isRequired
};

export default GnDynamicList;