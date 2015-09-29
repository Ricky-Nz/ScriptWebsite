export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

export function openLoginDialog () {
    return {
    	show: true,
        type: TOGGLE_DIALOG,
        title: 'User Login',
        size: 'small',
        submitText: 'Login',
        fields: [
            { ref: 'email', icon: 'user', label: 'Username', initialValue: 'ruiqi.newzealand@gmail.com',
            	placeholder: 'login id', type: 'email', required: true },
            { ref: 'password', icon:'key', label: 'Password', initialValue: '1234',
            	placeholder: 'login password', type: 'password', required: true },
        ]
    };
}

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

export function showEditParameterDialog (item) {
	let fields = [
		{ref: 'key', hint: 'parameter key', label: 'Key', type: 'text', required: true},
		{ref: 'value', hint: 'parameter value', label: 'Value', type: 'text', required: false}
	];
	fields.forEach(field => field.value = item[field.ref]);

	return {
		type: SHOW_DIALOG,
		title: 'Edit Parameter',
		id: item.id,
		fields: fields
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

export function showEditFolderDialog (item) {
	let fields = [
		{ref: 'title', hint: 'folder title', label: 'Title', type: 'text', required: true}
	];
	fields.forEach(field => field.value = item[field.ref]);

	return {
		type: SHOW_DIALOG,
		title: 'Edit Folder',
		id: item.id,
		fields: fields
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
		show: false,
		type: TOGGLE_DIALOG
	};
}