/*
 * 노드의 이벤트 처리를 담당하는 EVENT 클래스
 */
global.EVENT = CLASS((cls) => {

	let eventMaps = {};
	
	let fireAll = cls.fireAll = (nameOrParams) => {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node	이벤트가 등록된 노드
		//REQUIRED: nameOrParams.name	이벤트 이름
		//OPTIONAL: nameOrParams.e

		let node;
		let name;
		let e;
		
		let nodeId;
		
		let eventMap;

		let ret;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
			e = nameOrParams.e;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			let events = eventMap[name];

			if (events !== undefined) {

				EACH(events, (evt) => {

					if (evt.fire(e) === false) {
						
						ret = false;
					}
				});
			}
		}

		return ret;
	};

	let removeAll = cls.removeAll = (nameOrParams) => {
		//OPTIONAL: nameOrParams
		//OPTIONAL: nameOrParams.node	이벤트가 등록된 노드
		//OPTIONAL: nameOrParams.name	이벤트 이름
		
		let node;
		let name;
		
		let nodeId;
		
		let eventMap;

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

				let events = eventMap[name];

				if (events !== undefined) {

					EACH(events, (evt) => {
						evt.remove();
					});
				}

			} else {

				EACH(eventMap, (events) => {
					EACH(events, (evt) => {
						evt.remove();
					});
				});
			}
		}
	};

	let remove = cls.remove = (nameOrParams, eventHandler) => {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node	이벤트가 등록된 노드
		//REQUIRED: nameOrParams.name	이벤트 이름
		//REQUIRED: eventHandler
		
		let node;
		let name;

		let nodeId;
		
		let eventMap;
		
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

			let events = eventMap[name];

			if (events !== undefined) {

				EACH(events, (evt) => {
					if (evt.getEventHandler() === eventHandler) {
						evt.remove();
					}
				});
			}
		}
	};

	return {

		init : (inner, self, nameOrParams, eventHandler) => {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node		이벤트를 등록 및 적용할 노드
			//OPTIONAL: nameOrParams.lowNode	이벤트 '등록'은 node 파라미터에 지정된 노드에 하지만, 실제 이벤트의 동작을 '적용'할 노드는 다른 경우 해당 노드
			//REQUIRED: nameOrParams.name		이벤트 이름
			//REQUIRED: eventHandler
			
			let node;
			let lowNode;
			let name;
			
			let nodeId;
			
			let eventLows = [];
			
			let subEvent;
			
			let lastTapTime;

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

			let removeFromMap = () => {
				
				let events = eventMaps[nodeId][name];
				
				if (events !== undefined) {
					
					REMOVE({
						array : events,
						value : self
					});
	
					if (events.length <= 0) {
						delete eventMaps[nodeId][name];
					}
				}

				if (CHECK_IS_EMPTY_DATA(eventMaps[nodeId]) === true) {
					delete eventMaps[nodeId];
				}
			};

			// tap event (simulate click event.)
			if (name === 'tap') {
				
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'click'
				}, eventHandler));
			}
			
			// when is not touch mode, simulate
			else if (name === 'doubletap') {
				
				if (INFO.checkIsTouchDevice() === true) {
					
					subEvent = EVENT({
						node : node,
						name : 'tap'
					}, (e) => {
	
						if (lastTapTime !== undefined && Date.now() - lastTapTime < 600) {
							
							eventHandler(e, node);
							
							// clear text selections.
							getSelection().removeAllRanges();
							
							lastTapTime = undefined;
						}
						
						else {
							lastTapTime = Date.now();
						}
					});
				}
				
				else {
					eventLows.push(EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'dblclick'
					}, eventHandler));
				}
			}

			// when is not touch mode, touchmove link to mousedown event
			else if (name === 'touchstart') {
				
				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousedown'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
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
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousemove'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
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
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseup'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// mouseover event (when is touch mode, link to touchstart event.)
			else if (name === 'mouseover') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));

				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseover'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
						eventHandler(e, node);
					}
				}));
			}
			
			// mouseout event (when is touch mode, link to touchend event.)
			else if (name === 'mouseout') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));

				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseout'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
						eventHandler(e, node);
					}
				}));
			}
			
			else if (name === 'keydown') {
				
				let lastKey;
				
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'keydown'
				}, (e, node) => {
					if (lastKey !== e.getKey()) {
						eventHandler(e, node);
						lastKey = e.getKey();
					}
				}));
				
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'keyup'
				}, (e, node) => {
					lastKey = undefined;
				}));
			}

			// other events
			else if (name !== 'attach' && name !== 'show' && name !== 'remove') {
				eventLows.push(EVENT_LOW(nameOrParams, eventHandler));
			}
			
			let remove = self.remove = () => {

				EACH(eventLows, (eventLow) => {
					eventLow.remove();
				});
					
				if (subEvent !== undefined) {
					subEvent.remove();
				}

				removeFromMap();
			};

			let fire = self.fire = (e) => {
				//OPTIONAL: e

				// pass empty e object.
				return eventHandler(e !== undefined ? e : EMPTY_E(), node);
			};

			let getEventHandler = self.getEventHandler = () => {
				return eventHandler;
			};
		}
	};
});