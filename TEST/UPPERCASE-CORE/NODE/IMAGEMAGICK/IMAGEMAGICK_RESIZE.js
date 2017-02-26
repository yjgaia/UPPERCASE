TEST('IMAGEMAGICK_RESIZE', (check) => {

	IMAGEMAGICK_RESIZE({
		srcPath : 'UPPERCASE-CORE/sample.png',
		distPath : 'UPPERCASE-CORE/sample-width-100.png',
		width : 100
	});

	IMAGEMAGICK_RESIZE({
		srcPath : 'UPPERCASE-CORE/sample.png',
		distPath : 'UPPERCASE-CORE/sample-height-100.png',
		height : 100
	}, () => {
		console.log('DONE.');
	});

	IMAGEMAGICK_RESIZE({
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
