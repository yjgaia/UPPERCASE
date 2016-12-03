// load UPPERCASE-CORE
require('../../UPPERCASE-CORE/NODE.js');

/*
 * distribute UPPERCASE.
 */
RUN(function() {
	'use strict';

	var
	// TITLE
	TITLE = 'UPPERCASE-BOOT',
	
	// BASE_CONTENT
	BASE_CONTENT = '/*\n\nWelcome to ' + TITLE + '! (http://uppercase.io)\n\n*/\n\n',
	
	//IMPORT: path
	path = require('path'),

	// log.
	log = function(msg) {
		console.log(TITLE + ' BUILD: ' + msg);
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
	save = function(scriptPaths, path, isToSaveMin) {
		
		var
		// content
		content,
		
		// minify result
		minifyResult;
		
		EACH(scriptPaths, function(scriptPath) {
			
			if (content === undefined) {
				content = BASE_CONTENT;
				
				if (path === 'BROWSER') {
					content += '// 웹 브라우저 환경에서는 window가 global 객체 입니다.\n';
					content += 'global = window;\n\n';
				}
				
			} else {
				content += '\n';
			}
			
			content += READ_FILE({
				path : scriptPath,
				isSync : true
			}).toString();
		});
		
		WRITE_FILE({
			path : '../../' + TITLE + '/' + path + '.js',
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
				path : '../../' + TITLE + '/' + path + '.MIN.js',
				content : content,
				isSync : true
			});
		}
		
		return content;
	},

	// copy folder.
	copyFolder = function(from, to) {

		var
		// real to
		realTo = '../../' + TITLE + '/' + to;

		FIND_FILE_NAMES({
			path : from,
			isSync : true
		}, {

			notExists : function() {
				// ignore.
			},

			success : function(fileNames) {
				EACH(fileNames, function(fileName) {
					COPY_FILE({
						from : from + '/' + fileName,
						to : realTo + '/' + fileName,
						isSync : true
					});
				});
			}
		});

		FIND_FOLDER_NAMES({
			path : from,
			isSync : true
		}, {

			notExists : function() {
				// ignore.
			},

			success : function(folderNames) {
				EACH(folderNames, function(folderName) {
					copyFolder(from + '/' + folderName, to + '/' + folderName, folderName);
				});
			}
		});
	},

	// dist folder.
	distFolder = function(preScripts, name, isToSaveMin) {

		var
		// scripts
		scripts = [];

		scanFolder(scripts, name);

		if (preScripts.length > 0 || scripts.length > 0) {
			save(scripts = COMBINE([preScripts, scripts]), name, isToSaveMin);
		}
		
		return scripts;
	},

	// dist module.
	distModule = function() {

		var
		// common scripts
		commonScripts;
		
		log('START.');

		commonScripts = distFolder([], 'COMMON', true);
		distFolder(commonScripts, 'BROWSER', true);
		distFolder(commonScripts, 'NODE');
		copyFolder('R', 'R');
		
		save(['BROWSER_INIT.js'], 'BROWSER_INIT', true);
		save(['PRINT_HTML_SNAPSHOT.js'], 'PRINT_HTML_SNAPSHOT', false);
		save(['404.js'], '404', false);
	};

	INIT_OBJECTS();

	distModule();

	log('DONE.');
});
