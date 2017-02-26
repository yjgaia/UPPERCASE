TEST('IMAGEMAGICK_IDENTIFY', (check) => {

	IMAGEMAGICK_IDENTIFY('UPPERCASE-CORE/sample.png', (features) => {
		console.log(features);
	});

	IMAGEMAGICK_IDENTIFY('UPPERCASE-CORE/sample.png', {
		error : () => {
			console.log('ERROR!');
		},
		success : (features) => {
			console.log(features);
		}
	});
});
