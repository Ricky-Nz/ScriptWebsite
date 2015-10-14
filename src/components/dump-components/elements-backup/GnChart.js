import React, { PropTypes } from 'react';
import { PieChart } from 'react-d3';

let GnChart = props => {
	const redius = props.width / 4;

	return (
		<PieChart data={pieData} width={props.width} height={props.height} radius={redius}
			sectorBorderColor='white' colors={index => props[index].color}/>
	);
}

GnChart.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	datas: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		color: PropTypes.string.isRequired
	})).isRequired
}

export default GnChart;//'#4caf50' : '#e51c23'