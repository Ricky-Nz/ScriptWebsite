import React, { PropTypes } from 'react';
import { DropdownButton, SplitButton, MenuItem } from 'react-bootstrap';
import GnIcon from './GnIcon';
import _ from 'underscore';

const GnDropdownButton = props => {
	const { split, options, title, onSelect, ...buttonProps } = props;
	const onSelectItem = (e, eventKey) => onSelect(eventKey);
	const menuItems = options.map((option, index) => (
		<MenuItem key={index} eventKey={option.ref}>
			{option.icon ? <span><GnIcon icon={option.icon}/>{option.name}</span> : option.name}
		</MenuItem>
	));

	if (props.split) {
		return (
			<SplitButton {...buttonProps} title={title}
				onSelect={onSelectItem} onClick={() => {
					if (options && options.length > 0) {
						onItemSelect(options[0].ref);
					}
				}}>
				{menuItems}
			</SplitButton>
		);
	} else {
		return (
			<DropdownButton {...buttonProps} title={title} onSelect={onSelectItem}>
				{menuItems}
			</DropdownButton>
		);
	}
};

GnDropdownButton.propTypes = {
	split: PropTypes.bool,
	title: PropTypes.node,
	options: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		ref: PropTypes.string.isRequired,
		icon: PropTypes.string
	})).isRequired,
	onSelect: PropTypes.func.isRequired
};

export default GnDropdownButton;


