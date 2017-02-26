'use strict';

let page = require('webpage').create();
let system = require('system');

let isReady = () => {
	return page.evaluate(() => {
		return window.global !== undefined && global.CONNECT_TO_ROOM_SERVER !== undefined && CONNECT_TO_ROOM_SERVER.checkIsConnected() === true;
	});
};

let printHTMLSnapshot = () => {
	
	let html = page.content;
	
	html = html.replace(/<script[^>]+>(.|\n|\r)*?<\/script\s*>/ig, '');
	html = html.replace('<meta name="fragment" content="!">', '');
	
	console.log(html);
};

page.viewportSize = {
	width : 1024,
	height : 768
};

page.open('http://localhost:' + system.args[1] + '/' + (system.args[2] === undefined ? '' : encodeURIComponent(system.args[2][0] === '/' ? system.args[2].substring(1) : system.args[2])), (status) => {
	if (status === 'fail') {
		phantom.exit();
	}
});

let count = 0;

// check is ready per 0.1 seconds. timeout : 10 seconds
let checkReadyInterval = setInterval(() => {
	
	if (isReady()) {
		
		// delay 1 second.
		setTimeout(() => {
			
			printHTMLSnapshot();
			
			phantom.exit();
			
		}, 1000);
		
		clearInterval(checkReadyInterval);
	}
	
	count += 1;
	
	if (count === 100) {
		phantom.exit();
	}
	
}, 100);
