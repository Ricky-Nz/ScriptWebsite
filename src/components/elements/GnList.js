import React, { Component, PropTypes } from 'react';
import { ListGroup, Well } from 'react-bootstrap';
import GnListItem from './GnListItem';
import GnIcon from './GnIcon';
import GnIconButton from './GnIconButton';
import { horCenterPadding, horVCenterRight, horVCenterSpaceBetween } from '../styles';

class GnList extends Component {
	render() {
		const spinnerStyle = {
			margin: '0px auto'
		};

		const listItems = this.props.datas.map((data, index) => {
			const config = this.props.itemConfig;
			
			return <GnListItem key={index}
						icon={this.props.itemIcon}
						primary={data[this.props.primaryKey]}
						secondary={data[this.props.secondaryKey]}
						menus={this.props.menus}
						onItemClicked={this.props.onItemClicked ? () => this.props.onItemClicked(data, index) : null}
						onMenuSelected={this.props.onMenuSelected}/>;
		});

		return (
			<div style={this.props.style}>
				<div style={horVCenterSpaceBetween}>
					<div>{this.props.header}</div>
					<GnIconButton bsStyle='primary' bsSize='small' icon='plus' label='Add'
						onClick={this.props.onCreateItem}/>
				</div>
				<ListGroup style={{maxHeight: 500, overflow: 'auto'}}>
					{listItems}
					{this.props.loading ? this.renderSpinner() : this.renderLoadMore()}					
				</ListGroup>
			</div>
		);
	}
	renderSpinner() {
		return <div style={horCenterPadding}><GnIcon icon='spinner' size='sm' active/></div>;
	}
	renderLoadMore() {
		if (this.props.loaded < this.props.total) {
			return (
				<div style={horVCenterRight}>
					<GnIconButton label={`(${this.props.datas.length}/${this.props.total}) Load more`}
						icon='angle-double-down' bsStyle='link' onClick={this.props.onLoadMore}/>
				</div>
			);
		}
	}
}

GnList.propTypes = {
	header: PropTypes.string,
	datas: PropTypes.array.isRequired,
	loaded: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	onCreateItem: PropTypes.func.isRequired,
	onLoadMore: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	// list item config
	itemIcon: PropTypes.string,
	primaryKey: PropTypes.string.isRequired,
	secondaryKey: PropTypes.string,
	menus: GnListItem.menus,
	onItemClicked: PropTypes.func
};

export default GnList;