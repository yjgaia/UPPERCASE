// load UJS.
require('../UJS-NODE.js');

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
			path : '../UPPERCASE' + (modulePath === '' ? '' : '-' + modulePath) + '/' + path + '.js',
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
				path : '../UPPERCASE' + (modulePath === '' ? '' : '-' + modulePath) + '/' + path + '.MIN.js',
				content : content,
				isSync : true
			});
		}
		
		return content;
	},

	// copy folder.
	copyFolder = function(modulePath, from, to) {

		var
		// real to
		realTo = '../UPPERCASE' + (modulePath === '' ? '' : '-' + modulePath) + '/' + to;

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
	distFolder = function(modulePath, preScripts, name, isToSaveMin) {

		var
		// scripts
		scripts = [];

		scanFolder(scripts, modulePath + '/' + name);

		if (preScripts.length > 0 || scripts.length > 0) {
			save(modulePath, scripts = COMBINE([preScripts, scripts]), name, isToSaveMin);
		}
		
		return scripts;
	},

	// dist module.
	distModule = function(name) {

		var
		// common scripts
		commonScripts,
		
		// client scripts
		clientScripts;

		log('BUILD [' + (name === '' ? 'UPPERCASE' : name) + ']');

		commonScripts = distFolder(name, [], 'COMMON', true);
		clientScripts = distFolder(name, commonScripts, 'CLIENT', true);
		distFolder(name, clientScripts, 'BROWSER', true);
		distFolder(name, commonScripts, 'NODE');
		copyFolder(name, 'R', 'R');
	};

	INIT_OBJECTS();

	distModule('DB');
	distModule('TRANSPORT');
	distModule('ROOM');
	distModule('MODEL');
	distModule('UPLOAD');
	distModule('UTIL');

	distModule('');
	save('', ['UPPERCASE/BOOT.js'], 'BOOT', false);
	save('', ['UPPERCASE/BROWSER_INIT.js'], 'BROWSER_INIT', true);
	save('', ['UPPERCASE/PRINT_HTML_SNAPSHOT.js'], 'PRINT_HTML_SNAPSHOT', false);
	save('', ['UPPERCASE/404.js'], '404', false);
	
	WRITE_FILE({
		path : '../UPPERCASE/R/BASE_STYLE.css',
		content : MINIFY_CSS(READ_FILE({
			path : '../UPPERCASE/R/BASE_STYLE.css',
			isSync : true
		})),
		isSync : true
	});

	// make BROWSER-PACK.
	RUN(function() {

		var
		// init script
		initScript = '',

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

		// load UJS.
		load('UJS-BROWSER.js');
		copyFolder('UJS-BROWSER-FIX');
		
		initScript += 'BOX(\'UPPERCASE\');\n\n';

		// load UPPERCASE-TRANSPORT.
		load('UPPERCASE-TRANSPORT/BROWSER.js');
		copyFolder('UPPERCASE-TRANSPORT/R');

		// load UPPERCASE-ROOM.
		load('UPPERCASE-ROOM/BROWSER.js');

		// load UPPERCASE-MODEL.
		load('UPPERCASE-MODEL/BROWSER.js');

		// load UPPERCASE.
		load('UPPERCASE/BROWSER.js');

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
			from : '../UPPERCASE/R/BASE_STYLE.css',
			to : '../UPPERCASE-BROWSER-PACK/BASE_STYLE.css',
			isSync : true
		});

		// copy BROWSER_INIT
		COPY_FILE({
			from : '../UPPERCASE/BROWSER_INIT.js',
			to : '../UPPERCASE-BROWSER-PACK/INIT.js',
			isSync : true
		});
		COPY_FILE({
			from : '../UPPERCASE/BROWSER_INIT.MIN.js',
			to : '../UPPERCASE-BROWSER-PACK/INIT.MIN.js',
			isSync : true
		});
	});

	log('DONE.');
});
