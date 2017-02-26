TEST('IMAGEMAGICK_READ_METADATA', (check) => {

	IMAGEMAGICK_READ_METADATA('UPPERCASE-CORE/sample.png', (metadata) => {
		console.log(metadata);
	});

	IMAGEMAGICK_READ_METADATA('UPPERCASE-CORE/sample.png', {
		error : () => {
			console.log('ERROR!');
		},
		success : (metadata) => {
			console.log(metadata);
		}
	});
});
