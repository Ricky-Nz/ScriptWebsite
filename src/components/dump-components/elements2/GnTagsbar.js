import React, { PropTypes } from 'react';
import GnButton from './GnButton';

let GnTagsbar = props => {
	const tagStyle = { margin: 2 };
	const tagItems = props.tags.map((tag, index) => (
		<GnButton key={index} style={tagStyle} label={tag} bsStyle={props.gnStyle} bsSize='xs'
			icon='times' onClick={() => props.onDeleteItem(index)}/>
	));

	return (
		<div className='horizontalVercenterWrap'>
			{tagItems}
		</div>
	);
}

GnTagsbar.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	gnStyle: PropTypes.string,
	onDeleteItem: PropTypes.func
}

GnTagsbar.defaultProps = {
	gnStyle: 'success'
}

export default GnTagsbar;