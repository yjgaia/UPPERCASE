// load UPPERCASE-CORE
require('../UPPERCASE-CORE/NODE.js');

/*
 * distribute UPPERCASE.
 */
RUN(function() {
	'use strict';
	
	var
	// exec
	exec = require('child_process').exec,
	
	// build.
	build = function(moduleName, next) {
		exec('node __BUILD.js', {
			cwd : __dirname + '/' + moduleName
		}, next);
	},
	
	log = function(msg) {
		console.log('UPPERCASE BUILD: ' + msg);
	};
	
	log('START.');
	
	PARALLEL([
	function(done) {	build('UPPERCASE-CORE', done);		},
	function(done) {	build('UPPERCASE-ROOM', done);		},
	function(done) {	build('UPPERCASE-DB', done);		},
	function(done) {	build('UPPERCASE-MODEL', done);		},
	function(done) {	build('UPPERCASE-BOOT', done);		},
	function() {
		log('DONE.');
	}]);
});