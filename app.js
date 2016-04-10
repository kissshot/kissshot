var express = require('express');
var appConfig = require('./lib/config.js');			//系统设置
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');  	//引入handlebars，设置默认模板
var credentials = require('./lib/credentials.js');	//密钥相关
var hash = require('./lib/auth.js');				//权限相关

var app = express();
var env = app.get('env');
var db = mongoose.connect(appConfig.mongoDb.url[env], appConfig.mongoDb.options);	//数据库连接
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', appConfig.http.port);
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({secret: credentials.cookieSecret}));
app.engine('.html', handlebars({
		defaultLayout: 'main',
		extname: '.html',
		partialsDir: __dirname + '/views/partials',
		helpers: {
			section: function(name, options){ //自定义标签
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}

	}));  											//注册模板引擎
app.set('view engine', '.html');  					//设置模板引擎
app.use(express.static(__dirname + '/public'));  	//设置静态文件路径

switch(env){										//记录日志
	case "development": 
		app.use(require('morgan')('dev'));
		break;
	case "production":
		app.use(require('express-logger')({
			path: appConfig.urls.LOGS
		}));
		break;
}
 var user = require('./models/admin/user.js');
  user.find(function(err, users){
 	if(users.length){
 		return;
 	}
  	new user({
  		account: 'kissshot',
  		password: hash.md5Hash(hash.md5Hash('xtu2008'), true),
  		email: '751838741@qq.com',
  		role: '0',
  		created: Date.now(),
 		authHash: '',
 		lastLogin: ''
  	}).save(function(){
  		console.log('user add success!')
  	});
  });
 //add routes
require('./controllers/blog.js').registerRoutes(app);
require('./controllers/admin.js').registerRoutes(app);
require('./controllers/article.js').registerRoutes(app);
require('./controllers/resource.js').registerRoutes(app);
require('./controllers/common.js').registerRoutes(app);

app.listen(app.get('port'), function(){
	console.log('Start!  '+ env);
});

