require(process.env.UPPERCASE_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
        isDevMode : true,
		defaultBoxName : 'Sample',
        title : 'Sample',
		webServerPort : 8888
	},
	NODE_CONFIG : {
	    // 데이터베이스 설정
		// 데이터베이스 이름은 Sample 입니다.
		dbName : 'Sample'
	},
	UADMIN_CONFIG : {
		port : 8528,
		password : '',
		init : function(addModel) {
			
		}
	}
});