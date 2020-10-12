/*
 * MongoDB 서버에 연결합니다.
 */
global.CONNECT_TO_DB_SERVER = METHOD((m) => {

	const DEFAULT_DB_SERVER_NAME = '__';

	let MongoClient = require('mongodb').MongoClient;

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

	let checkIsConnected = m.checkIsConnected = (dbServerName) => {
		//OPTIONAL: dbServerName

		if (dbServerName === undefined) {
			dbServerName = DEFAULT_DB_SERVER_NAME;
		}

		return nativeDBs[dbServerName] !== undefined;
	};

	return {

		run: (params, callback) => {
			//REQUIRED: params
			//OPTIONAL: params.dbServerName
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.name
			//OPTIONAL: params.username
			//OPTIONAL: params.password
			//OPTIONAL: params.url
			//OPTIONAL: params.backupHost
			//OPTIONAL: params.backupPort
			//OPTIONAL: params.backupName
			//OPTIONAL: params.backupUsername
			//OPTIONAL: params.backupPassword
			//OPTIONAL: params.backupURL
			//OPTIONAL: callback

			let dbServerName = params.dbServerName === undefined ? DEFAULT_DB_SERVER_NAME : params.dbServerName;
			let host = params.host === undefined ? '127.0.0.1' : params.host;
			let port = params.port === undefined ? 27017 : params.port;
			let name = params.name;
			let username = params.username;
			let password = params.password;
			let url = params.url;

			let backupHost = params.backupHost === undefined ? '127.0.0.1' : params.backupHost;
			let backupPort = params.backupPort === undefined ? 27017 : params.backupPort;
			let backupName = params.backupName;
			let backupUsername = params.backupUsername;
			let backupPassword = params.backupPassword;
			let backupURL = params.backupURL;

			NEXT([

				(next) => {

					let client = new MongoClient(url !== undefined ? url : (

						username !== undefined && password !== undefined ?

							'mongodb://' +
							username + ':' + password.replace(/@/g, '%40') + '@' +
							host + ':' +
							port + '?authMechanism=DEFAULT&authSource=' + name :

							'mongodb://' +
							host + ':' +
							port

					), {
						poolSize: 16,
						connectTimeoutMS: 600000,
						socketTimeoutMS: 6000000,
						useNewUrlParser: true,
						useUnifiedTopology: true
					});

					client.connect((error) => {

						if (error !== TO_DELETE) {

							SHOW_ERROR('CONNECT_TO_DB_SERVER', error.toString());

						} else {

							let nativeDB = client.db(name);

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

						let client = new MongoClient(backupURL !== undefined ? backupURL : (

							backupUsername !== undefined && backupPassword !== undefined ?

								'mongodb://' +
								backupUsername + ':' + backupPassword.replace(/@/g, '%40') + '@' +
								backupHost + ':' +
								backupPort + '?authMechanism=DEFAULT&authSource=' + backupName :

								'mongodb://' +
								backupHost + ':' +
								backupPort

						), {
							connectTimeoutMS: 600000,
							socketTimeoutMS: 6000000,
							useNewUrlParser: true,
							useUnifiedTopology: true
						});

						client.connect((error) => {

							if (error !== TO_DELETE) {

								SHOW_ERROR('CONNECT_TO_DB_SERVER (BACKUP DB)', error.toString());

								next(nativeDB);

							} else {

								let backupDB = client.db(backupName);

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
				}
			]);
		}
	};
});
