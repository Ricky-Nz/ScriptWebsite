import React, { PropTypes } from 'react';
import GnIcon from './GnIcon';

let GnIconItem = props => (
	<p><GnIcon className={props.iconClass} icon={props.icon}/>&nbsp;&nbsp;{props.content}</p>
);

GnIconItem.propTypes = {
	icon: PropTypes.string,
	iconClass: PropTypes.string,
	content: PropTypes.node
};

export default GnIconItem;