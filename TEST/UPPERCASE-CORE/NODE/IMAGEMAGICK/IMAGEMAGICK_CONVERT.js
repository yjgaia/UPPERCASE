TEST('IMAGEMAGICK_CONVERT', (check) => {

	IMAGEMAGICK_CONVERT(['UPPERCASE-CORE/sample.png', '-resize', '100x100\!', 'UPPERCASE-CORE/sample-square.png']);

	IMAGEMAGICK_CONVERT(['UPPERCASE-CORE/sample.png', '-resize', '200x200\!', 'UPPERCASE-CORE/sample-square.png'], () => {
		console.log('DONE.');
	});

	IMAGEMAGICK_CONVERT(['UPPERCASE-CORE/sample.png', '-resize', '300x300\!', 'UPPERCASE-CORE/sample-square.png'], {
		error : () => {
			console.log('ERROR!');
		},
		success : () => {
			console.log('DONE.');
		}
	});
});
