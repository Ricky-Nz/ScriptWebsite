import React, { Component, PropTypes } from 'react';
import GnButton from './GnButton';
import GnInput from './GnInput';

class GnTagsbar extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.tags !== this.props.tags) {
			this.setState({pennding: ''});
		}
	}
	render() {
		const tagStyle = { margin: 5 };
		const tagItems = this.props.tags ? this.props.tags.map((tag, index) => (
			<GnButton key={index} style={tagStyle} label={tag} gnSize='xs'
				icon='times' gnStyle={this.props.gnStyle} onClick={() => this.props.onDeleteItem(index)}/>
		)) : null;

		return (
			<div className='horizontalVercenterWrap'>
				{tagItems}
				<GnInput ref='tagInput' style={{maxWidth: 150}} type='text'
					placeholder='new tag' icon='tag' help={this.props.help}
					value={this.state ? this.state.pennding : null}
					onChange={e => this.setState({pennding: e.target.value})}
					onKeyPress={e => {
						if (e.which == 13 && e.target.value) {
							if (!this.props.tags || this.props.tags.indexOf(e.target.value) < 0) {
								this.props.onAddItem(e.target.value);
							} else {
								this.setState({pennding: ''});
							}
						}
					}}/>
			</div>
		);
	}
	validate() {
		if (this.props.required && (!this.props.tags || this.props.tags.length == 0)) {
			this.refs.tagInput.showError();
			return false;
		}

		return true;
	}
}

GnTagsbar.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string),
	gnStyle: PropTypes.string,
	required: PropTypes.bool,
	help: PropTypes.string,
	onDeleteItem: PropTypes.func.isRequired,
	onAddItem: PropTypes.func.isRequired
}

GnTagsbar.defaultProps = {
	gnStyle: 'success'
}

export default GnTagsbar;