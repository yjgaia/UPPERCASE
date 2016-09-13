/**
 * Canvas class
 */
global.CANVAS = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'canvas'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.width
		//OPTIONAL: params.height

		var
		// wdith
		width,

		// height
		height,

		// get context.
		getContext,

		// set size.
		setSize,

		// get width.
		getWidth,

		// get height.
		getHeight,

		// get data url.
		getDataURL;

		// init params.
		if (params !== undefined) {
			width = params.width;
			height = params.height;
		}

		self.getContext = getContext = function() {
			return CONTEXT(self);
		};

		self.setSize = setSize = function(size) {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			var
			// el
			el = self.getEl();

			if (size.width !== undefined) {
				width = size.width;
			}

			if (size.height !== undefined) {
				height = size.height;
			}

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		setSize({
			width : width,
			height : height
		});

		self.getWidth = getWidth = function() {
			return width;
		};

		self.getHeight = getHeight = function() {
			return height;
		};

		self.getDataURL = getDataURL = function() {
			return self.getEl().toDataURL();
		};
	}
});
