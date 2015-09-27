import { SELECT_DASHBOARD_SECTION } from '../actions/dashboard-actions';

export default function (state = {}, action) {
	switch(action.type) {
		case SELECT_DASHBOARD_SECTION:
			return Object.assign({}, state, { selected: action.data });
		default:
			return state;
	}
}