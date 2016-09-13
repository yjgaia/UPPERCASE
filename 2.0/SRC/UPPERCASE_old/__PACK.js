// load UJS.
require(process.env.UPPERCASE_PATH + '/UJS-NODE.js');

// load UPPERCASE-UTIL.
require(process.env.UPPERCASE_PATH + '/UPPERCASE-UTIL/NODE.js');

/*
 * pack UPPERCASE BOX.
 */
RUN(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	path = require('path'),

	// root path
	rootPath = __dirname,

	// box name
	boxName = process.argv[2],

	// common script
	commonScript = '',

	// client script
	clientScript = '',

	// browser script
	browserScript = '',

	// node script
	nodeScript = '',

	// log.
	log = function(msg) {
		console.log('PACK: ' + msg);
	},

	// check is allowed folder name.
	checkIsAllowedFolderName = function(name) {
		//REQUIRED: name

		return (
			// hide folder
			name[0] !== '.' &&

			// node.js module
			name !== 'node_modules' &&

			// not_load
			name !== 'not_load' &&

			// deprecated
			name !== 'deprecated' &&

			// _ folder
			name[0] !== '_'
		);
	},

	// copy folder.
	copyFolder = function(from, to) {

		FIND_FILE_NAMES({
			path : from,
			isSync : true
		}, function(fileNames) {
			EACH(fileNames, function(fileName) {
				COPY_FILE({
					from : from + '/' + fileName,
					to : to + '/' + fileName,
					isSync : true
				});
			});
		});

		FIND_FOLDER_NAMES({
			path : from,
			isSync : true
		}, function(folderNames) {
			EACH(folderNames, function(folderName) {
				copyFolder(from + '/' + folderName, to + '/' + folderName);
			});
		});
	},

	// scan folder.
	scanFolder = function(path, func) {
		//REQUIRED: path
		//REQUIRED: func

		if (CHECK_IS_EXISTS_FILE({
			path : path,
			isSync : true
		}) === true) {

			FIND_FILE_NAMES({
				path : path,
				isSync : true
			}, {

				error : function() {
					// ignore.
				},

				success : function(fileNames) {
					EACH(fileNames, function(fileName) {
						func(path + '/' + fileName);
					});
				}
			});

			FIND_FOLDER_NAMES({
				path : path,
				isSync : true
			}, {

				error : function() {
					// ignore.
				},

				success : function(folderNames) {
					EACH(folderNames, function(folderName) {
						if (checkIsAllowedFolderName(folderName) === true) {
							scanFolder(path + '/' + folderName, func);
						}
					});
				}
			});
		}
	},

	// scan box folder.
	scanBoxFolder = function(fileFunc, folderFunc) {
		//REQUIRED: fileFunc
		//REQUIRED: folderFunc

		FIND_FILE_NAMES({
			path : boxName,
			isSync : true
		}, function(fileNames) {
			EACH(fileNames, function(fileName) {
				fileFunc(boxName + '/' + fileName);
			});
		});

		FIND_FOLDER_NAMES({
			path : boxName,
			isSync : true
		}, function(folderNames) {
			EACH(folderNames, function(folderName) {
				if (folderName !== 'BROWSER' && folderName !== 'COMMON' && folderName !== 'NODE' && folderName !== 'TITANIUM') {
					folderFunc(boxName + '/' + folderName);
				}
			});
		});
	},

	// load for common.
	loadForCommon = function(relativePath) {
		//REQUIRED: relativePath

		if (path.extname(relativePath) === '.js') {

			// add to common script.
			commonScript += READ_FILE({
				path : rootPath + '/' + relativePath,
				isSync : true
			}) + '\n';
		}
	},

	// load for client.
	loadForClient = function(relativePath) {
		//REQUIRED: relativePath

		if (path.extname(relativePath) === '.js') {

			// add to client script.
			clientScript += READ_FILE({
				path : rootPath + '/' + relativePath,
				isSync : true
			}) + '\n';
		}
	},

	// load for browser.
	loadForBrowser = function(relativePath) {
		//REQUIRED: relativePath

		if (path.extname(relativePath) === '.js') {

			// add to browser script.
			browserScript += READ_FILE({
				path : rootPath + '/' + relativePath,
				isSync : true
			}) + '\n';
		}
	},

	// load for node.
	loadForNode = function(relativePath) {
		//REQUIRED: relativePath

		if (path.extname(relativePath) === '.js') {

			// add to node script.
			nodeScript += READ_FILE({
				path : rootPath + '/' + relativePath,
				isSync : true
			}) + '\n';
		}
	},

	// minify
	minify = function() {

		// minify common script.
		commonScript = MINIFY_JS(commonScript);

		// minify client script.
		clientScript = MINIFY_JS(clientScript);

		// minify browser script.
		browserScript = MINIFY_JS(browserScript);

		// minify node script.
		nodeScript = MINIFY_JS(nodeScript);
	};

	// pack box.
	log('PACKING BOX [' + boxName + ']...');

	// load box.
	log('LOADING BOX...');

	// load for browser.
	log('LOADING FOR BROWSER...');
	scanFolder(boxName + '/BROWSER', loadForBrowser);
	log('LOADED FOR BROWSER!');

	// load for common.
	log('LOADING FOR COMMON...');
	scanFolder(boxName + '/COMMON', loadForCommon);
	log('LOADED FOR COMMON!');

	// load for node.
	log('LOADING FOR NODE...');
	scanFolder(boxName + '/NODE', loadForNode);
	log('LOADED FOR NODE!');

	log('LOADED BOX!');

	// minify.
	log('MINIFYING...');
	minify();
	log('MINIFYED!');

	// save box.
	log('SAVING BOX...');
	scanBoxFolder(function(path) {
		COPY_FILE({
			from : path,
			to : '__PACK/' + boxName + '/' + path.substring(boxName.length + 1),
			isSync : true
		});
	}, function(path) {
		copyFolder(path, '__PACK/' + boxName + '/' + path.substring(boxName.length + 1));
	});

	// save common script.
	if (commonScript !== '') {

		log('SAVING COMMON SCRIPT...');

		WRITE_FILE({
			path : '__PACK/' + boxName + '/COMMON.js',
			content : commonScript,
			isSync : true
		});

		log('SAVED COMMON SCRIPT!');
	}

	// save client script.
	if (commonScript !== '' || clientScript !== '') {

		log('SAVING CLIENT SCRIPT...');

		WRITE_FILE({
			path : '__PACK/' + boxName + '/CLIENT.js',
			content : commonScript + clientScript,
			isSync : true
		});

		log('SAVED CLIENT SCRIPT!');
	}

	// save browser script.
	if (commonScript !== '' || clientScript !== '' || browserScript !== '') {

		log('SAVING BROWSER SCRIPT...');

		WRITE_FILE({
			path : '__PACK/' + boxName + '/BROWSER.js',
			content : commonScript + clientScript + browserScript,
			isSync : true
		});

		log('SAVED BROWSER SCRIPT!');
	}

	// save node script.
	if (commonScript !== '' || nodeScript !== '') {

		log('SAVING NODE SCRIPT...');

		WRITE_FILE({
			path : '__PACK/' + boxName + '/NODE.js',
			content : commonScript + nodeScript,
			isSync : true
		});

		log('SAVED NODE SCRIPT!');
	}

	// save node module.
	if (fs.existsSync(boxName + '/NODE/node_modules') === true) {
		log('SAVING NODE MODULES...');
		copyFolder(boxName + '/NODE/node_modules', '__PACK/' + boxName + '/node_modules');
		log('SAVED NODE MODULES!');
	}

	log('SAVED BOX!');

	// done!
	log('PACKED BOX [' + boxName + ']!');
});
