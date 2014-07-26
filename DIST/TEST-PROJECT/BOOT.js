require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {

		isDevMode : true,

		defaultBoxName : 'TestBox',

		webServerPort : 8888,

		socketServerPort : 8889,

		webSocketServerPort : 8810,
		webSocketFixServerPort : 8811,

		uploadServerPort : 8812
	},

	NODE_CONFIG : {

		dbName : 'test'
	}
});
