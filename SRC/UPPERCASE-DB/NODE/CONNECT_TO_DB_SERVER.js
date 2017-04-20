/*
 * MongoDB 서버에 연결합니다.
 */
global.CONNECT_TO_DB_SERVER = METHOD((m) => {

	const DEFAULT_DB_SERVER_NAME = '__';
	
	let MongoDB = require('mongodb');
	
	let nativeDBs = {};
	let backupDBs = {};
	
	let initDBFuncMap = {};
	
	let callCountStore;
	let callTimeStore;
	let resultCountStore;
	
	let increaseCallCount = (dbServerName, method) => {
		
		if (callCountStore !== undefined) {
			
			let updateData = {
				$inc : {}
			};
			updateData.$inc[method] = 1; 
			
			callCountStore.update({
				id : dbServerName,
				data : updateData
			});
		}
	};
	
	let getCallCounts = m.getCallCounts = (callback) => {
		//REQUIRED: callback
		
		if (callCountStore === undefined) {
			callback({});
		} else {
			callCountStore.all(callback);
		}
	};
	
	let increaseCallTime = (dbServerName, method, time) => {
		
		if (callTimeStore !== undefined) {
			
			let updateData = {
				$inc : {}
			};
			updateData.$inc[method] = time; 
			
			callTimeStore.update({
				id : dbServerName,
				data : updateData
			});
		}
	};
	
	let getCallTimes = m.getCallTimes = (callback) => {
		//REQUIRED: callback
		
		if (callTimeStore === undefined) {
			callback({});
		} else {
			callTimeStore.all(callback);
		}
	};
	
	let increaseResultCount = (dbServerName, method, count) => {
		
		if (resultCountStore !== undefined) {
			
			let updateData = {
				$inc : {}
			};
			updateData.$inc[method] = count; 
			
			resultCountStore.update({
				id : dbServerName,
				data : updateData
			});
		}
	};
	
	let getResultCounts = m.getResultCounts = (callback) => {
		//REQUIRED: callback
		
		if (resultCountStore === undefined) {
			callback({});
		} else {
			resultCountStore.all(callback);
		}
	};

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
			initDBFunc(nativeDBs[dbServerName], backupDBs[dbServerName], (method) => {
				increaseCallCount(dbServerName, method);
			}, (method, time) => {
				increaseCallTime(dbServerName, method, time);
			}, (method, count) => {
				increaseResultTime(dbServerName, method, count);
			});
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
			
			let backupHost = params.backupHost;
			let backupPort = params.backupPort === undefined ? 27017 : params.backupPort;
			let backupName = params.backupName;
			let backupUsername = params.backupUsername;
			let backupPassword = params.backupPassword;
			
			if (callCountStore === undefined) {
				callCountStore = SHARED_STORE('__DB_CALL_COUNT_STORE');
			}
			
			callCountStore.save({
				id : dbServerName,
				data : {}
			});
			
			if (callTimeStore === undefined) {
				callTimeStore = SHARED_STORE('__DB_CALL_TIME_STORE');
			}
			
			callTimeStore.save({
				id : dbServerName,
				data : {}
			});
			
			if (resultCountStore === undefined) {
				resultCountStore = SHARED_STORE('__DB_RESULT_COUNT_STORE');
			}
			
			resultCountStore.save({
				id : dbServerName,
				data : {}
			});
			
			NEXT([
			(next) => {
				
				MongoDB.MongoClient.connect(
					
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
	
						if (backupHost === undefined) {
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
							initDBFunc(nativeDB, backupDB, (method) => {
								increaseCallCount(dbServerName, method);
							}, (method, time) => {
								increaseCallTime(dbServerName, method, time);
							}, (method, count) => {
								increaseResultTime(dbServerName, method, count);
							});
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
