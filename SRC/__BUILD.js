// load UPPERCASE.JS.
require('../UPPERCASE.JS-COMMON.js');
require('../UPPERCASE.JS-NODE.js');

// load UPPERCASE-UTIL.
require('../UPPERCASE-UTIL/NODE.js');

/*
 * distribute UPPERCASE.
 */
RUN(function() {
	'use strict';

	var
	// BASE_CONTENT
	BASE_CONTENT = '/*\n\nWelcome to UPPERCASE! (http://uppercase.io)\n\n*/\n\n',
	
	//IMPORT: path
	path = require('path'),

	// log.
	log = function(msg) {
		console.log('UPPERCASE BUILD: ' + msg);
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
	save = function(modulePath, scriptPaths, path, isToSaveMin) {
		
		var
		// content
		content,
		
		// minify result
		minifyResult;
		
		EACH(scriptPaths, function(scriptPath) {
			
			if (content === undefined) {
				content = BASE_CONTENT;
			} else {
				content += '\n';
			}
			
			content += READ_FILE({
				path : scriptPath,
				isSync : true
			}).toString();
		});
		
		WRITE_FILE({
			path : '../UPPERCASE-' + modulePath + '/' + path + '.js',
			content : content,
			isSync : true
		});
		
		if (isToSaveMin === true) {
			
			content = '';
		
			EACH(scriptPaths, function(scriptPath) {
				content += MINIFY_JS(READ_FILE({
					path : scriptPath,
					isSync : true
				}));
			});
	
			WRITE_FILE({
				path : '../UPPERCASE-' + modulePath + '/' + path + '.MIN.js',
				content : content,
				isSync : true
			});
		}
	},

	// copy folder.
	copyFolder = function(modulePath, from, to) {

		var
		// real to
		realTo = '../UPPERCASE-' + modulePath + '/' + to;

		FIND_FILE_NAMES({
			path : modulePath + '/' + from,
			isSync : true
		}, {

			notExists : function() {
				// ignore.
			},

			success : function(fileNames) {
				EACH(fileNames, function(fileName) {
					COPY_FILE({
						from : modulePath + '/' + from + '/' + fileName,
						to : realTo + '/' + fileName,
						isSync : true
					});
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
	distFolder = function(modulePath, name, isToSaveMin) {

		var
		// scripts
		scripts = [];

		scanFolder(scripts, modulePath + '/' + name);

		if (scripts.length > 0) {
			save(modulePath, scripts, name, isToSaveMin);
		}
	},

	// dist module.
	distModule = function(name) {

		var
		// script
		script = '';

		log('BUILD [' + name + ']');

		distFolder(name, 'COMMON', true);
		distFolder(name, 'BROWSER', true);
		distFolder(name, 'CLIENT', true);
		distFolder(name, 'NODE');
		copyFolder(name, 'R', 'R');
	};

	INIT_OBJECTS();

	distModule('DB');
	distModule('TRANSPORT');
	distModule('ROOM');
	distModule('MODEL');
	distModule('UPLOAD');
	distModule('UTIL');

	distModule('IO');
	save('IO', ['IO/BOOT.js'], 'BOOT', false);
	save('IO', ['IO/BROWSER_INIT.js'], 'BROWSER_INIT', true);
	save('IO', ['IO/PRINT_HTML_SNAPSHOT.js'], 'PRINT_HTML_SNAPSHOT', false);
	
	WRITE_FILE({
		path : '../UPPERCASE-IO/R/BASE_STYLE.css',
		content : MINIFY_CSS(READ_FILE({
			path : '../UPPERCASE-IO/R/BASE_STYLE.css',
			isSync : true
		})),
		isSync : true
	});

	// make BROWSER-PACK.
	RUN(function() {

		var
		// init script
		initScript = 'global = window;\n\n',

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
						to : '../UPPERCASE-BROWSER-PACK/' + path + '/' + fileName,
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

		log('MAKE [BROWSER-PACK]');

		// load UPPERCASE.JS.
		load('UPPERCASE.JS-COMMON.js');
		load('UPPERCASE.JS-BROWSER.js');
		copyFolder('UPPERCASE.JS-BROWSER-FIX');
		
		initScript += 'BOX(\'UPPERCASE\');\n\n';

		// load UPPERCASE-TRANSPORT.
		load('UPPERCASE-TRANSPORT/BROWSER.js');
		copyFolder('UPPERCASE-TRANSPORT/R');

		// load UPPERCASE-ROOM.
		load('UPPERCASE-ROOM/CLIENT.js');
		load('UPPERCASE-ROOM/BROWSER.js');

		// load UPPERCASE-MODEL.
		load('UPPERCASE-MODEL/COMMON.js');
		load('UPPERCASE-MODEL/CLIENT.js');

		// load UPPERCASE-IO.
		load('UPPERCASE-IO/CLIENT.js');
		load('UPPERCASE-IO/BROWSER.js');

		// write IMPORT.js
		WRITE_FILE({
			path : '../UPPERCASE-BROWSER-PACK/IMPORT.js',
			content : initScript,
			isSync : true
		});
		WRITE_FILE({
			path : '../UPPERCASE-BROWSER-PACK/IMPORT.MIN.js',
			content : MINIFY_JS(initScript),
			isSync : true
		});

		// copy BASE_STYLE
		COPY_FILE({
			from : '../UPPERCASE-IO/R/BASE_STYLE.css',
			to : '../UPPERCASE-BROWSER-PACK/BASE_STYLE.css',
			isSync : true
		});

		// copy BROWSER_INIT
		COPY_FILE({
			from : '../UPPERCASE-IO/BROWSER_INIT.js',
			to : '../UPPERCASE-BROWSER-PACK/INIT.js',
			isSync : true
		});
		COPY_FILE({
			from : '../UPPERCASE-IO/BROWSER_INIT.MIN.js',
			to : '../UPPERCASE-BROWSER-PACK/INIT.MIN.js',
			isSync : true
		});
	});

	log('DONE.');
});
