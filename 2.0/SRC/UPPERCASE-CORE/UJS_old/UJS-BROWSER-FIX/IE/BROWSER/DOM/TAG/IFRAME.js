OVERRIDE(IFRAME, function(origin) {
	'use strict';

	/**
	 * Iframe class. (fix for IE)
	 */
	global.IFRAME = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			//OPTIONAL: params
			//OPTIONAL: params.name
			//OPTIONAL: params.style
			//OPTIONAL: params.src

			var
			// name
			name,

			// style
			style,

			// src
			src,

			// set src.
			setSrc;

			// init params.
			if (params !== undefined) {
				name = params.name;
				style = params.style;
				src = params.src;
			}

			if (name !== undefined) {

				inner.setEl(document.createElement('<iframe name="' + name + '" />'));

				inner.setAttr({
					name : 'allowTransparency',
					value : true
				});

				inner.setAttr({
					name : 'frameBorder',
					value : 0
				});
			}

			if (style !== undefined) {
				self.addStyle(style);
			}

			OVERRIDE(self.setSrc, function(origin) {

				self.setSrc = setSrc = function(src) {
					//REQUIRED: src

					// go redirect page.
					origin(BROWSER_CONFIG.fixScriptsFolderPath + '/IE/BROWSER/DOM/TAG/IFRAME_FIX_REDIRECT.html?' + encodeURIComponent(src));
				};
			});

			if (src !== undefined) {
				setSrc(src);
			}
		}
	});
});
