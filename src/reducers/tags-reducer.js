import { GET_TAGS } from '../actions/crud-actions';
import _ from 'underscore';

export default function (tags = [], action) {
	switch(action.type) {
		case GET_TAGS:
			if (action.finished && !action.error) {
				return action.result.tags;
			} else {
				return tags;
			}
		default:
			return tags;
	}
}