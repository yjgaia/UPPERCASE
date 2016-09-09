TEST('EXPORT_IMG_TYPE', function(ok) {
	'use strict';

	/**
	 * IE6 ~ IE8 need Flash Player.
	 */

	var
	// imgs
	img1, img2,

	// test div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c : [

		// img1
		img1 = IMG({
			src : '/EXAMPLES/BROWSER/GRAPHIC/tricoloring.png'
		}), BR(),

		// img2
		img2 = IMG({
			src : '/EXAMPLES/BROWSER/GRAPHIC/stonehenge.jpg'
		})]
	}).appendTo(BODY);

	NEXT([
	function(next) {

		// export img1 type.
		EXPORT_IMG_TYPE(img1, function(imgType) {

			ok(imgType === 'png');

			next();
		});
	},

	function() {
		return function() {

			// export img2 type.
			EXPORT_IMG_TYPE(img2, function(imgType) {

				ok(imgType === 'jpeg');

				div.remove();
			});
		};
	}]);
});
