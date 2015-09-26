var agent = require('superagent');

var request = agent('POST', 'http://localhost:3000/api/Testers/login')
	.send({email: 'sdfsdf', password: 'sdfsdf'})
	.accept('json')
    .timeout(10000)
    .end(function (err, response) {
    	console.log(response);
    });