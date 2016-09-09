/**
 * Event class
 */
global.EVENT = CLASS(function(cls) {
	'use strict';

	var
	// event map
	eventMaps = {},
	
	// vendors
	vendors = ['webkit', 'moz', 'o', 'ms'],
	
	// visibility change event name
	visibilityChangeEventName = 'visibilitychange',

	// fire all.
	fireAll,

	// remove all.
	removeAll,

	// remove.
	remove;
	
	if (document['hidden'] === undefined) {
		
		EACH(vendors, function(vendor) {
			
			if (document[vendor + 'Hidden'] !== undefined) {
				
				visibilityChangeEventName = vendor + 'visibilitychange';
				
				return false;
			}
		});
	}

	cls.fireAll = fireAll = function(nameOrParams) {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//REQUIRED: nameOrParams.name

		var
		// node
		node,

		// name
		name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events,

		// ret
		ret;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			events = eventMap[name];

			if (events !== undefined) {

				EACH(events, function(evt) {

					if (evt.fire() === false) {
						
						ret = false;
					}
				});
			}
		}

		return ret;
	};

	cls.removeAll = removeAll = function(nameOrParams) {
		//OPTIONAL: nameOrParams
		//OPTIONAL: nameOrParams.node
		//OPTIONAL: nameOrParams.name

		var
		// node
		node,

		// name
		name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			if (name !== undefined) {

				events = eventMap[name];

				if (events !== undefined) {

					EACH(events, function(evt) {
						evt.remove();
					});
				}

			} else {

				EACH(eventMap, function(events) {
					EACH(events, function(evt) {
						evt.remove();
					});
				});
			}
		}
	};

	cls.remove = remove = function(params, eventHandler) {
		//REQUIRED: params
		//OPTIONAL: params.node
		//REQUIRED: params.name
		//REQUIRED: eventHandler

		var
		// node
		node = params.node,

		// name
		name = params.name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events;

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			events = eventMap[name];

			if (events !== undefined) {

				EACH(events, function(evt) {
					if (evt.getEventHandler() === eventHandler) {
						evt.remove();
					}
				});
			}
		}
	};

	return {

		init : function(inner, self, nameOrParams, eventHandler) {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node
			//OPTIONAL: nameOrParams.lowNode
			//REQUIRED: nameOrParams.name
			//REQUIRED: eventHandler

			var
			// node
			node,

			// low node
			lowNode,

			// name
			name,

			// node id
			nodeId,

			// event lows
			eventLows = [],

			// sub event
			subEvent,

			// touch start left, top
			startLeft, startTop,

			// last tap time
			lastTapTime,

			// remove from map.
			removeFromMap,

			// remove.
			remove,

			// fire.
			fire,
			
			// get event handler.
			getEventHandler;

			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				node = nameOrParams.node;
				lowNode = nameOrParams.lowNode;
				name = nameOrParams.name;

				if (lowNode === undefined) {
					lowNode = node;
				}
			}

			if (node === undefined) {
				nodeId = 'body';
			} else {
				nodeId = node.id;
			}

			// push event to map.

			if (eventMaps[nodeId] === undefined) {
				eventMaps[nodeId] = {};
			}

			if (eventMaps[nodeId][name] === undefined) {
				eventMaps[nodeId][name] = [];
			}

			eventMaps[nodeId][name].push(self);

			removeFromMap = function() {

				REMOVE({
					array : eventMaps[nodeId][name],
					value : self
				});

				if (eventMaps[nodeId][name].length <= 0) {
					delete eventMaps[nodeId][name];
				}

				if (CHECK_IS_EMPTY_DATA(eventMaps[nodeId]) === true) {
					delete eventMaps[nodeId];
				}
			};

			// tap event (for remove click delay, simulate click event.)
			if (name === 'tap') {

				// when is touch mode or when is exists tap delay (300ms)
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, function(e) {
					if (INFO.checkIsTouchMode() === true && INFO.checkIsExistsTapDelay() === true && e !== undefined) {
						startLeft = e.getLeft();
						startTop = e.getTop();
					}
				}));

				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, function(e, node) {

					var
					// left
					left,

					// top
					top;

					if (INFO.checkIsTouchMode() === true && INFO.checkIsExistsTapDelay() === true && e !== undefined) {

						left = e.getLeft();
						top = e.getTop();

						if (startLeft - 5 <= left && left <= startLeft + 5 && startTop - 5 <= top && top <= startTop + 5) {
						
							if (lastTapTime === undefined || Date.now() - lastTapTime > 100) {
								
								lastTapTime = Date.now();
								
								if (nodeId !== 'body') {
									e.stopDefault();
								}
								
								return eventHandler(e, node);
							}
						}
					}
				}));

				// when is not touch mode or when is not exists tap delay (300ms)
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'click'
				}, function(e, node) {
					
					if (INFO.checkIsTouchMode() !== true || INFO.checkIsExistsTapDelay() !== true) {
						
						if (lastTapTime === undefined || Date.now() - lastTapTime > 100) {
							
							lastTapTime = Date.now();
							
							if (nodeId !== 'body') {
								e.stopDefault();
							}
							
							return eventHandler(e, node);
						}
					}
				}));
			}

			// double tap event (not exists, simulate.)
			else if (name === 'doubletap') {

				subEvent = EVENT({
					node : node,
					name : 'tap'
				}, function(e) {

					if (lastTapTime === undefined) {
						lastTapTime = Date.now();
					} else {

						if (Date.now() - lastTapTime < 600) {
							eventHandler(e, node);
						}

						lastTapTime = undefined;

						// clear text selections.
						getSelection().removeAllRanges();
					}
				});
			}

			// when is not touch mode, touchmove link to mousedown event
			else if (name === 'touchstart') {
				
				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousedown'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// when is not touch mode, touchmove link to mousemove event
			else if (name === 'touchmove') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchmove'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousemove'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// when is not touch mode, touchend link to mouseup event
			else if (name === 'touchend') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseup'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// mouse over event (when is touch mode, link to touchstart event.)
			else if (name === 'mouseover') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() === true) {
						eventHandler(e, node);
					}
				}));

				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseover'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() !== true) {
						eventHandler(e, node);
					}
				}));
			}
			
			// mouse wheel event (FireFox, using 'DOMMouseScroll')
			else if (name === 'mousewheel') {
				
				if (document.onmousewheel !== undefined) {
					eventLows.push(EVENT_LOW(nameOrParams, eventHandler));
				}
				
				// FireFox
				else {
					
					eventLows.push(EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'DOMMouseScroll'
					}, eventHandler));
				}
			}

			// other events
			else if (name !== 'attach' && name !== 'show' && name !== 'remove') {
				eventLows.push(EVENT_LOW(nameOrParams, eventHandler));
			}
			
			self.remove = remove = function() {

				EACH(eventLows, function(eventLow) {
					eventLow.remove();
				});
					
				if (subEvent !== undefined) {
					subEvent.remove();
				}

				removeFromMap();
			};

			self.fire = fire = function() {

				// pass empty e object.
				return eventHandler(EMPTY_E(), node);
			};

			self.getEventHandler = getEventHandler = function() {
				return eventHandler;
			};
		}
	};
});