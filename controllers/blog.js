var viewsPath = 'blog/';
module.exports = {
	registerRoutes: function(app) {
		app.get('/', this.main);
	},
	main: function(req, res, next){
		res.render(viewsPath + 'home');
	}
};
