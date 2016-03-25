var viewsPath = 'admin/';
var isLogin = false;
var user = require('../models/admin/user.js');
module.exports = {
	registerRoutes: function(app) {
		app.get('/admin', this.main);
		app.get('/admin/login', this.login);
		app.post('/admin/auth', this.auth);
		app.get(/\/admin(?:\/.*)/, this.main);
	},
	login: function(req, res){
		res.render(viewsPath+ 'login',{layout: 'admin', title: '作坊'});
	},
	main: function(req, res){
		if(!isLogin){
			res.redirect('/admin/login');
		}else{
			res.render('admin/home', {layout: 'admin', title: '作坊'});
		}
	},
	auth: function(req, res){
		var userData = req.params;
		user.findOne({'role': '0'}, function(err, user){
			if(err) return next(err);
			if(!user) return next(); 
			if(user.account == userData.account && user.password == userData.password){
				res.json({ status: 'success'});
			}else{
				res.json({ errorMsg: '用户名不存在或者密码不正确' ,status: 'fail'});
			}
		});
	}
	
};
