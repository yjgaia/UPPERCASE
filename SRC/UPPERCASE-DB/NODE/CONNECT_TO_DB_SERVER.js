/*
 * MongoDB 서버에 연결합니다.
 */
global.CONNECT_TO_DB_SERVER = METHOD((m) => {

	const DEFAULT_DB_SERVER_NAME = '__';
	
	let MongoDB = require('mongodb');
	
	let nativeDBs = {};
	let backupDBs = {};
	
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
			initDBFunc(nativeDBs[dbServerName], backupDBs[dbServerName]);
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
			//OPTIONAL: params.backupHost
			//OPTIONAL: params.backupPort
			//OPTIONAL: params.backupName
			//OPTIONAL: params.backupUsername
			//OPTIONAL: params.backupPassword
			//OPTIONAL: callback

			let dbServerName = params.dbServerName === undefined ? DEFAULT_DB_SERVER_NAME : params.dbServerName;
			let host = params.host === undefined ? '127.0.0.1' : params.host;
			let port = params.port === undefined ? 27017 : params.port;
			let name = params.name;
			let username = params.username;
			let password = params.password;
			
			let backupHost = params.backupHost === undefined ? '127.0.0.1' : params.backupHost;
			let backupPort = params.backupPort === undefined ? 27017 : params.backupPort;
			let backupName = params.backupName;
			let backupUsername = params.backupUsername;
			let backupPassword = params.backupPassword;
			
			NEXT([
			(next) => {
				
				MongoDB.MongoClient.connect(
					
					'mongodb://' +
					(username !== undefined && password !== undefined ? username + ':' + password.replace(/@/g, '%40') + '@' : '') +
					host + ':' +
					port + '/' +
					name,
					
					{
						poolSize : 16,
						connectTimeoutMS : 600000,
						socketTimeoutMS : 600000
					},
					
					(error, nativeDB) => {
	
					if (error !== TO_DELETE) {
	
						SHOW_ERROR('CONNECT_TO_DB_SERVER', error.toString());
	
					} else {
	
						nativeDBs[dbServerName] = nativeDB;
	
						if (backupName === undefined) {
							next.next(nativeDB);
						} else {
							next(nativeDB);
						}
					}
				});
			},
			
			(next) => {
				return (nativeDB) => {
					
					MongoDB.MongoClient.connect(
						
						'mongodb://' +
						(backupUsername !== undefined && backupPassword !== undefined ? backupUsername + ':' + backupPassword.replace(/@/g, '%40') + '@' : '') +
						backupHost + ':' +
						backupPort + '/' +
						backupName,
						
						(error, backupDB) => {
		
						if (error !== TO_DELETE) {
							
							SHOW_ERROR('CONNECT_TO_DB_SERVER (BACKUP DB)', error.toString());
		
						} else {
							
							backupDBs[dbServerName] = backupDB;
		
							next(nativeDB, backupDB);
						}
					});
				};
			},
			
			() => {
				return (nativeDB, backupDB) => {
					
					if (initDBFuncMap[dbServerName] !== undefined) {
						
						EACH(initDBFuncMap[dbServerName], (initDBFunc) => {
							initDBFunc(nativeDB, backupDB);
						});
						
						delete initDBFuncMap[dbServerName];
					}

					if (callback !== undefined) {
						callback();
					}
				};
			}]);
		}
	};
});
