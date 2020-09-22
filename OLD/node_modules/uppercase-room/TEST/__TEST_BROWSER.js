RUN(() => {
	
	let require = (path) => {
		let script = document.createElement('script');
		script.src = 'UPPERCASE-ROOM/' + path;
		document.body.appendChild(script);
	};
	
	require('./BROWSER/CONNECT_TO_ROOM_SERVER.js');
});