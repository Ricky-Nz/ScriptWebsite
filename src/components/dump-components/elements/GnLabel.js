import React, { PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import { gnStyles } from './common'; 

let GnLabel = props => {
	return <Label bsStyle={props.gnStyle}>{props.children}</Label>
}

GnLabel.propTypes = {
	gnStyle: PropTypes.oneOf(gnStyles)
}

export default GnLabel;