/**
 * Iframe class
 */
global.IFRAME = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'iframe',
			style : {
				border : 'none'
			}
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.name
		//OPTIONAL: params.src

		var
		// name
		name,

		// src
		src,

		// set src.
		setSrc,

		// get src.
		getSrc;

		// init params.
		if (params !== undefined) {
			name = params.name;
			src = params.src;
		}

		inner.setAttr({
			name : 'allowTransparency',
			value : true
		});

		inner.setAttr({
			name : 'frameBorder',
			value : 0
		});

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

		self.setSrc = setSrc = function(_src) {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});
		};

		if (src !== undefined) {
			setSrc(src);
		}

		self.getSrc = getSrc = function() {
			return src;
		};
	}
});
