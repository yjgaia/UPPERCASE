// load UPPERCASE-CORE.
require('../UPPERCASE-CORE/NODE.js');

/*
 * distribute UPPERCASE.
 */
RUN(() => {
	
	let exec = require('child_process').exec;
	
	let build = (moduleName, next) => {
		exec('node __BUILD.js', {
			cwd : __dirname + '/' + moduleName
		}, next);
	};
	
	let log = (msg) => {
		console.log('UPPERCASE BUILD: ' + msg);
	};
	
	log('START.');
	
	PARALLEL([
	(done) => {	build('UPPERCASE-CORE', done);	},
	(done) => {	build('UPPERCASE-ROOM', done);	},
	(done) => {	build('UPPERCASE-DB', done);	},
	(done) => {	build('UPPERCASE-MODEL', done);	},
	(done) => {	build('UPPERCASE-BOOT', done);	},
	() => {
		log('DONE.');
	}]);
});