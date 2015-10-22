import React, { Component, PropTypes } from 'react';
import GnLabel from './GnLabel';
import GnButton from './GnButton';

let GnIndexItem = props => {
	return (
		<div>
			<div className='horizontalVerCenterSpaceBetween'>
				<div className='horizontalVerCenter'>
					<GnLabel gnStyle={props.indexStyle}>{props.index}</GnLabel>&nbsp;&nbsp;{props.primary}
				</div>
				{props.rightIcon && <GnButton icon={props.rightIcon} gnStyle='link' onClick={props.onIconClicked}/>}
			</div>
			{props.secondary}
		</div>
	);
}

GnIndexItem.propTypes = {
	index: PropTypes.number.isRequired,
	indexStyle: PropTypes.string,
	primary: PropTypes.node.isRequired,
	secondary: PropTypes.node,
	rightIcon: PropTypes.string,
	onIconClicked: PropTypes.func
};

export default GnIndexItem;