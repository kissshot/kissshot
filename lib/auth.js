var crypto = require('crypto')
	user = require('../models/admin/user.js'),
	credentials = require('./credentials.js'),
	consts = require('../lib/const.js');
	
module.exports = {
    md5Hash: function(pw, isNeedSalt){
        var hash = crypto.createHash('md5');
        if(isNeedSalt){
            pw += credentials.md5Salt;
        }
        hash.update(pw);
        return hash.digest('hex');
    },
    isLogined: function(req){
    	return new Promise(function(resolve, reject){
			if(!req.cookies.account){
				reject();
			}
			if(req.session.account){
				resolve();
			}
			user.findOne({'account': account.account}, function(err, user){
				if(!user){
					reject();
				}
				var now = (new Date()).getTime();
				if(now - user.lastLogin > consts.MAXAGE){
					user.lastLogin = '';
					user.authHash = '';
					user.save(function(){});
					reject();
				}else if(user.authHash === account.hash){
					resolve();
				}
			});
    	});
		// var isLogined = false;
		// if(!account){
		// 	callback(isLogined);
		// 	return;
		// }
		// user.findOne({'account': account.account}, function(err, user){
		// 	if(!user){
		// 		callback(false);
		// 		return;
		// 	}
		// 	var now = (new Date()).getTime();
		// 	if(now - user.lastLogin > consts.MAXAGE){
		// 		isLogined = false;
		// 		user.lastLogin = '';
		// 		user.authHash = '';
		// 		user.save(function(){});
		// 	}else if(user.authHash === account.hash){
		// 		isLogined = true;
		// 	}
		// 	callback(isLogined);
		// });
	}
}