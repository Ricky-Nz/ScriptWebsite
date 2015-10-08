var obja = {a: 1, b: { c: 2}};
var objb = {a: 1, b: { d: 3}};

var _ = require('underscore');
var resutl = _.countBy([1, 1, 1, 1, 1], function(num) {
  return num % 2 == 0 ? 'even': 'odd';
});
console.log(resutl);
