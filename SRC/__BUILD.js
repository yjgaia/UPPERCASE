// load UPPERCASE.JS.
require('../UPPERCASE.JS-COMMON.js');
require('../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../UPPERCASE.IO-UTIL/NODE.js');

/*
 * distribute UPPERCASE.IO.
 */
RUN(function() {
	'use strict';

	var
	//IMPORT: path
	path = require('path'),

	// log.
	log = function(msg) {
		console.log('UPPERCASE.IO BUILD: ' + msg);
	},

	// scan folder.
	scanFolder = function(scripts, path) {
		//REQUIRED: scripts
		//REQUIRED: path

		FIND_FILE_NAMES({
			path : path,
			isSync : true
		}, {

			notExists : function() {
				// ignore.
			},

			success : function(fileNames) {
				EACH(fileNames, function(fileName) {
					scripts.push(path + '/' + fileName);
				});
			}
		});

		FIND_FOLDER_NAMES({
			path : path,
			isSync : true
		}, {

			notExists : function() {
				// ignore.
			},

			success : function(folderNames) {
				EACH(folderNames, function(folderName) {
					scanFolder(scripts, path + '/' + folderName);
				});
			}
		});
	},

	// save.
	save = function(modulePath, scripts, path) {

		var
		// script
		script = '';

		EACH(scripts, function(scriptPath) {
			script += MINIFY_JS(READ_FILE({
				path : scriptPath,
				isSync : true
			}));
		});

		WRITE_FILE({
			path : '../UPPERCASE.IO-' + modulePath + '/' + path,
			content : script,
			isSync : true
		});
	},

	// copy folder.
	copyFolder = function(modulePath, from, to) {

		var
		// real to
		realTo = '../UPPERCASE.IO-' + modulePath + '/' + to;

		FIND_FILE_NAMES({
			path : modulePath + '/' + from,
			isSync : true
		}, {

			notExists : function() {
				// ignore.
			},

			success : function(fileNames) {
				EACH(fileNames, function(fileName) {
					if (path.extname(fileName) === '.js') {

						save(modulePath, [modulePath + '/' + from + '/' + fileName], to + '/' + fileName);

					} else if (path.extname(fileName) === '.css') {

						WRITE_FILE({
							path : realTo + '/' + fileName,
							content : MINIFY_CSS(READ_FILE({
								path : modulePath + '/' + from + '/' + fileName,
								isSync : true
							})),
							isSync : true
						});

					} else {

						COPY_FILE({
							from : modulePath + '/' + from + '/' + fileName,
							to : realTo + '/' + fileName,
							isSync : true
						});
					}
				});
			}
		});

		FIND_FOLDER_NAMES({
			path : modulePath + '/' + from,
			isSync : true
		}, {

			notExists : function() {
				// ignore.
			},

			success : function(folderNames) {
				EACH(folderNames, function(folderName) {
					copyFolder(modulePath, from + '/' + folderName, to + '/' + folderName, folderName);
				});
			}
		});
	},

	// dist folder.
	distFolder = function(modulePath, name) {

		var
		// scripts
		scripts = [];

		scanFolder(scripts, modulePath + '/' + name);

		if (scripts.length > 0) {
			save(modulePath, scripts, name + '.js');
		}
	},

	// dist module.
	distModule = function(name) {

		var
		// script
		script = '';

		log('BUILD [' + name + ']');

		distFolder(name, 'COMMON');
		distFolder(name, 'BROWSER');
		distFolder(name, 'CLIENT');
		distFolder(name, 'NODE');
		distFolder(name, 'TITANIUM');
		copyFolder(name, 'R', 'R');
	};

	INIT_OBJECTS();

	distModule('BOX');
	save('BOX', ['BOX/BOX.js', 'BOX/FOR_BOX.js'], 'CORE.js');

	distModule('DB');
	distModule('TRANSPORT');
	distModule('ROOM');
	distModule('MODEL');
	distModule('UPLOAD');
	distModule('UTIL');

	distModule('IO');
	save('IO', ['IO/BOOT.js'], 'BOOT.js');
	save('IO', ['IO/BROWSER_INIT.js'], 'BROWSER_INIT.js');

	RUN(function() {

		var
		// copy.
		copy = function(path) {

			COPY_FILE({
				from : '../' + path,
				to : '../UPPERCASE.IO-TITANIUM-PACK/' + path,
				isSync : true
			});
		};

		log('MAKE [TITANIUM-PACK]');

		// copy UPPERCASE.JS.
		copy('UPPERCASE.JS-COMMON.js');
		copy('UPPERCASE.JS-TITANIUM.js');
		copy('UPPERCASE.JS-BROWSER.js');

		// copy UPPERCASE.IO-BOX.
		copy('UPPERCASE.IO-BOX/CORE.js');
		copy('UPPERCASE.IO-BOX/CLIENT.js');

		// copy UPPERCASE.IO-TRANSPORT.
		copy('UPPERCASE.IO-TRANSPORT/BROWSER.js');

		// copy UPPERCASE.IO-ROOM.
		copy('UPPERCASE.IO-ROOM/TITANIUM.js');
		copy('UPPERCASE.IO-ROOM/CLIENT.js');

		// copy UPPERCASE.IO-MODEL.
		copy('UPPERCASE.IO-MODEL/COMMON.js');
		copy('UPPERCASE.IO-MODEL/CLIENT.js');

		// copy UPPERCASE.IO-IO.
		copy('UPPERCASE.IO-IO/TITANIUM.js');
		copy('UPPERCASE.IO-IO/CLIENT.js');
	});

	RUN(function() {

		var
		// init script
		initScript = 'global = window;\n',

		// load.
		load = function(path) {

			initScript += READ_FILE({
				path : '../' + path,
				isSync : true
			});
		},

		// copy folder.
		copyFolder = function(path) {

			FIND_FILE_NAMES({
				path : '../' + path,
				isSync : true
			}, function(fileNames) {

				EACH(fileNames, function(fileName) {
					COPY_FILE({
						from : '../' + path + '/' + fileName,
						to : '../UPPERCASE.IO-CORDOVA-PACK/' + path + '/' + fileName,
						isSync : true
					});
				});
			});

			FIND_FOLDER_NAMES({
				path : '../' + path,
				isSync : true
			}, function(folderNames) {
				EACH(folderNames, function(folderName) {
					copyFolder(path + '/' + folderName);
				});
			});
		};

		log('MAKE [CORDOVA-PACK]');

		// load UPPERCASE.JS.
		load('UPPERCASE.JS-COMMON.js');
		load('UPPERCASE.JS-BROWSER.js');
		copyFolder('UPPERCASE.JS-BROWSER-FIX');

		// load UPPERCASE.IO-BOX.
		load('UPPERCASE.IO-BOX/CORE.js');
		load('UPPERCASE.IO-BOX/CLIENT.js');
		load('UPPERCASE.IO-BOX/BROWSER.js');

		// load UPPERCASE.IO-TRANSPORT.
		load('UPPERCASE.IO-TRANSPORT/BROWSER.js');
		copyFolder('UPPERCASE.IO-TRANSPORT/R');

		// load UPPERCASE.IO-ROOM.
		load('UPPERCASE.IO-ROOM/CLIENT.js');
		load('UPPERCASE.IO-ROOM/BROWSER.js');

		// load UPPERCASE.IO-MODEL.
		load('UPPERCASE.IO-MODEL/COMMON.js');
		load('UPPERCASE.IO-MODEL/CLIENT.js');

		// load UPPERCASE.IO-IO.
		load('UPPERCASE.IO-IO/CLIENT.js');
		load('UPPERCASE.IO-IO/BROWSER.js');

		// write IMPORT.js
		WRITE_FILE({
			path : '../UPPERCASE.IO-CORDOVA-PACK/INIT.js',
			content : initScript,
			isSync : true
		});
		
		// copy BASE_STYLE.css
		COPY_FILE({
			from : '../UPPERCASE.IO-IO/R/BASE_STYLE.css',
			to : '../UPPERCASE.IO-CORDOVA-PACK/BASE_STYLE.css',
			isSync : true
		});
	});

	log('DONE.');
});
