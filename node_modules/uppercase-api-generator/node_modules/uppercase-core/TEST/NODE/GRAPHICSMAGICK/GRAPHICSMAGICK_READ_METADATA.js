TEST('GRAPHICSMAGICK_READ_METADATA', (check) => {

	GRAPHICSMAGICK_READ_METADATA('UPPERCASE-CORE/sample.png', (metadata) => {
		console.log(metadata);
	});

	GRAPHICSMAGICK_READ_METADATA('UPPERCASE-CORE/sample.png', {
		error : () => {
			console.log('ERROR!');
		},
		success : (metadata) => {
			console.log(metadata);
		}
	});
});
