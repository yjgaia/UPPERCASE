/**
 * Img class
 */
global.IMG = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'img'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.src

		var
		// src
		src = params.src,

		// el
		el = self.getEl(),

		// is X2 switched
		isX2Switched,

		// get width.
		getWidth,

		// get height.
		getHeight,

		// set size.
		setSize,

		// get src.
		getSrc,

		// set x2 src.
		setX2Src,

		// set src.
		setSrc,

		// check is X2.
		checkIsX2;

		//OVERRIDE: self.getWidth
		self.getWidth = getWidth = function() {
			return el.width;
		};

		//OVERRIDE: self.getHeight
		self.getHeight = getHeight = function() {
			return el.height;
		};

		self.setSize = setSize = function(size) {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			var
			// width
			width = size.width,

			// height
			height = size.height;

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		self.getSrc = getSrc = function() {
			return src;
		};

		self.setX2Src = setX2Src = function(x2Src) {
			//REQUIRED: x2Src

			inner.setAttr({
				name : 'src',
				value : x2Src
			});
		};

		self.setSrc = setSrc = function(_src) {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});

			// X2 support.
			if (isX2Switched !== true && BROWSER_CONFIG.isSupportingX2 === true &&

			// after INIT_OBJECTS(), check is hd display.
			INFO.checkIsHDDisplay !== undefined && INFO.checkIsHDDisplay() === true) {

				if (X2.checkIsCached(src) === true) {

					// switch X2 img.
					X2.switchImg(self);

				} else {

					EXPORT_IMG_TYPE(self, function(type) {

						if (type === 'png' || type === 'gif' || type === 'bmp') {

							isX2Switched = true;

							// switch X2 img.
							X2.switchImg(self);
						}
					});
				}
			}
		};

		if (src !== undefined) {
			setSrc(src);
		}

		self.checkIsX2 = checkIsX2 = function() {
			return isX2Switched;
		};
	}
});
