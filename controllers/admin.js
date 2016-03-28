var viewsPath = 'admin/',
	user = require('../models/admin/user.js'),
	auth = require('../lib/auth.js'),
	consts = require('../lib/const.js');

module.exports = {
	registerRoutes: function(app) {
		app.get('/admin', this.main);
		app.get('/admin/login', this.login);
		app.post('/admin/auth', this.auth);
		app.get(/\/admin(?:\/[^\.]*)/, this.routing);
	},
	login: function(req, res){
		res.render(viewsPath+ 'login',{layout: 'admin', title: '作坊'});
	},
	routing: function(req, res){
		res.redirect('/admin');
	},
	main: function(req, res){
		console.log(req.cookies);
		auth.isLogined(req.cookies.account).then(function(){
			res.render(viewsPath + 'home', {layout: 'admin', title: '作坊'});
		}).catch(function(){
			res.clearCookie('account');
			res.redirect('/admin/login');
		});
		// auth.isLogined(req.cookies.account, function(flag){
		// 	if(flag){
		// 		res.render(viewsPath + 'home', {layout: 'admin', title: '作坊'});
		// 	}else{
		// 		res.clearCookie('account');
		// 		res.redirect('/admin/login');
		// 	}
		// })
	},
	auth: function(req, res){
		var userData = req.body;
		console.log(userData)
		user.findOne({'account': userData.account}, function(err, user){
			console.log(user)
			var authHash;
			var now = (new Date()).getTime();
			if(!user){
				res.json({ errorMsg: '用户名不存在或者密码不正确' ,status: 'fail'});
			}else if(user.password == auth.md5Hash(userData.password, true)){
				authHash = auth.md5Hash(user.account + user.password + now, true);
				var cookieOpt = {};
				if(userData.isRemember === 'true'){
					cookieOpt.maxAge = consts.MAXAGE;
				}
				res.cookie("account", {account: user.account, hash: authHash}, cookieOpt);
				user.lastLogin = now;
				user.authHash = authHash;
				user.save(function(){});
				res.json({ status: 'success'});
			}else{
				res.json({ errorMsg: '用户名不存在或者密码不正确' ,status: 'fail'});
			}
		});
	}
	
};
