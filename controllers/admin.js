var viewsPath = 'admin/',
	user = require('../models/admin/user.js'),
	auth = require('../lib/auth.js'),
	consts = require('../lib/const.js');

module.exports = {
	/*
	 * 路由监听
	 * param express实例
	 */
	registerRoutes: function(app) {
		app.get('/admin', this.main); 					//后台入口
		app.get('/admin/login', this.login);			//后台登录
		app.post('/admin/auth', this.auth);				//权限验证
		app.get(/\/admin(?:\/[^\.]*)/, this.routing);	//重定向到后台入口
	},
	login: function(req, res){
		res.render(viewsPath+ 'login',{layout: 'admin', title: '作坊'});
	},
	routing: function(req, res){
		res.redirect('/admin');
	},
	main: function(req, res){
		auth.isLogined(req).then(function(){
			res.render(viewsPath + 'home', {layout: 'admin', title: '作坊'});
		}).catch(function(){
			res.clearCookie('account');
			res.redirect('/admin/login');
		});
	},
	auth: function(req, res){
		var userData = req.body;
		user.findOne({'account': userData.account}, function(err, user){
			var authHash;
			var now = (new Date()).getTime();
			if(!user){
				res.json({ errorMsg: '用户名不存在或者密码不正确' ,status: 'fail'});
			}else if(user.password == auth.md5Hash(userData.password, true)){
				authHash = auth.md5Hash(user.account + user.password + now, true);
				var cookieOpt = {};
				if(userData.isRemember === 'true'){
					cookieOpt.maxAge = consts.MAXAGE;
					user.lastLogin = now;
					user.authHash = authHash;
					user.save(function(){});
				}
				res.cookie("account", {hash: authHash}, cookieOpt);
				req.session.account = user.account;

				res.json({ status: 'success'});
			}else{
				res.json({ errorMsg: '用户名不存在或者密码不正确' ,status: 'fail'});
			}
		});
	}
	
};
