/**
 * check the pixel is blank pixel.
 */
global.CHECK_IS_BLANK_PIXEL = METHOD(function(m) {
	'use strict';

	var
	// img blank pixel data set
	imgBlankPixelDataSet = {};

	return {

		run : function(params, callback) {
			//REQUIRED: params
			//REQUIRED: params.img
			//OPTIONAL: params.left
			//OPTIONAL: params.right
			//OPTIONAL: params.centerLeft
			//OPTIONAL: params.top
			//OPTIONAL: params.bottom
			//OPTIONAL: params.centerTop
			//REQUIRED: callback

			var
			// img
			img = params.img,

			// left
			left = params.left,

			// right
			right = params.right,

			// center left
			centerLeft = params.centerLeft,

			// top
			top = params.top,

			// bottom
			bottom = params.bottom,

			// center top
			centerTop = params.centerTop;

			EXPORT_IMG_DATA(img, function(imgData) {

				var
				// uri
				uri = img.getSrc(),

				// img blank pixel data
				imgBlankPixelData = imgBlankPixelDataSet[uri],

				// width
				width,

				// heigth
				height,

				// data
				data,

				// img blank pixels
				imgBlankPixels,

				// extras
				i, j;

				// export.
				if (imgBlankPixelData === undefined) {

					width = imgData.width;
					height = imgData.height;
					data = imgData.data;

					imgBlankPixelData = [];
					for ( i = 0; i < height; i += 1) {
						imgBlankPixelData[i] = [];
						for ( j = 0; j < width; j += 1) {
							imgBlankPixelData[i][j] = data[i * width * 4 + j * 4 + 3] < 255 / 2;
						}
					}

					imgBlankPixelDataSet[uri] = imgBlankPixelData;
				}

				// find top.
				if (top !== undefined) {
					imgBlankPixels = imgBlankPixelData[INTEGER(top)];
				} else if (bottom !== undefined) {
					imgBlankPixels = imgBlankPixelData[imgBlankPixelData.length - INTEGER(bottom) - 1];
				} else if (centerTop !== undefined) {
					imgBlankPixels = imgBlankPixelData[INTEGER(imgBlankPixelData.length / 2) + INTEGER(centerTop)];
				}

				// find left.
				if (imgBlankPixels !== undefined) {
					if (left !== undefined) {
						callback(imgBlankPixels[INTEGER(left)]);
					} else if (right !== undefined) {
						callback(imgBlankPixels[imgBlankPixels.length - INTEGER(right) - 1]);
					} else if (centerLeft !== undefined) {
						callback(imgBlankPixels[INTEGER(imgBlankPixels.length / 2) + INTEGER(centerLeft)]);
					}
				}
			});
		}
	};
});
