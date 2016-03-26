var viewsPath = 'admin/',
	user = require('../models/admin/user.js'),
	auth = require('../lib/auth.js');

module.exports = {
	registerRoutes: function(app) {
		app.get('/admin', this.main);
		app.get('/admin/login', this.login);
		app.post('/admin/auth', this.auth);
		app.get(/\/admin(?:\/.*)/, this.routing);
	},
	login: function(req, res){
		res.render(viewsPath+ 'login',{layout: 'admin', title: '作坊'});
	},
	routing: function(req, res){
		res.redirect('/admin');
	},
	main: function(req, res){
		console.log(req.cookies);
		auth.isLogined(req.cookies.account.account, req.cookies.account.hash, function(flag){
			console.log(flag)
			if(flag){
				res.render(viewsPath + 'home', {layout: 'admin', title: '作坊'});
			}else{
				res.redirect('/admin/login');
			}
		})
	},
	auth: function(req, res){
		var userData = req.body;
		console.log(userData)
		user.findOne({'account': userData.account}, function(err, user){
			console.log('user', user);
			if(!user){
				res.json({ errorMsg: '用户名不存在或者密码不正确' ,status: 'fail'});
				return;
			}
			var authHash;
			var now = new Date().getTime();
			if(user.password == auth.md5Hash(userData.password, true)){
				authHash = auth.md5Hash(user.account + user.password + now, true);
				res.cookie("account", {account: user.account, hash: authHash, last: now}, {maxAge: 604800000});
				user.lastLogin = now;
				user.authHash = authHash;
				user.save(function(){});
				res.json({ status: 'success', });
			}else{
				res.json({ errorMsg: '用户名不存在或者密码不正确' ,status: 'fail'});
			}
		});
	}
	
};
