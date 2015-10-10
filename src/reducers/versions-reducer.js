import { GET_VERSIONS } from '../actions/app-actions';

export default function (versions = [], action) {
	if (action.type == GET_VERSIONS && action.finished) {
		return action.result.versions;
	} else {
		return versions;
	}
}