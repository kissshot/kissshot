var formidable = require('formidable'),
	fs = require('fs'),
	utils = require('../lib/utils.js');
module.exports = {
	registerRoutes: function(app) {
		app.post('/resource/img/upload', this.upload);
	},
	upload: function(req, res){
		var form = new formidable.IncomingForm();
		var imgDir = 'public/resources/img/'+utils.getTime('yy-mm-dd');  //'/resources/img/2016-03-27'
		form.uploadDir='public/resources/tmp';
		form.parse(req, function(err, fields, files){
			if(!fs.existsSync(imgDir)){
				fs.mkdirSync(imgDir);
			}
			var file = files.upload;
			console.log(files)
	        var path = imgDir + '/' + file.name;
			path = path.replace(/([^\/]+)\.(bmp|jpg|png|gif)$/, '$1_'+(+new Date())+'.$2')
	        fs.renameSync(file.path, path);
	        res.json({ state: 'success', url: path.slice(6)});
		});
	}
	
};
