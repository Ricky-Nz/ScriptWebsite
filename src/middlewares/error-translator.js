export default function (error) {
	if (!error) return null;

	switch(error.status) {
		case 401: return 'Username or password is not correct';
		default:
			return error.message;
	}
}