export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

export function showLoginDialog () {
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

export function showFormDialog (section, item) {
	let dialogConfig = {
		label: section,
    	show: true,
        type: TOGGLE_DIALOG,
        submitText: 'Submit',
        itemId: item ? item.id : null,
        size: 'medium'
	};

	switch(section) {
		case 'folders':
			Object.assign(dialogConfig, {
		        title: `${item ? 'Edit' : 'New'} Folder`,
		        fields: [
		        	{ ref: 'title', icon: 'file-text-o', label: 'Title', placeholder: 'folder title', type: 'text', required: true}
		        ]
		    });
		    break;
		case 'parameters':
			Object.assign(dialogConfig, {
		        title: `${item ? 'Edit' : 'New'} Parameter`,
		        fields: [
		        	{ ref: 'key', icon: 'edit', label: 'Key', placeholder: 'parameter key', type: 'text', required: true},
		        	{ ref: 'value', icon: 'edit', label: 'Value', placeholder: 'parameter value', type: 'text'}
		        ]
		    });
		    break;
		case 'packages':
			Object.assign(dialogConfig, {
		        title: 'Upload Package',
		        fields: [
		        	{ ref: 'title', icon: 'edit', label: 'Title', placeholder: 'package title', type: 'text', required: true},
		        	{ ref: 'description', icon: 'edit', label: 'Description', placeholder: 'package description', type: 'text'},
		        	{ ref: 'file', icon: 'paperclip', label: 'Attachment', type: 'file', required: true}
		        ]
		    });
		    break;
		case 'reports':
			Object.assign(dialogConfig, {
		        title: 'Upload Report',
		        fields: [
		        	{ ref: 'title', icon: 'edit', label: 'Title', placeholder: 'folder title', type: 'text', required: true},
		        	{ ref: 'file', icon: 'paperclip', label: 'Attachment', type: 'file', required: true}
		        ]
		    });
		    break;
	}

	return dialogConfig;
}

export function dismissDialog () {
	return {
		show: false,
		type: TOGGLE_DIALOG
	};
}