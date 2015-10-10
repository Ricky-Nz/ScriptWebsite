import { SHOW_DIALOG, DISMISS_DIALOG } from '../actions/dialog-actions';
import { CHANGE_SECTION } from '../actions/app-actions';

export default function (select = null, action) {
	switch(action.type) {
		case SHOW_DIALOG:
			if (action.data) {
				return Object.assign({}, action.data);
			} else {
				return null;
			}
		case DISMISS_DIALOG:
			return null;
		case CHANGE_SECTION:
			return null;
		default:
			return select;
	}
}