require(process.env.UPPERCASE_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
        isDevMode : true,
		defaultBoxName : 'ExtendModel',
        title : 'ExtendModel',
		webServerPort : 8666
	},
	NODE_CONFIG : {
		dbName : 'ExtendModel'
	}
});