import { LOGIN, LOGOUT, REGISTER, GET_TAGS, CHANGE_SELECTION, UPDATE_TAG_SELECTION } from '../actions/user-actions';
import _ from 'underscore';

export default function (user = {}, action) {
	switch(action.type) {
		case LOGIN:
		case LOGOUT:
		case REGISTER: {
			if (action.finished) {
	            return Object.assign({
	            	processing: false,
	            	error: action.error,
	           		redirect: action.args
	           	}, action.result);
			} else {
				return { processing: true, error: null };
			}
		}
		case GET_TAGS: {
			if (action.finished && !action.error) {
				const newTags = action.result.tags.map(tag => {
					let checked = true;
					if (user.tags) {
						const target = _.find(user.tags, currentTag => currentTag.ref == tag);
						if (target) {
							checked = target.checked;
						}
					}

					return {
						ref: tag,
						checked: checked
					};
				});

				return updateUser(user, newTags, user.selection);
			} else {
				return user;
			}
		}
		case UPDATE_TAG_SELECTION: {
			const update = action.data;
			let updateTags;
			if (update.all) {
				updateTags = user.tags.map(tag => ({ ref: tag.ref, checked: true }));
			} else if (update.clear) {
				updateTags = user.tags.map(tag => ({ ref: tag.ref, checked: false }));
			} else if (update.single) {
				updateTags = user.tags.map(tag => ({ ref: tag.ref, checked: tag.ref == update.ref }));
			} else {
				const index = _.findIndex(user.tags, tag => tag.ref == update.ref);
				updateTags = [...user.tags.slice(0, index), { ref: update.ref, checked: update.check }, ...user.tags.slice(index + 1)]
			}

			return updateUser(user, updateTags, user.selection);
		}
		case CHANGE_SELECTION: {
			return updateUser(user, user.tags, action.data);
		}
		default: {
			return user;
		}
	}
}

function updateUser (user, tags, selection) {
	let newSelection = {
		where: {
			tags: {
				inq: tags ? _.pluck(_.filter(tags, tag => tag.checked), 'ref') : []
			}
		},
		skip: 0
	};

	if (selection) {
		newSelection = Object.assign({}, newSelection, selection,
			selection.where ? { where: Object.assign({}, selection.where, newSelection.where)} : null);
	}

	return Object.assign({}, user, { tags: tags, selection: newSelection });
}





