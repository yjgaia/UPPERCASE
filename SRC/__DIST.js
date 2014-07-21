/*
 * distribute UPPERCASE.IO.
 */
global.DIST = function() {'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	path = require('path'),

	// log.
	log = function(msg) {
		console.log('UPPERCASE.IO DIST: ' + msg);
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

	// minify script.
	minifyScript = function(script) {

		var
		// uglify-js
		uglifyJS = require('uglify-js');

		// minify script.
		return uglifyJS.minify(String(script), {
			fromString : true,
			mangle : true
		}).code;
	},

	// minify css.
	minifyCSS = function(cssContent) {

		var
		// sqwish
		sqwish = require('sqwish');

		// minify script.
		return sqwish.minify(String(cssContent));
	},

	// save.
	save = function(modulePath, script, path) {
		fs.writeFileSync('../DIST/UPPERCASE.IO-' + modulePath + '/' + path, script);
	},

	// copy.
	copy = function(from, to) {
		fs.createReadStream(from).pipe(fs.createWriteStream(to));
	},

	// copy folder.
	copyFolder = function(modulePath, from, to) {

		var
		// real to
		realTo = '../DIST/UPPERCASE.IO-' + modulePath + '/' + to;

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
				save(modulePath, minifyScript(fs.readFileSync(modulePath + '/' + from)), to);
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
			save(modulePath, minifyScript(script), name + '.js');
		}
	},

	// dist module.
	distModule = function(name) {

		var
		// script
		script = '';

		log('DISTRIBUTE [' + name + ']');

		distFolder(name, 'COMMON');
		distFolder(name, 'BROWSER');
		distFolder(name, 'CLIENT');
		distFolder(name, 'NODE');
		copyFolder(name, 'R', 'R');
	};

	// START!

	copy('UPPERCASE.JS-COMMON.js', '../DIST/UPPERCASE.JS-COMMON.js');
	copy('UPPERCASE.JS-BROWSER.js', '../DIST/UPPERCASE.JS-BROWSER.js');
	copy('UPPERCASE.JS-NODE.js', '../DIST/UPPERCASE.JS-NODE.js');
	copy('UPPERCASE.JS-PHANTOM.js', '../DIST/UPPERCASE.JS-PHANTOM.js');

	distModule('BOX');

	(function() {

		var
		// script
		script = '';

		script += fs.readFileSync('BOX/BOX.JS');
		script += fs.readFileSync('BOX/FOR_BOX.JS');

		save('BOX', minifyScript(script), 'CORE.js');
	})();

	distModule('DB');
	distModule('TRANSPORT');
	distModule('ROOM');
	distModule('MODEL');
	distModule('UPLOAD');
	distModule('UTIL');

	fs.writeFileSync('../DIST/BASE_STYLE.css', minifyCSS(fs.readFileSync('BASE_STYLE.css')));
	fs.writeFileSync('../DIST/BROWSER_INIT.js', minifyScript(fs.readFileSync('BROWSER_INIT.js')));
	fs.writeFileSync('../DIST/CONFIG.js', minifyScript(fs.readFileSync('CONFIG.js')));
	fs.writeFileSync('../DIST/BOOT.js', minifyScript(fs.readFileSync('BOOT.js')));

	log('DONE.');
};
DIST();
