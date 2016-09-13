/**
 * For image X2 object
 */
global.X2 = OBJECT({

	init : function(inner, self) {
		'use strict';

		var
		// X2 img data set
		x2ImgDataSet = {},

		// check is cached.
		checkIsCached,

		// export X2 img data.
		exportX2ImgData,

		// switch img.
		switchImg,

		// switch background.
		switchBG;

		self.checkIsCached = checkIsCached = function(uri) {
			return x2ImgDataSet[uri] !== undefined;
		};

		exportX2ImgData = function(img, callback) {

			var
			// uri
			uri = img.getSrc();

			// aleady exported.
			if (checkIsCached(uri) === true) {
				callback(x2ImgDataSet[uri]);
			}

			// export.
			else {

				EXPORT_IMG_DATA(img, function(imgData) {

					var
					// X2 img data
					x2ImgData,

					// width
					width,

					// height
					height,

					// data
					data,

					// X2 canvas
					x2Canvas,

					// X2 context
					x2Context,

					// X2 data
					x2Data,

					// X2 img data url
					x2ImgDataURL,

					// extras
					i, j, k, l;

					width = imgData.width;
					height = imgData.height;
					data = imgData.data;

					x2Canvas = CANVAS();
					x2Canvas.setSize({
						width : width * 2,
						height : height * 2
					});

					x2Context = x2Canvas.getContext();

					x2ImgData = x2Context.createImgData({
						width : width * 2,
						height : height * 2
					});

					x2Data = x2ImgData.data;

					for ( i = 0; i < height; i += 1) {
						for ( j = 0; j < width; j += 1) {

							k = i * width * 4 + j * 4;

							l = (i * 4 * width + j * 2) * 4;
							x2Data[l] = data[k];
							x2Data[l + 1] = data[k + 1];
							x2Data[l + 2] = data[k + 2];
							x2Data[l + 3] = data[k + 3];
							x2Data[l + 4] = data[k];
							x2Data[l + 5] = data[k + 1];
							x2Data[l + 6] = data[k + 2];
							x2Data[l + 7] = data[k + 3];

							l = ((i * 2 + 1) * 2 * width + j * 2) * 4;
							x2Data[l] = data[k];
							x2Data[l + 1] = data[k + 1];
							x2Data[l + 2] = data[k + 2];
							x2Data[l + 3] = data[k + 3];
							x2Data[l + 4] = data[k];
							x2Data[l + 5] = data[k + 1];
							x2Data[l + 6] = data[k + 2];
							x2Data[l + 7] = data[k + 3];
						}
					}

					x2Context.putImgData({
						data : x2ImgData
					});

					callback(x2ImgDataSet[uri] = {
						x2DataURL : x2Canvas.getDataURL(),
						width : width,
						height : height
					});
				});
			}
		};

		self.switchImg = switchImg = function(img) {

			if (img.getEl() !== undefined) {

				exportX2ImgData(img, function(x2ImgData) {

					var
					// X2 data url
					x2DataURL,

					// width
					width,

					// height
					height;

					if (img.getEl() !== undefined) {

						x2DataURL = x2ImgData.x2DataURL;

						width = img.getWidth();
						height = img.getHeight();

						if (width === undefined || width <= 0) {
							width = x2ImgData.width;
						}

						if (height === undefined || height <= 0) {
							height = x2ImgData.height;
						}

						// fix to origin size.
						if (img.getStyle('width') === undefined && img.getStyle('height') === undefined) {
							img.setSize({
								width : width,
								height : height
							});
						}

						// switch X2 image data url.
						img.setX2Src(x2DataURL);
					}
				});
			}
		};

		self.switchBG = switchBG = function(params) {
			//REQUIRED: params
			//REQUIRED: params.node
			//REQUIRED: params.uri

			var
			// node
			node = params.node,

			// img
			img = IMG({
				src : params.uri
			});

			exportX2ImgData(img, function(x2ImgData) {

				var
				// X2 data url
				x2DataURL = x2ImgData.x2DataURL,

				// background size
				backgroundSize = node.getStyle('backgroundSize');

				// fix to origin size.
				if (backgroundSize === undefined || backgroundSize === 'initial') {
					backgroundSize = x2ImgData.width + 'px ' + x2ImgData.height + 'px';
				}

				// switch X2 background.
				ADD_STYLE({
					node : node,
					style : {
						backgroundX2Image : x2DataURL,
						backgroundSize : backgroundSize
					}
				});
			});
		};
	}
});
