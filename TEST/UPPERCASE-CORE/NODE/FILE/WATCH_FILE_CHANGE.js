TEST('WATCH_FILE_CHANGE', (check) => {
	
	WATCH_FILE_CHANGE('UPPERCASE-CORE', () => {
		console.log('changed!');
	});
});
