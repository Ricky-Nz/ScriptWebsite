var obja = {a: 1, b: { c: 2}};
var objb = {a: 1, b: { d: 3}};

var _ = require('underscore');
console.log(_.extend(objb, obja));