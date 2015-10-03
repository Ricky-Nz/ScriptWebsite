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
						showEditBtn={this.props.showEditBtn}
						showDeleteBtn={this.props.showDeleteBtn}
						onItemClicked={this.props.onItemClicked ? () => this.props.onItemClicked(data) : null}
						onEditItem={this.props.onEditItem ? () => this.props.onEditItem(data) : null}
						onDeleteItem={this.props.onDeleteItem ? () => this.props.onDeleteItem(data) : null}
						onMenuSelected={this.props.onMenuSelected}/>;
		});

		return (
			<div style={this.props.style}>
				<div style={Object.assign({padding: '10px 0px'}, horVCenterSpaceBetween)}>
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
					<GnIconButton label={`(${this.props.loaded}/${this.props.total}) Load more`}
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
	showEditBtn: PropTypes.bool,
	showDeleteBtn: PropTypes.bool,
	onItemClicked: PropTypes.func,
	onEditItem: PropTypes.func,
	onDeleteItem: PropTypes.func
};

export default GnList;