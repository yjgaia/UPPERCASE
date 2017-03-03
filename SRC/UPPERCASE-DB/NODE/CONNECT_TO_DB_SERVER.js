/*
 * MongoDB 서버에 연결합니다.
 */
global.CONNECT_TO_DB_SERVER = METHOD((m) => {

	const DEFAULT_DB_SERVER_NAME = '__';
	
	let nativeDBs = {};
	let initDBFuncMap = {};

	let addInitDBFunc = m.addInitDBFunc = (dbServerName, initDBFunc) => {
		//OPTIONAL: dbServerName
		//REQUIRED: initDBFunc
		
		if (initDBFunc === undefined) {
			initDBFunc = dbServerName;
			dbServerName = undefined;
		}
		
		if (dbServerName === undefined) {
			dbServerName = DEFAULT_DB_SERVER_NAME;
		}

		if (nativeDBs[dbServerName] === undefined) {
			
			if (initDBFuncMap[dbServerName] === undefined) {
				initDBFuncMap[dbServerName] = [];
			}
			
			initDBFuncMap[dbServerName].push(initDBFunc);
			
		} else {
			initDBFunc(nativeDBs[dbServerName]);
		}
	};

	return {

		run : (params, callback) => {
			//REQUIRED: params
			//OPTIONAL: params.dbServerName
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.name
			//OPTIONAL: params.username
			//OPTIONAL: params.password
			//OPTIONAL: callback

			let dbServerName = params.dbServerName === undefined ? DEFAULT_DB_SERVER_NAME : params.dbServerName;
			let host = params.host === undefined ? '127.0.0.1' : params.host;
			let port = params.port === undefined ? 27017 : params.port;
			let name = params.name;
			let username = params.username;
			let password = params.password;

			require('mongodb').MongoClient.connect(
				
				'mongodb://' +
				(username !== undefined && password !== undefined ? username + ':' + password.replace(/@/g, '%40') + '@' : '') +
				host + ':' +
				port + '/' +
				name,
				
				(error, nativeDB) => {

				if (error !== TO_DELETE) {

					SHOW_ERROR('CONNECT_TO_DB_SERVER', error.toString());

				} else {

					nativeDBs[dbServerName] = nativeDB;

					if (initDBFuncMap[dbServerName] !== undefined) {
						
						EACH(initDBFuncMap[dbServerName], (initDBFunc) => {
							initDBFunc(nativeDB);
						});
						
						delete initDBFuncMap[dbServerName];
					}

					if (callback !== undefined) {
						callback();
					}
				}
			});
		}
	};
});
