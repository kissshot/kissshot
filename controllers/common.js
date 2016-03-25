var viewsPath = 'common/';
module.exports = {
	registerRoutes: function(app) {
		// 404 catch-all handler (middleware)
		app.use(this.notFound);

		// 500 error handler (middleware)
		app.use(this.serverError);
	},
	notFound: function(req, res, next){
		res.status(404);
		res.render('common/404');
	},
	serverError: function(err, req, res, next){
		console.error(err.stack);
		res.status(500);
		res.render('common/500');
	}
};