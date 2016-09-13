require(process.env.UPPERCASE_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		defaultBoxName : 'UploadSample',
		webServerPort : 8812
	},

	NODE_CONFIG : {
		dbName : 'UploadSample'
	}
});
