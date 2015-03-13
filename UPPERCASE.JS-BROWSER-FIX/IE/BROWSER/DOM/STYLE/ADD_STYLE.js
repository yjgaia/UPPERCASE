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
			el = node.getWrapperEl(),
			
			// name
			name,
			
			// value
			value,
			
			// _style
			_style;
			
			for (name in style) {
				if (style.hasOwnProperty(name) === true) {
					value = style[name];
	
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
							
							if (IE.version > 8) {
	
								// next to origin method.
								origin({
									node : node,
									style : _style
								});
								
							} else {
								
								if ((name === 'position' && value === 'fixed')
								|| node.__FIXED === true
								|| name === 'flt'
								|| typeof value === 'number'
								|| name === 'backgroundImage') {
								
									// next to origin method.
									origin({
										node : node,
										style : _style
									});
									
								} else {
									el.style[name] = value;
								}
							}
	
						} catch(e) {
							// ignore
						}
					}
				}
			};

		}
	});
});
