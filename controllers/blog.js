var viewsPath = 'blog/',
	article = require('../models/article.js'),
	utils = require('../lib/utils.js');
module.exports = {
	registerRoutes: function(app) {
		app.get('/', this.main);
	},
	main: function(req, res, next){
		article.find(function(err, articles){

			var articles = articles.map(function(article){
				var time = utils.getTime('yy-mm-dd', new Date(article.lastUpdate));
				console.log(time+'!!!!!');
				return {
					id: article.id,
					title: article.title,
					content: article.content,
					key: article.key,
					time: time
				}
			});
			console.log(articles);
			res.render(viewsPath + 'home', {articles: articles});
		});
	}
};
