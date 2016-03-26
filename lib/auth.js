var crypto = require('crypto')
	user = require('../models/admin/user.js'),
	credentials = require('./credentials.js');
module.exports = {
    md5Hash: function(pw, isNeedSalt){
        var hash = crypto.createHash('md5');
        if(isNeedSalt){
            pw += credentials.md5Salt;
        }
        hash.update(pw);
        return hash.digest('hex');
    },
    isLogined: function(account, hash, callback){
		var isLogined = false;
		if(account == undefined){
			callback(isLogined);
		}
		user.findOne({'account': account}, function(err, user){
			console.log(user.authHash+'---'+hash);
			if(user.authHash === hash){
				isLogined = true;
			}
			callback(isLogined);
		});
	}
}