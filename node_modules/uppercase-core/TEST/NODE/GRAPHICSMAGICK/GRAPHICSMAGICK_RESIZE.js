TEST('GRAPHICSMAGICK_RESIZE', (check) => {

	GRAPHICSMAGICK_RESIZE({
		srcPath : 'UPPERCASE-CORE/sample.png',
		distPath : 'UPPERCASE-CORE/sample-width-100.png',
		width : 100
	});

	GRAPHICSMAGICK_RESIZE({
		srcPath : 'UPPERCASE-CORE/sample.png',
		distPath : 'UPPERCASE-CORE/sample-height-100.png',
		height : 100
	}, () => {
		console.log('DONE.');
	});

	GRAPHICSMAGICK_RESIZE({
		srcPath : 'UPPERCASE-CORE/sample.png',
		distPath : 'UPPERCASE-CORE/sample-square.png',
		width : 100,
		height : 100
	}, {
		error : () => {
			console.log('ERROR!');
		},
		success : () => {
			console.log('DONE.');
		}
	});
});
