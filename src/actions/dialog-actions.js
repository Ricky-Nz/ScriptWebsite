export const SHOW_DIALOG = 'SHOW_DIALOG';
export const DISMISS_DIALOG = 'DISMISS_DIALOG';

export function showDialog (label, data) {
    return {
        type: SHOW_DIALOG,
        label: label,
        data: data
    };
}

export function dismissDialog () {
	return {
		type: DISMISS_DIALOG
	};
}

