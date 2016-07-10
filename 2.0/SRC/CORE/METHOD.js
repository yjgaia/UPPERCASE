/**
 * 메소드를 생성합니다.
 */
global.METHOD = function(define) {
	'use strict';
	//REQUIRED: define		메소드 정의 구문
	//REQUIRED: define.run	메소드 실행 구문

	var
	// funcs
	funcs,

	// run.
	run,

	// method.
	m = function(params, funcs) {
		//OPTIONAL: params
		//OPTIONAL: funcs

		if (run !== undefined) {
			return run(params, funcs);
		}
	};

	// set type.
	m.type = METHOD;

	// when define is function
	if ( typeof define === 'function') {
		funcs = define(m);
	}

	// when define is function set
	else {
		funcs = define;
	}

	// init funcs.
	if (funcs !== undefined) {
		run = funcs.run;
	}

	return m;
};
