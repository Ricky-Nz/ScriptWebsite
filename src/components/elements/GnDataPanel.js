import React, { Component, PropTypes } from 'react';
import GnIcon from './GnIcon';
import { horizontal } from '../styles';

class GnDataPanel extends Component {
	render() {
		const props = this.props;
		const dataItems = props.datas.map((data, index) => (
			<p><GnIcon icon={data.icon}/>&nbsp;&nbsp;{data.label}:&nbsp;&nbsp;{data.content}</p>
		));
		const dataContent = (
			<div>
				{dataItems}
			</div>
		);

		if (props.rightPanel) {
			return (
				<div style={horizontal}>
					{dataContent}
					{props.rightPanel}
				</div>
			);
		} else {
			return dataContent;
		}
	}
}

GnDataPanel.propTypes = {
	datas: PropTypes.arrayOf(PropTypes.shape({
		icon: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		content: PropTypes.node.isRequired
	})).isRequired,
	rightPanel: PropTypes.node
};

export default GnDataPanel;