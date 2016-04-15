var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth()+1,
	day = date.getDay();

module.exports = {
	mongoDb: {
		options: {
			server: {
				socketOptions: {keepAlive: 1}
			}
		},
		url: {
			development: 'mongodb://localhost:27017/kissshot',
			production: 'mongodb://baizhou:xtu2008@ds023388.mlab.com:23388/kissshot'
		}
	},
	http: {
		port: 3000
	},
	urls:{
		LOGS: ['./log/requests', year, month, day+'.log'].join('-')
	}
}