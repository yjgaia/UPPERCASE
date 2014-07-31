require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {

		isDevMode : true,

		defaultBoxName : 'TestBox',

		socketServerPort : 8887,

		webServerPort : 8888
	},

	NODE_CONFIG : {

		dbName : 'test'
	}
});
