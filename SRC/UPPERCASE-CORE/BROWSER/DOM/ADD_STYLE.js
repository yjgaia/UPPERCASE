/**
 * 노드에 스타일을 지정합니다.
 */
global.ADD_STYLE = METHOD({
	
	run : function(params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.node		스타일을 지정할 노드
		//REQUIRED: params.style	스타일 데이터

		var
		// node
		node = params.node,

		// style
		style = params.style,

		// el
		el = node.getWrapperEl();

		EACH(style, function(value, name) {

			var
			// resize event
			resizeEvent;
			
			if (value !== undefined) {

				// on display resize
				if (name === 'onDisplayResize') {

					resizeEvent = EVENT({
						name : 'resize'
					}, RAR(function() {

						// when this, value is function.
						ADD_STYLE({
							node : node,
							style : value(WIN_WIDTH(), WIN_HEIGHT())
						});
					}));

					// remove resize event when remove node.
					node.on('remove', function() {
						resizeEvent.remove();
					});

				} else {
					
					// flt -> float
					if (name === 'flt') {
						el.style.cssFloat = value;
					}

					// assume number value is px value.
					else if (typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
						el.style[name] = value + 'px';
					}
					
					// set background image. (not need url prefix.)
					else if (name === 'backgroundImage' && value !== 'none') {
						el.style[name] = 'url(' + value + ')';
					}

					// set normal style.
					else {
						el.style[name] = value;
					}
				}
			}
		});
	}
});
