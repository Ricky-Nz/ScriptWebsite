import React, { Component, PropTypes } from 'react';
import GnLabel from './GnLabel';

let GnIndexItem = props => {
	return (
		<div>
			<p><GnLabel gnStyle={props.indexStyle}>{props.index}</GnLabel>&nbsp;&nbsp;{props.primary}</p>
			{props.secondary}
		</div>
	);
}

GnIndexItem.propTypes = {
	index: PropTypes.number.isRequired,
	indexStyle: PropTypes.string,
	primary: PropTypes.node.isRequired,
	secondary: PropTypes.node
};

export default GnIndexItem;