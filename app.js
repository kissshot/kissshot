var express = require('express');
var appConfig = require('./lib/config-base.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');  //引入handlebars，设置默认模板

var app = express();
var db = mongoose.connect(appConfig.mongoDb.url, appConfig.mongoDb.options);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', appConfig.http.port);
app.engine('.html', handlebars({
		defaultLayout: 'main',
		extname: '.html',
		helpers: {
			section: function(name, options){ //自定义标签
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}

	}));  		//注册模板引擎
app.set('view engine', '.html');  				//设置模板引擎
app.use(express.static(__dirname + '/public'));  	//设置静态文件路径

// add routes
require('./routes.js')(app);

app.listen(app.get('port'), function(){
	console.log('Start!  '+ app.get('env'));
	// switch(app.get('env')){
	// 	case "development": 
	// 		//app.use(require('morgan')('dev'));
	// 		break;
	// 	case "production":
	// 		console.log('production');
	// 		app.use(require('express-logger')({
	// 			path: appConfig.urls.LOGS
	// 		}));
	// 		break;
	// }
});

