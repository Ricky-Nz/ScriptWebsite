import React, { PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';

const GnListItem = props => {
	const { leftView, primary, secondary, rightView, ...itemProps } = props;

	return (
		<ListGroupItem href='#' {...itemProps}>
			<div className='horizontalVerCenter'>
				{leftView}
				<div className='itemGrow' style={{padding: '0px 10px'}}>
					<div className='fontPrimary'>{primary}</div>
					<div className='fontSecondary'>{secondary}</div>
				</div>
				{rightView}
			</div>
		</ListGroupItem>
	);
}

GnListItem.propTypes = {
	leftView: PropTypes.node,
	primary: PropTypes.string.isRequired,
	secondary: PropTypes.string,
	rightView: PropTypes.node
};

export default GnListItem;