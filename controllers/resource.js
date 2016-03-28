var formidable = require('formidable'),
	fs = require('fs'),
	utils = require('../lib/utils.js');
module.exports = {
	registerRoutes: function(app) {
		app.post('/resource/img/upload', this.upload);
	},
	upload: function(req, res){
		var form = new formidable.IncomingForm();
		var imgDir = './resources/img/'+utils.getTime('yy-mm-dd');  //'/resources/img/2016-03-27'
		form.uploadDir='./resources/tmp';
		form.parse(req, function(err, fields, files){
			if(!fs.existsSync(imgDir)){
				fs.mkdirSync(imgDir);
			}
			var file = files.upfile;
			console.log(files)
	        var path = imgDir + '/' + file.name;
	        fs.renameSync(file.path, imgDir + '/' + file.name);
	        res.json({ status: 'success', src: imgDir + '/' + file.name});
		});
	}
	
};
