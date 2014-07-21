require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {

		defaultBoxName : 'TestBox',

		isDevMode : true
	},

	NODE_CONFIG : {

		dbName : 'test'
	}
});
