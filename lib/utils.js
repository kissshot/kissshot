module.exports = {
	getTime: function(format){
		var time = new Date();
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
				return time.getDate();
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
	}
};