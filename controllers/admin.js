var adminHandlers = require('../handlers/admin.js');
var isLogin = false;
module.exports = {

	registerRoutes: function(app) {
		app.get('/admin', this.admin);
		app.get('/admin/login', adminHandlers.login);
		app.get(/\/admin(?:\/.*)/, this.admin);
		
		// app.post('/customer/register', this.processRegister);

		// app.get('/customer/:id', this.home);
		// app.get('/customer/:id/preferences', this.preferences);
		// app.get('/orders/:id', this.orders);

		// app.post('/customer/:id/update', this.ajaxUpdate);
	},
	admin: function(req, res, next){
		if(!isLogin){
			res.redirect('/admin/login');
		}else{
			res.render('admin/home');
		}
	}
};
