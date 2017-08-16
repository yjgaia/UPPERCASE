RUN(() => {
	
	let require = (path) => {
		let script = document.createElement('script');
		script.src = 'UPPERCASE-DB/' + path;
		document.body.appendChild(script);
	};
});