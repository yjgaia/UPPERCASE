'use strict';

/*

Welcome to UPPERCASE-BOOT! (http://uppercase.io)

*/

RUN(() => {

	// init objects.
	INIT_OBJECTS();
	
	let title = MSG({
		en : 'Resource not found',
		ko : '리소스를 찾을 수 없습니다.'
	});
	
	TITLE(title);
	
	DIV({
		c : title
	}).appendTo(BODY);
});
