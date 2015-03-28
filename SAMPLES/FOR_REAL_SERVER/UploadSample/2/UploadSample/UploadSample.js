require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'UploadSample',
		webServerPort : 8894
	},

	NODE_CONFIG : {
		dbName : 'UploadSample',

		uploadServers : {
			serverA : '1.btncafe.com',
			serverB : '2.btncafe.com'
		},
		thisServerName : 'serverB'
	}
});
