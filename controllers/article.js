var article = require('../models/article.js'),
	auth = require('../lib/auth.js'),
	utils = require('../lib/utils.js'),
	consts = require('../lib/const.js');

module.exports = {
	/*
	* 路由监听
	* param express实例
	*/
	registerRoutes: function(app) {
		app.post('/article/add', this.add); 	//文章添加
		app.get('/article/:id', this.getById);	//根据id获取文章
		app.get('/article/all', this.all);		//查询所有文章
	},
	add: function(req, res){
		console.log(req.body);
		var info = req.body;
		auth.isLogined(req.cookies.account).then(function(){
			new article({
				title: info.title,
				key: info.key,
				description: info.description,
				cover: info.cover,
				content: info.text
			}).save(function(err){
					console.log(err);
				if(err){
					res.json({status: 'fail', errorMsg: '保存文章出错'});
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
