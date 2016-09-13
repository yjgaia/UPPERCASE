/**
 * connect to MongoDB server.
 */
global.CONNECT_TO_DB_SERVER = METHOD(function(m) {
	'use strict';

	var
	// DEFAULT_DB_SERVER_NAME
	DEFAULT_DB_SERVER_NAME = '__',
	
	// native dbs
	nativeDBs = {},

	// init db func map
	initDBFuncMap = {},

	// add init db func.
	addInitDBFunc;

	m.addInitDBFunc = addInitDBFunc = function(dbServerName, initDBFunc) {
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

		run : function(params, callback) {
			//REQUIRED: params
			//OPTIONAL: params.dbServerName
			//OPTIONAL: params.username
			//OPTIONAL: params.password
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.name
			//OPTIONAL: callback

			var
			// db server name
			dbServerName = params.dbServerName === undefined ? DEFAULT_DB_SERVER_NAME : params.dbServerName,
			
			// username
			username = params.username,

			// password
			password = params.password,

			// host
			host = params.host === undefined ? '127.0.0.1' : params.host,

			// port
			port = params.port === undefined ? 27017 : params.port,

			// name
			name = params.name;

			require('mongodb').MongoClient.connect('mongodb://' + (username !== undefined && password !== undefined ? username + ':' + password.replace(/@/g, '%40') + '@' : '') + host + ':' + port + '/' + name, function(error, nativeDB) {

				if (error !== TO_DELETE) {

					SHOW_ERROR('[UPPERCASE-DB] CONNECT TO DB SERVER FAILED: ' + error.toString());

				} else {

					nativeDBs[dbServerName] = nativeDB;

					if (initDBFuncMap[dbServerName] !== undefined) {
						
						EACH(initDBFuncMap[dbServerName], function(initDBFunc) {
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
