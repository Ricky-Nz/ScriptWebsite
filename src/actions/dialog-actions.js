export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

export function showLoginDialog (redirect) {
    return {
    	show: true,
        type: TOGGLE_DIALOG,
        title: 'User Login',
        size: 'small',
        fields: [
            { ref: 'email', icon: 'user', label: 'Username', initialValue: 'ruiqi.newzealand@gmail.com',
            	placeholder: 'login id', type: 'email', required: true },
            { ref: 'password', icon:'key', label: 'Password', initialValue: '1234',
            	placeholder: 'login password', type: 'password', required: true },
        ],
        buttons: [
        	{ ref: 'go-register', icon: 'user-plus', label: 'Register' },
        	{ ref: 'login', icon: 'send', label: 'Login', bsStyle: 'primary', args: redirect, collectData: true }
        ]
    };
}

export function showRegisterDialog () {
    return {
    	show: true,
        type: TOGGLE_DIALOG,
        title: 'User Register',
        size: 'small',
        fields: [
            { ref: 'email', icon: 'user', label: 'Username',
            	placeholder: 'login id', type: 'email', required: true },
            { ref: 'password', icon:'key', label: 'Password',
            	placeholder: 'login password', type: 'password', required: true },
            { ref: 'confirm-password', icon:'key', label: 'Confirm Password',
            	placeholder: 're-enter login password', type: 'password', required: true }
        ],
        buttons: [
        	{ ref: 'cancel', label: 'Cancel' },
        	{ ref: 'register', icon: 'user-plus', label: 'Register', bsStyle: 'primary', collectData: true }
        ]
    };
}

export function showParameterDialog (data, del) {
	let config = {
    	show: true,
        type: TOGGLE_DIALOG,
        size: 'medium',
        itemId: data.id,
	};

	if (del) {
		Object.assign(config, {
			title: `Are you sure you want to delete parameter ${data.key}?`,
	        buttons: [
	        	{ ref: 'cancel', label: 'Cancel' },
	        	{ ref: 'delete-parameter', icon: 'times', label: 'Delete', bsStyle: 'danger' }
	        ]
    	});
	} else {
		Object.assign(config, {
	        title: `${data.id ? 'Edit' : 'New'} Parameter`,
	        fields: [
	        	{ ref: 'key', icon: 'edit', label: 'Key', placeholder: 'parameter key',
	        		type: 'text', required: true, initialValue: data['key'],
	        		disabled: data.id ? true : false },
	        	{ ref: 'value', icon: 'edit', label: 'Value', placeholder: 'parameter value',
	        		type: 'text', initialValue: data['value'] }
	        ],
	        buttons: [
	        	{ ref: 'cancel', label: 'Cancel' },
	        	{ ref: data.id ? 'update-parameter' : 'create-parameter', icon: 'check', label: 'Submit', bsStyle: 'primary', collectData: true }
	        ]
		});
	}

	return config;
}

export function showPackageDialog (data, del) {
	let config = {
    	show: true,
        type: TOGGLE_DIALOG,
        size: 'medium',
        itemId: data.id,
	};

	if (del) {
		Object.assign(config, {
			title: `Are you sure you want to delete package ${data.title}?`,
	        buttons: [
	        	{ ref: 'cancel', label: 'Cancel' },
	        	{ ref: 'delete-package', icon: 'times', label: 'Delete', bsStyle: 'danger' }
	        ]
    	});
	} else {
		Object.assign(config, {
	        title: 'Upload Package',
	        fields: [
	        	{ ref: 'title', icon: 'edit', label: 'Title', placeholder: 'package title',
	        		type: 'text', required: true },
	        	{ ref: 'description', icon: 'edit', label: 'Description', placeholder: 'package description',
	        		type: 'text' },
	        	{ ref: 'file', icon: 'paperclip', label: 'Attachment', type: 'file',
	        		required: true }
	        ],
	        buttons: [
	        	{ ref: 'cancel', label: 'Cancel' },
	        	{ ref: 'create-package', icon: 'check', label: 'Submit', bsStyle: 'primary', collectData: true }
	        ]
		});
	}

	return config;
}

export function showReportDialog (data, del) {
	let config = {
    	show: true,
        type: TOGGLE_DIALOG,
        size: 'medium',
        itemId: data.id,
	};

	if (del) {
		Object.assign(config, {
			title: `Are you sure you want to delete report ${data.tags}-${data.date}?`,
	        buttons: [
	        	{ ref: 'cancel', label: 'Cancel' },
	        	{ ref: 'delete-report', icon: 'times', label: 'Delete', bsStyle: 'danger' }
	        ]
    	});
	} else {
		Object.assign(config, {
	        title: 'Upload Report',
	        fields: [
	        	{ ref: 'title', icon: 'edit', label: 'Title', placeholder: 'folder title',
	        		type: 'text', required: true },
	        	{ ref: 'file', icon: 'paperclip', label: 'Attachment', type: 'file',
	        		required: true }
	        ],
	        buttons: [
	        	{ ref: 'cancel', label: 'Cancel' },
	        	{ ref: 'create-report', icon: 'check', label: 'Submit', bsStyle: 'primary', collectData: true }
	        ]
		});
	}

	return config;
}

export function showScriptDialog (data, del) {
	let config = {
    	show: true,
        type: TOGGLE_DIALOG,
        size: 'medium',
        itemId: data.id,
	};

	if (del) {
		Object.assign(config, {
			title: `Are you sure you want to delete script ${data.title}?`,
	        buttons: [
	        	{ ref: 'cancel', label: 'Cancel' },
	        	{ ref: 'delete-script', icon: 'times', label: 'Delete', bsStyle: 'danger' }
	        ]
    	});
	}

	return config;
}

export function dismissDialog () {
	return {
		show: false,
		type: TOGGLE_DIALOG
	};
}

