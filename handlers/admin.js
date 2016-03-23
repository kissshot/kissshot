var viewsPath = 'admin/';

exports.admin = function(req, res){
	res.type('text/plain');
	res.send('admin');
};

exports.login = function(req, res){
	res.type('text/plain');
	res.send('login');
};
