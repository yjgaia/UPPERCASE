/**
 * connect to MongoDB server.
 */
global.CONNECT_TO_DB_SERVER = METHOD(function(m) {
	'use strict';

	var
	// native db
	nativeDB,

	// init db funcs
	initDBFuncs = [],

	// add init db func.
	addInitDBFunc;

	m.addInitDBFunc = addInitDBFunc = function(initDBFunc) {

		if (nativeDB === undefined) {
			initDBFuncs.push(initDBFunc);
		} else {
			initDBFunc(nativeDB);
		}
	};

	return {

		run : function(params, callback) {
			//REQUIRED: params
			//OPTIONAL: params.username
			//OPTIONAL: params.password
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.name
			//OPTIONAL: callback

			var
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

			require('mongodb').MongoClient.connect('mongodb://' + (username !== undefined && password !== undefined ? username + ':' + password + '@' : '') + host + ':' + port + '/' + name, function(error, _nativeDB) {

				if (error !== TO_DELETE) {

					console.log(CONSOLE_RED('[UPPERCASE-DB] CONNECT TO DB SERVER FAILED: ' + error.toString()));

				} else {

					nativeDB = _nativeDB;

					EACH(initDBFuncs, function(initDBFunc) {
						initDBFunc(nativeDB);
					});

					initDBFuncs = undefined;

					if (callback !== undefined) {
						callback();
					}
				}
			});
		}
	};
});
