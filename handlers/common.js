var viewsPath = 'common/';

exports.test = function(req, res){
	res.type('text/plain');
	res.send('test');
};

exports.notFound = function(req, res, next){
	res.status(404);
	res.render(viewsPath + '404');
}

exports.serverError = function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render(viewsPath + '500');
}