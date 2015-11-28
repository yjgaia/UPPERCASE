OVERRIDE(ADD_STYLE, function(origin) {
	'use strict';

	/**
	 * add style. (fix for Android)
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
				_style,

				// scroll start left
				scrollStartLeft,

				// scroll start top
				scrollStartTop;

				if (name === 'onDisplayResize') {

					_style = {};
					_style[name] = value;

					origin({
						node : node,
						style : _style
					});

				} else {

					try {

						if (ANDROID.version < 3) {

							// fix overflow.
							if (name === 'overflow') {

								EVENT({
									node : node,
									name : 'touchmove'
								}, function(e) {

									if (scrollStartLeft === undefined) {
										scrollStartLeft = el.scrollLeft + e.getLeft();
									} else {
										el.scrollLeft = scrollStartLeft - e.getLeft();
									}

									if (scrollStartTop === undefined) {
										scrollStartTop = el.scrollTop + e.getTop();
									} else {
										el.scrollTop = scrollStartTop - e.getTop();
									}

									e.stopDefault();
								});

								EVENT({
									node : node,
									name : 'touchend'
								}, function(e) {
									scrollStartLeft = undefined;
									scrollStartTop = undefined;
								});
							}

							// fix overflowX.
							else if (name === 'overflowX') {

								EVENT({
									node : node,
									name : 'touchmove'
								}, function(e) {

									if (scrollStartLeft === undefined) {
										scrollStartLeft = el.scrollLeft + e.getLeft();
									} else {
										el.scrollLeft = scrollStartLeft - e.getLeft();
									}

									e.stopDefault();
								});

								EVENT({
									node : node,
									name : 'touchend'
								}, function(e) {
									scrollStartLeft = undefined;
								});
							}

							// fix overflowY.
							else if (name === 'overflowY') {

								EVENT({
									node : node,
									name : 'touchmove'
								}, function(e) {

									if (scrollStartTop === undefined) {
										scrollStartTop = el.scrollTop + e.getTop();
									} else {
										el.scrollTop = scrollStartTop - e.getTop();
									}

									e.stopDefault();
								});

								EVENT({
									node : node,
									name : 'touchend'
								}, function(e) {
									scrollStartTop = undefined;
								});
							}
						}

						_style = {};
						_style[name] = value;

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
