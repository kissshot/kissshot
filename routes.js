var blog = require('./handlers/blog.js'),
	common = require('./handlers/common.js');
	adminControllers = require('./controllers/admin.js')

module.exports = function(app){

	app.get('/', blog.home);

	adminControllers.registerRoutes(app);

	app.use(common.notFound);

	app.use(common.serverError);
};

