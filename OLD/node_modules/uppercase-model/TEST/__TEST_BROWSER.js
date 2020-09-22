// UPPERCASE-ROOM/__TEST_BROWSER.js가 먼저 실행되어야 합니다.
RUN(() => {
	
	let require = (path) => {
		let script = document.createElement('script');
		script.src = 'UPPERCASE-MODEL/' + path;
		document.body.appendChild(script);
	};
	
	require('./BROWSER/MODEL.js');
});