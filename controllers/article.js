var viewsPath = 'admin/',
	article = require('../models/article.js'),
	auth = require('../lib/auth.js'),
	consts = require('../lib/const.js');

module.exports = {
	registerRoutes: function(app) {
		app.post('/article/add', this.add);
	},
	add: function(req, res){
		console.log(req.body);
	}
	
};
