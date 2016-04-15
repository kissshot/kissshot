var article = require('../models/article.js'),
	auth = require('../lib/auth.js'),
	multer  = require('multer'),
	utils = require('../lib/utils.js');

module.exports = {
	registerRoutes: function(app) {
		app.post('/article/add', this.add);
		app.get('/article/:id', this.getById);
		app.get('/article/all', this.all);
	},
	add: function(req, res){
		console.log(req.body);
		var info = req.body;
		auth.isLogined(req).then(function(){
			new article({
				title: info.title,
				key: info.key,
				description: info.description,
				cover: info.cover,
				content: info.text
			}).save(function(err){
					console.log(err);
				if(err){
					res.json({status: 'fail', errorMsg: '发表失败'});
				}else{
					res.json({status: 'success'});
				}

			});

		}).catch(function(){
			res.clearCookie('account');
			res.redirect('/admin/login');
		});
	},
	getById: function(req, res){
		article.findById(req.params.id, function(err, a){
			var time = utils.getTime('yy-mm-dd', new Date(a.lastUpdate));
			res.render('blog/article', {
				id: a.id,
				title: a.title,
				content: a.content,
				key: a.key,
				time: time
			})
		});
	},
	all: function(req, res){
		article.find(function(err, articles){
			articles.map(function(article){

			})
			res.json(articles);
		})
	}
	
};
