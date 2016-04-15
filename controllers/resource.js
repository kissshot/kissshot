var fs = require('fs'),
	utils = require('../lib/utils.js'),
	multer  = require('multer'),
	upload = multer({ dest: 'public/resources/tmp' });
module.exports = {
	registerRoutes: function(app) {
		app.post('/resource/img/upload', upload.single('upload'), this.upload);
	},
	upload: function(req, res){
		console.log(req.file)
		if(!req.session.account)return;
		var size = req.body.size;
		var imgDir = 'public/resources/img/'+utils.getTime('yy-mm-dd');  //'/resources/img/2016-03-27'
		if(!fs.existsSync(imgDir)){
			fs.mkdirSync(imgDir);
		}
		var file = req.file;
		var path = imgDir + '/' + file.originalname;
		path = path.replace(/([^\/]+)\.(bmp|jpg|png|gif)$/, '$1_'+(+new Date())+'.$2')
		fs.renameSync(file.path, path);
		res.json({ state: 'success', url: path.slice(6)});

	}
	
};
