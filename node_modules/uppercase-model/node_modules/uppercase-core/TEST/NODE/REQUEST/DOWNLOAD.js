TEST('DOWNLOAD', (check) => {

	DOWNLOAD({
		url : 'https://github.com/Hanul/UPPERCASE/archive/master.zip',
		path : 'UPPERCASE.zip'
	});
	
	DOWNLOAD({
		host : 'github.com',
		uri : 'Hanul/UPPERCASE/archive/master.zip',
		isSecure : true,
		path : 'UPPERCASE.zip'
	});
});
