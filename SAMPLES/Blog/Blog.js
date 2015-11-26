require(process.env.UPPERCASE_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
        isDevMode : true,
		defaultBoxName : 'Blog',
        title : 'Blog',
		webServerPort : 8328
	},
	NODE_CONFIG : {
		dbName : 'Blog',
		Blog : {
			password : '1234'
		}
	}
});