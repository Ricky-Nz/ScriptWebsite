import { UPDATE_TAG_SELECTION } from '../actions/app-actions';
import { GET_TAGS } from '../actions/crud-actions';
import _ from 'underscore';

export default function (tags = [], action) {
	switch(action.type) {
		case GET_TAGS: {
			if (action.finished && !action.error) {
				return action.result.tags.map(tag => {
					let checked = true;
					const target = _.find(tags, currentTag => currentTag.ref == tag);
					if (target) {
						checked = target.checked;
					}

					return {
						ref: tag,
						checked: checked
					};
				});
			} else {
				return tags;
			}
		}
		case UPDATE_TAG_SELECTION:
			return action.data;
		default:
			return tags;
	}
}