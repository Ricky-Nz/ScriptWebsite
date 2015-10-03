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

export function showDeleteDialog (section, title, id) {
	return {
		title: `Are you sure you want to delete ${title}`,
		label: section,
    	show: true,
        type: TOGGLE_DIALOG,
        submitText: 'Confirm',
        itemId: id,
        size: 'small',
        submitStyle: 'danger'
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
		        	{ ref: 'title', icon: 'file-text-o', label: 'Title', placeholder: 'folder title',
		        		type: 'text', required: true, initialValue: item ? item['title'] : null}
		        ]
		    });
		    break;
		case 'parameters':
			Object.assign(dialogConfig, {
		        title: `${item ? 'Edit' : 'New'} Parameter`,
		        fields: [
		        	{ ref: 'key', icon: 'edit', label: 'Key', placeholder: 'parameter key',
		        		type: 'text', required: true, initialValue: item ? item['key'] : null},
		        	{ ref: 'value', icon: 'edit', label: 'Value', placeholder: 'parameter value',
		        		type: 'text', initialValue: item ? item['value'] : null}
		        ]
		    });
		    break;
		case 'packages':
			Object.assign(dialogConfig, {
		        title: 'Upload Package',
		        fields: [
		        	{ ref: 'title', icon: 'edit', label: 'Title', placeholder: 'package title',
		        		type: 'text', required: true, initialValue: item ? item['title'] : null},
		        	{ ref: 'description', icon: 'edit', label: 'Description', placeholder: 'package description',
		        		type: 'text', initialValue: item ? item['description'] : null},
		        	{ ref: 'file', icon: 'paperclip', label: 'Attachment', type: 'file',
		        		required: true, initialValue: item ? item['description'] : null}
		        ]
		    });
		    break;
		case 'reports':
			Object.assign(dialogConfig, {
		        title: 'Upload Report',
		        fields: [
		        	{ ref: 'title', icon: 'edit', label: 'Title', placeholder: 'folder title',
		        		type: 'text', required: true, initialValue: item ? item['title'] : null},
		        	{ ref: 'file', icon: 'paperclip', label: 'Attachment', type: 'file',
		        		required: true, initialValue: item ? item['file'] : null}
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