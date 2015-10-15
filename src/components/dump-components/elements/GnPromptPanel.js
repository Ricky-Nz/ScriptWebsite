import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Overlay, Popover } from 'react-bootstrap';

class GnPromptPanel extends Component {
	render() {
		return (
			<div style={{ position: 'relative' }}>
				<div ref='anchor'>
					{this.props.children}
				</div>
				<Overlay show={this.props.show} placement={this.props.placement} container={this}
					target={() => ReactDOM.findDOMNode(this.refs.anchor)}>
					<Popover id='popover'>
						<span style={{color: this.props.textColor}}>{this.props.help}</span>
					</Popover>
				</Overlay>
			</div>
		);
	}
}

GnPromptPanel.propTyles = {
	show: PropTypes.string.isRequired,
	help: PropTypes.string.isRequired,
	placement: PropTypes.string,
	textColor: PropTypes.string
};

GnPromptPanel.defaultProps = {
	placement: 'top',
	textColor: '#e51c23'
};

export default GnPromptPanel;

