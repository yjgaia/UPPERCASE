/*
 * 노드에 스타일을 지정합니다.
 */
global.ADD_STYLE = METHOD({
	
	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.node		스타일을 지정할 노드
		//REQUIRED: params.style	스타일 데이터

		let node = params.node;
		let style = params.style;
		
		if (CHECK_IS_ARRAY(style) === true) {
			
			EACH(style, (style) => {
				
				ADD_STYLE({
					node : node,
					style : style
				});
			});
		}
		
		else {
			
			let el = node.getWrapperEl();

			EACH(style, (value, name) => {
				
				if (value !== undefined) {
	
					// on display resize
					if (name === 'onDisplayResize') {
	
						let resizeEvent = EVENT({
							name : 'resize'
						}, RAR(() => {
	
							// when this, value is function.
							ADD_STYLE({
								node : node,
								style : value(WIN_WIDTH(), WIN_HEIGHT())
							});
							
							DELAY(() => {
								ADD_STYLE({
									node : node,
									style : value(WIN_WIDTH(), WIN_HEIGHT())
								});
							});
						}));
	
						// remove resize event when remove node.
						node.on('remove', () => {
							resizeEvent.remove();
						});
	
					} else if (el !== undefined) {
						
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
	}
});
