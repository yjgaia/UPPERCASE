require(process.env['UPPERCASE.IO_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {

		defaultBoxName : 'TestBox',

		isDevMode : true
	},

	NODE_CONFIG : {

		dbName : 'test'
	}
});
