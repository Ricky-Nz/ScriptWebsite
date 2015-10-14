import React, { PropTypes } from 'react';
import { DropdownButton, SplitButton, MenuItem } from 'react-bootstrap';
import GnIcon from './GnIcon';
import _ from 'underscore';

const GnDropdownButton = props => {
	const { split, options, title, onSelect, gnSize, ...buttonProps } = props;
	const onSelectItem = (e, eventKey) => onSelect(eventKey);
	const menuItems = options.map((option, index) => (
		<MenuItem key={index} eventKey={option.ref ? option.ref : option.name}>
			{option.icon ? <span><GnIcon icon={option.icon}/>{option.name}</span> : option.name}
		</MenuItem>
	));

	if (props.split) {
		return (
			<SplitButton {...buttonProps} bsSize={gnSize} title={title}
				onSelect={onSelectItem} onClick={() => {
					if (options && options.length > 0) {
						const firstItem = options[0];
						onSelect(firstItem.ref ? firstItem.ref : firstItem.name);
					}
				}}>
				{menuItems}
			</SplitButton>
		);
	} else {
		return (
			<DropdownButton id='dropdown' {...buttonProps} bsSize={gnSize} title={title} onSelect={onSelectItem}>
				{menuItems}
			</DropdownButton>
		);
	}
};

GnDropdownButton.propTypes = {
	split: PropTypes.bool,
	title: PropTypes.node,
	gnSize: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		ref: PropTypes.string,
		icon: PropTypes.string
	})).isRequired,
	onSelect: PropTypes.func.isRequired
};

GnDropdownButton.defaultProps = {
	gnSize: 'small'
};

export default GnDropdownButton;


