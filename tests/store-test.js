var objectA = {a: 1, b: 2, c:3};
var _ = require('underscore');

_.map(objectA, function (arg1, arg2) {
	console.log(arg1);
	console.log(arg2);
})