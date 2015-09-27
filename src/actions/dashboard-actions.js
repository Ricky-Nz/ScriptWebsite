export const SELECT_DASHBOARD_SECTION = 'SELECT_DASHBOARD_SECTION';

export function selectSection(section) {
	return {
		type: SELECT_DASHBOARD_SECTION,
		data: section
	};
}