TEST('GRAPHICSMAGICK_IDENTIFY', (check) => {

	GRAPHICSMAGICK_IDENTIFY('UPPERCASE-CORE/sample.png', (features) => {
		console.log(features);
	});

	GRAPHICSMAGICK_IDENTIFY('UPPERCASE-CORE/sample.png', {
		error : () => {
			console.log('ERROR!');
		},
		success : (features) => {
			console.log(features);
		}
	});
});
