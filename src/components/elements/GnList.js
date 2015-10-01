import React, { Component, PropTypes } from 'react';
import { ListGroup, Well } from 'react-bootstrap';
import GnListItem from './GnListItem';
import GnIcon from './GnIcon';
import GnIconButton from './GnIconButton';
import { horCenter, horVCenterRight, horVCenterSpaceBetween } from '../styles';

class GnList extends Component {
	render() {
		const spinnerStyle = {
			margin: '0px auto'
		};

		const listItems = this.props.datas.map((data, index) => {
			const config = this.props.itemConfig;
			
			return <GnListItem key={index} index={index}
						{...Object.assign({}, config, { primary: data[config.primary],
						secondary: data[config.secondary], selected: index == this.props.selectIndex })}
						onItemClicked={this.props.onItemClicked ? index => this.props.onItemClicked(index, this.props.datas[index]) : null}/>;
		});

		return (
			<div style={this.props.style}>
				<div style={Object.assign(horVCenterSpaceBetween, {padding: '5px 0px'})}>
					<div>{this.props.header}</div>
					<GnIconButton bsStyle='primary' bsSize='small' icon='plus' label='Add'
						onClick={this.props.onCreateItem}/>
				</div>
				{this.props.refreshing ? this.renderSpinner() : null}
				<Well style={{maxHeight: 400, overflow: 'auto', padding: 0, margin: 0}}>
					<ListGroup style={{margin: 0}}>
						{listItems}
						{this.props.loading ? this.renderSpinner() : this.renderLoadMore()}
					</ListGroup>
				</Well>
			</div>
		);
	}
	renderSpinner() {
		return <div style={horCenter}><GnIcon icon='spinner' size='sm' active/></div>;
	}
	renderLoadMore() {
		if (this.props.total <= this.props.datas.length) {
			return null;
		}
		
		return (
			<div style={horVCenterRight}>
				<GnIconButton label='Load more' icon='angle-double-down' onClick={this.props.onLoadMore}/>
			</div>
		);
	}
}

GnList.propTypes = {
	header: PropTypes.string,
	datas: PropTypes.array.isRequired,
	total: PropTypes.number.isRequired,
	itemConfig: PropTypes.shape(GnListItem.propTypes).isRequired,
	onCreateItem: PropTypes.func.isRequired,
	onLoadMore: PropTypes.func.isRequired,
	onItemClicked: PropTypes.func,
	refreshing: PropTypes.bool,
	loading: PropTypes.bool,
	selectIndex: PropTypes.number
};

export default GnList;