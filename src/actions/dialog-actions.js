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

const [FOLDERS, PARAMETERS, PACKAGES, REPORTS] = ['folders', 'parameters', 'packages', 'reports'];

export function showFormDialog (section, item) {
	switch(section) {
		case FOLDERS:
			return {
				label: section,
		    	show: true,
		        type: TOGGLE_DIALOG,
		        title: `${item ? 'Edit' : 'New'} Folder`,
		        itemId: item ? item.id : null,
		        size: 'medium',
		        submitText: 'Submit',
		        fields: [
		        	{ ref: 'title', icon: 'file-text-o', label: 'Title', placeholder: 'folder title', type: 'text', required: true}
		        ]
		    };
			break;
		case PARAMETERS:
			return {
				label: section,
		    	show: true,
		        type: TOGGLE_DIALOG,
		        title: `${item ? 'Edit' : 'New'} Parameter`,
		        itemId: item ? item.id : null,
		        size: 'medium',
		        submitText: 'Submit',
		        fields: [
		        	{ ref: 'key', icon: 'edit', label: 'Key', placeholder: 'parameter key', type: 'text', required: true},
		        	{ ref: 'value', icon: 'edit', label: 'Value', placeholder: 'parameter value', type: 'text'}
		        ]
		    };
			break;
		case PACKAGES:
			return {
				label: section,
		    	show: true,
		        type: TOGGLE_DIALOG,
		        title: 'Upload Package',
		        size: 'medium',
		        submitText: 'Submit',
		        fields: [
		        	{ ref: 'title', icon: 'edit', label: 'Title', placeholder: 'package title', type: 'text', required: true},
		        	{ ref: 'description', icon: 'edit', label: 'Description', placeholder: 'package description', type: 'text'},
		        	{ ref: 'file', icon: 'paperclip', label: 'Attachment', type: 'file', required: true}
		        ]
		    };
			break;
		case REPORTS:
			return {
				label: section,
		    	show: true,
		        type: TOGGLE_DIALOG,
		        title: 'Upload Report',
		        size: 'medium',
		        submitText: 'Submit',
		        fields: [
		        	{ ref: 'title', icon: 'edit', label: 'Title', placeholder: 'folder title', type: 'text', required: true},
		        	{ ref: 'file', icon: 'paperclip', label: 'Attachment', type: 'file', required: true}
		        ]
		    };
			break;
	}
}

export function dismissDialog () {
	return {
		show: false,
		type: TOGGLE_DIALOG
	};
}