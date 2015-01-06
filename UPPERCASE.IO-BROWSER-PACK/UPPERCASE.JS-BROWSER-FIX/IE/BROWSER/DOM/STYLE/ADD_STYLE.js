OVERRIDE(ADD_STYLE, function(origin) {
	'use strict';

	/**
	 * add style. (fix for IE)
	 */
	global.ADD_STYLE = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.node
			//REQUIRED: params.style

			var
			// node
			node = params.node,

			// style
			style = params.style,

			// el
			el = node.getWrapperEl();

			EACH(style, function(value, name) {

				var
				// _style
				_style;

				// on display resize
				if (name === 'onDisplayResize') {

					_style = {};
					_style[name] = value;

					// pass to origin method.
					origin({
						node : node,
						style : _style
					});

				} else {

					try {

						// flt -> float
						if (name === 'flt') {
							el.style.styleFloat = value;
						}

						// fix IE PNG transparent background bug.
						else if ((name === 'backgroundImage' || (name === 'background' && value.length >= 7 && value.substring(0, 4) === 'url(')) &&

						// when IE <= 6
						IE.version <= 6) {

							DELAY(function() {

								if (el.style.display === 'none') {
									node.__IS_KEEPED_PNG_FIX = true;
								} else {
									el.style.behavior = 'url(' + BROWSER_CONFIG.fixScriptsFolderPath + '/IE/BROWSER/LIB/iepngfix/iepngfix.htc?' + (CONFIG.version !== undefined ? CONFIG.version : Date.now()) + ');';
								}
							});

						} else if (name === 'display' && value !== 'none') {

							if (node.__IS_KEEPED_PNG_FIX === true) {

								el.style.behavior = 'url(' + BROWSER_CONFIG.fixScriptsFolderPath + '/IE/BROWSER/LIB/iepngfix/iepngfix.htc?' + (CONFIG.version !== undefined ? CONFIG.version : Date.now()) + ');';
								delete node.__IS_KEEPED_PNG_FIX;
							}
						}

						// fix background size using filter.
						else if (name === 'backgroundSize' &&

						// when IE <= 8
						IE.version <= 8) {

							el.style.filter += ' progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + el.style.backgroundImage.replace('url("', '').replace('")', '').replace('url(', '').replace(')', '') + '",sizingMethod="scale");';
							el.style.backgroundImage = 'none';
						}

						// fix cursor pointer.
						else if (name === 'cursor' && value === 'pointer') {
							el.style.cursor = 'hand';
						}

						// fix adding filter.
						else if (name === 'filter') {
							el.style.filter += ' ' + value;
							return;
						}

						_style = {};
						_style[name] = value;

						// next to origin method.
						origin({
							node : node,
							style : _style
						});

					} catch(e) {
						// ignore
					}
				}
			});

		}
	});
});
