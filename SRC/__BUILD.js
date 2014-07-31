/*
 * distribute UPPERCASE.IO.
 */
global.BUILD = function() {'use strict';

	// load UPPERCASE.JS.
	require('../UPPERCASE.JS-COMMON.js');
	require('../UPPERCASE.JS-NODE.js');

	// load UPPERCASE.IO-UTIL.
	require('../UPPERCASE.IO-UTIL/NODE.js');

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	path = require('path'),

	// log.
	log = function(msg) {
		console.log('UPPERCASE.IO BUILD: ' + msg);
	},

	// scan folder.
	scanFolder = function(path, func) {
		//REQUIRED: path
		//REQUIRED: func

		var
		// folder paths
		folderPaths,

		// extra
		i;

		if (fs.existsSync(path) === true) {

			folderPaths = [];

			fs.readdirSync(path).forEach(function(name) {

				var
				// full path
				fullPath = path + '/' + name;

				if (name[0] !== '.' && name !== 'node_modules') {
					if (fs.statSync(fullPath).isDirectory() === true) {
						folderPaths.push(fullPath);
					} else {
						func(fs.readFileSync(fullPath));
					}
				}
			});

			for ( i = 0; i < folderPaths.length; i += 1) {
				scanFolder(folderPaths[i], func);
			}
		}
	},

	// save.
	save = function(modulePath, script, path) {
		fs.writeFileSync('../UPPERCASE.IO-' + modulePath + '/' + path, script);
	},

	// copy.
	copy = function(from, to) {
		fs.createReadStream(from).pipe(fs.createWriteStream(to));
	},

	// copy folder.
	copyFolder = function(modulePath, from, to) {

		var
		// real to
		realTo = '../UPPERCASE.IO-' + modulePath + '/' + to;

		if (fs.existsSync(modulePath + '/' + from) === true) {

			if (fs.statSync(modulePath + '/' + from).isDirectory() === true) {
				if (fs.existsSync(realTo) !== true || fs.statSync(realTo).isDirectory() !== true) {
					fs.mkdirSync(realTo);
				}
				fs.readdirSync(modulePath + '/' + from).forEach(function(name) {
					if (name[0] !== '.') {
						copyFolder(modulePath, from + '/' + name, to + '/' + name);
					}
				});
			} else if (path.extname(modulePath + '/' + from) === '.js') {
				save(modulePath, MINIFY_JS(fs.readFileSync(modulePath + '/' + from)), to);
			} else {
				copy(modulePath + '/' + from, realTo);
			}
		}
	},

	// dist folder.
	distFolder = function(modulePath, name) {

		var
		// script
		script = '';

		scanFolder(modulePath + '/' + name, function(content) {
			script += content;
		});

		if (script !== '') {
			save(modulePath, MINIFY_JS(script), name + '.js');
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
		copyFolder(name, 'R', 'R');
	};

	// START!

	distModule('BOX');

	(function() {

		var
		// script
		script = '';

		script += fs.readFileSync('BOX/BOX.JS');
		script += fs.readFileSync('BOX/FOR_BOX.JS');

		save('BOX', MINIFY_JS(script), 'CORE.js');
	})();

	distModule('DB');
	distModule('TRANSPORT');
	distModule('ROOM');
	distModule('MODEL');
	distModule('UPLOAD');
	distModule('UTIL');
	distModule('BOOT');

	fs.writeFileSync('../INIT_STYLE.css', MINIFY_CSS(fs.readFileSync('INIT_STYLE.css')));
	fs.writeFileSync('../BOOT.js', MINIFY_JS(fs.readFileSync('BOOT.js')));

	log('DONE.');
};
BUILD();
