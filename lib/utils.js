var fs = require('fs'),
	path = require('path');
module.exports = {
	getTime: function(format, time){
		var time = time || new Date();
		var arr = format.match(/([^\w+]|\w+)/g);
		var me = this;
		return arr.reduce(function(a, b){
			var aStr = a;
			if(a.match(/^\w+$/)){
				aStr = me.getOptionTime(a, time);
			}
			if(b.match(/^\w+$/)){
				aStr += me.getOptionTime(b, time);
			}else{
				aStr += b;
			}
			return aStr;
		});
	},
	getOptionTime: function(format, time){
		switch(0){
			case format.search(/[yY]/):
				return time.getFullYear();
				break;
			case format.search(/[mM]/):
				var m = time.getMonth() + 1 + '';
				return m.length == 1 ? '0' + m : m;
				break;
			case format.search(/[dD]/):
				var d = time.getDate() + '';
				return d.length == 1 ? '0' + d : d;
				break;
			case format.search(/[hH]/):
				return time.getHours();
				break;
			case format.search(/[fF]/):
				return time.getMinutes();
				break;
			case format.search(/[sS]/):
				return time.getSeconds();
				break;
		}
	},
	//递归创建目录 异步方法
	mkdirs: function(dirname, mode, callback){
		fs.exists(dirname, function (exists){
			if(exists){
				callback();
			}else{
				arguments.callee(path.dirname(dirname), mode, function (){
					fs.mkdir(dirname, mode, callback);
				});
			}
		});
	},
	//递归创建目录 同步方法
	mkdirsSync: function(dirname, mode){
	if(fs.existsSync(dirname)){
		return true;
	}else{
		if(arguments.callee(path.dirname(dirname), mode)){
			fs.mkdirSync(dirname, mode);
			return true;
		}
	}
}
};