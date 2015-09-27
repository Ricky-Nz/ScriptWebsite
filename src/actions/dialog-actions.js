export const SHOW_DIALOG = 'SHOW_DIALOG';
export const DISMISS_DIALOG = 'DISMISS_DIALOG';

export function showCreateParameterDialog () {
	return {
		type: SHOW_DIALOG,
		title: 'New Parameter',
		fields: [
			{ref: 'key', hint: 'parameter key', label: 'Key', type: 'text', required: true},
			{ref: 'value', hint: 'parameter value', label: 'Value', type: 'text', required: false}
		]
	};
}

export function showCreateFolderDialog () {
	return {
		type: SHOW_DIALOG,
		title: 'New Folder',
		fields: [
			{ref: 'title', hint: 'folder title', label: 'Title', type: 'text', required: true}
		]
	};
}

export function showCreatePackageDialog () {
	return {
		type: SHOW_DIALOG,
		title: 'New Package',
		fields: [
			{ref: 'title', hint: 'package title', label: 'Title', type: 'text', required: true},
			{ref: 'description', hint: 'package description', label: 'Description', type: 'text', required: false},
			{ref: 'file', type: 'file', required: true}
		]
	};
}

export function showCreateReportDialog () {
	return {
		type: SHOW_DIALOG,
		title: 'New Report',
		fields: [
			{ref: 'title', hint: 'report title', label: 'Title', type: 'text', required: true},
			{ref: 'file', type: 'file', required: true}
		]
	};
}

export function dismissDialog () {
	return {
		type: DISMISS_DIALOG
	};
}