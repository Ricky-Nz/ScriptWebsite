import React, { Component, PropTypes } from 'react';
import GnListItem from './GnListItem';
import GnIcon from './GnIcon';

class GnList extends Component {
	render() {
		const spinnerStyle = {
			margin: '0px auto'
		};

		const listItems = this.props.datas ? this.props.datas.map((data, index) => (
			<GnListItem key={index} primary={data[this.props.primaryKey]}
				secondary={data[this.props.secondaryKey]}/>
		)) : null;

		return (
			<div style={this.props.style}>
				<p>{this.props.header}</p>
				{this.props.refreshing ?
					<p><GnIcon style={spinnerStyle} icon='spinner' size='sm' active/></p> : null}
				<ListGroup>
					{listItems}
				</ListGroup>
				{this.props.loading ?
					<p><GnIcon style={spinnerStyle} icon='spinner' size='sm' active/></p> : null}
			</div>
		);
	}
}

GnList.propTypes = {
	header: PropTypes.string.isRequired,
	datas: PropTypes.array,
	primaryKey: PropTypes.string.isRequired,
	secondaryKey: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	refreshing: PropTypes.bool
};

export default GnList;