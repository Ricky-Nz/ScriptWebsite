export const clearPadding = {
	padding: 0
};

export const horWrap = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	flexWrap: 'wrap'
}

export const verHCenter = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
};

export const verHCenterClearPadding = Object.assign({}, verHCenter, clearPadding);

export const horizontal = {
	display: 'flex',
	flexDirection: 'row'
};

export const smHorFill = {
	padding: '0px 10px',
	flexGrow: 1
};

export const horVCenterRight = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'flex-end'
};

export const horVCenterSpaceBetween = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between'
};

export const horVCenter = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center'
};

export const horCenter = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center'
};

export const horCenterPadding = Object.assign({padding: 10}, horCenter);

export const verCenter = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
};

export const fixedRB = {
	position: 'fixed',
	bottom: 20,
	right: 20
};

export const absoluteRT = {
	position: 'absolute',
	top: 20,
	right: 20
};

export const padding = {
	padding: '0px 20px' 
};

export const errorStyle = {
	color: 'red',
	minHeight: 20
};

export const fillHeight = {
	height: '100%'
};

export const fillHeightScroll = {
	height: '100%',
	overflow: 'auto',
	padding: '2px 10px 150px 10px'
};

export const positionRelative = {
	position: 'relative'
};

export const positionAbsoluteTop = {
	position: 'absolute',
	top: 0
}

