require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'UploadSample',
		webServerPort : 8894
	},

	NODE_CONFIG : {
		dbHost : '2.btncafe.com',
		dbName : 'UploadSample',
		dbUsername : 'test',
		dbPassword : 'test',

		uploadServers : {
			serverA : '1.btncafe.com',
			serverB : '2.btncafe.com'
		},
		thisServerName : 'serverA'
	}
});
