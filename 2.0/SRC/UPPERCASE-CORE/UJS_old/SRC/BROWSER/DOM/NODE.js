/**
 * Node interface
 */
global.NODE = CLASS({

	init : function(inner, self) {
		'use strict';

		var
		// wrapper dom
		wrapperDom,

		// content dom
		contentDom,

		// wrapper el
		wrapperEl,

		// content el
		contentEl,

		// waiting after nodes
		waitingAfterNodes,

		// waiting before nodes
		waitingBeforeNodes,

		// parent node
		parentNode,

		// child nodes
		childNodes = [],

		// origin display
		originDisplay,
		
		// data
		data,

		// set wrapper dom.
		setWrapperDom,

		// set content dom.
		setContentDom,

		// set dom.
		setDom,

		// get wrapper dom.
		getWrapperDom,

		// get content dom.
		getContentDom,

		// get wrapper el.
		getWrapperEl,

		// get content el.
		getContentEl,

		// attach.
		attach,

		// append.
		append,

		// append to.
		appendTo,

		// prepend.
		prepend,

		// prepend to.
		prependTo,

		// after.
		after,

		// insert after.
		insertAfter,

		// before.
		before,

		// insert before.
		insertBefore,

		// remove.
		remove,

		// empty.
		empty,

		// set parent.
		setParent,

		// get parent.
		getParent,

		// get children.
		getChildren,

		// on.
		on,

		// off.
		off,

		// add style.
		addStyle,

		// get style.
		getStyle,

		// get width.
		getWidth,

		// get inner width.
		getInnerWidth,

		// get height.
		getHeight,

		// get inner height.
		getInnerHeight,

		// get left.
		getLeft,

		// get top.
		getTop,

		// hide.
		hide,

		// show.
		show,

		// check is showing.
		checkIsShowing,
		
		// set data.
		setData,
		
		// get data.
		getData,
		
		// scroll to.
		scrollTo,
		
		// get scroll left.
		getScrollLeft,
		
		// get scroll top.
		getScrollTop,
		
		// get scroll width.
		getScrollWidth,
		
		// get scroll height.
		getScrollHeight;

		inner.setWrapperDom = setWrapperDom = function(dom) {
			//REQUIRED: dom

			wrapperDom = dom;
			wrapperEl = dom.getEl();

			originDisplay = getStyle('display');

			on('show', function() {

				EACH(childNodes, function(childNode) {

					if (childNode.checkIsShowing() === true) {

						EVENT.fireAll({
							node : childNode,
							name : 'show'
						});

						EVENT.removeAll({
							node : childNode,
							name : 'show'
						});
					}
				});
			});
		};

		inner.setContentDom = setContentDom = function(dom) {
			//REQUIRED: dom

			contentDom = dom;
			contentEl = dom.getEl();
		};

		inner.setDom = setDom = function(dom) {
			//REQUIRED: dom

			setWrapperDom(dom);
			setContentDom(dom);
		};

		self.getWrapperDom = getWrapperDom = function() {
			return wrapperDom;
		};

		self.getContentDom = getContentDom = function() {
			return contentDom;
		};

		self.getWrapperEl = getWrapperEl = function() {
			return wrapperEl;
		};

		self.getContentEl = getContentEl = function() {
			return contentEl;
		};

		attach = function(node, index) {
			//REQUIRED: node
			//OPTIOANL: index

			setParent(node);

			if (index === undefined) {
				parentNode.getChildren().push(self);
			} else {
				parentNode.getChildren().splice(index, 0, self);
			}
			
			EVENT.fireAll({
				node : self,
				name : 'attach'
			});

			if (checkIsShowing() === true) {

				EVENT.fireAll({
					node : self,
					name : 'show'
				});

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}

			// run after wating after nodes.
			if (waitingAfterNodes !== undefined) {
				EACH(waitingAfterNodes, function(node) {
					after(node);
				});
			}

			// run before wating before nodes.
			if (waitingBeforeNodes !== undefined) {
				EACH(waitingBeforeNodes, function(node) {
					before(node);
				});
			}
		};

		self.append = append = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;

			// append child.
			if (CHECK_IS_DATA(node) === true) {
				node.appendTo(self);
			}

			// append textarea content.
			else if (self.type === TEXTAREA) {

				append(DOM({
					tag : '__STRING',
					__TEXT : String(node === undefined ? '' : node)
				}));
			}

			// append string.
			else {

				splits = String(node === undefined ? '' : node).split('\n');

				EACH(splits, function(text, i) {

					append(DOM({
						tag : '__STRING',
						__TEXT : text
					}));

					if (i < splits.length - 1) {
						append(BR());
					}
				});
			}
		};

		self.appendTo = appendTo = function(node) {
			//REQUIRED: node
			
			var
			// parent el
			parentEl = node.getContentEl();

			if (parentEl !== undefined) {
				
				parentEl.appendChild(wrapperEl);

				attach(node);
			}

			return self;
		};

		self.prepend = prepend = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;

			// prepend child.
			if (CHECK_IS_DATA(node) === true) {
				node.prependTo(self);
			}

			// prepend textarea content.
			else if (self.type === TEXTAREA) {

				prepend(DOM({
					tag : '__STRING',
					__TEXT : String(node === undefined ? '' : node)
				}));
			}

			// prepend string.
			else {

				splits = String(node === undefined ? '' : node).split('\n');

				REPEAT({
					start : splits.length - 1,
					end : 0
				}, function(i) {

					prepend(DOM({
						tag : '__STRING',
						__TEXT : splits[i]
					}));

					if (i < splits.length - 1) {
						prepend(BR());
					}
				});
			}
		};

		self.prependTo = prependTo = function(node) {
			//REQUIRED: node

			var
			// parent el
			parentEl = node.getContentEl();

			if (parentEl !== undefined) {
				
				if (parentEl.childNodes[0] === undefined) {
					parentEl.appendChild(wrapperEl);
				} else {
					parentEl.insertBefore(wrapperEl, parentEl.childNodes[0]);
				}

				attach(node, 0);
			}

			return self;
		};

		self.after = after = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;
			
			if (wrapperEl !== undefined) {
	
				// wait after node.
				if (wrapperEl.parentNode === TO_DELETE) {
	
					if (waitingAfterNodes === undefined) {
						waitingAfterNodes = [];
					}
	
					waitingAfterNodes.push(node);
				}
	
				// after node.
				else {
	
					// after child.
					if (CHECK_IS_DATA(node) === true) {
						node.insertAfter(self);
					}
	
					// after string.
					else {
	
						splits = String(node === undefined ? '' : node).split('\n');
	
						REPEAT({
							start : splits.length - 1,
							end : 0
						}, function(i) {
	
							after(DOM({
								tag : '__STRING',
								__TEXT : splits[i]
							}));
	
							if (i < splits.length - 1) {
								after(BR());
							}
						});
					}
				}
			}
		};

		self.insertAfter = insertAfter = function(node) {
			//REQUIRED: node

			var
			// before el
			beforeEl = node.getWrapperEl(),
			
			// now index
			nowIndex,
			
			// to index
			toIndex;
			
			if (beforeEl !== undefined) {
				
				beforeEl.parentNode.insertBefore(wrapperEl, beforeEl.nextSibling);
				
				nowIndex = FIND({
					array : node.getParent().getChildren(),
					value : self
				});
				
				toIndex = FIND({
					array : node.getParent().getChildren(),
					value : node
				}) + 1;

				attach(node.getParent(), nowIndex < toIndex ? toIndex - 1 : toIndex);
			}

			return self;
		};

		self.before = before = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;
			
			if (wrapperEl !== undefined) {
	
				// wait before node.
				if (wrapperEl.parentNode === TO_DELETE) {
	
					if (waitingBeforeNodes === undefined) {
						waitingBeforeNodes = [];
					}
	
					waitingBeforeNodes.push(node);
				}
	
				// before node.
				else {
	
					// before child.
					if (CHECK_IS_DATA(node) === true) {
						node.insertBefore(self);
					}
	
					// before string.
					else {
	
						splits = String(node === undefined ? '' : node).split('\n');
	
						EACH(splits, function(text, i) {
	
							before(DOM({
								tag : '__STRING',
								__TEXT : text
							}));
	
							if (i < splits.length - 1) {
								before(BR());
							}
						});
					}
				}
			}
		};

		self.insertBefore = insertBefore = function(node) {
			//REQUIRED: node

			var
			// after el
			afterEl = node.getWrapperEl();

			if (afterEl !== undefined) {
				
				afterEl.parentNode.insertBefore(wrapperEl, afterEl);

				attach(node.getParent(), FIND({
					array : node.getParent().getChildren(),
					value : node
				}));
			}

			return self;
		};

		self.remove = remove = function() {

			if (wrapperEl !== undefined && wrapperEl.parentNode !== TO_DELETE) {

				// empty children.
				empty();

				// remove from parent node.
				wrapperEl.parentNode.removeChild(wrapperEl);

				setParent(undefined);

				// fire remove event.
				EVENT.fireAll({
					node : self,
					name : 'remove'
				});

				EVENT.removeAll({
					node : self
				});

				// free memory.
				wrapperEl = undefined;
				contentEl = undefined;
			}
			
			// free memory.
			data = undefined;
		};

		self.empty = empty = function() {
			EACH(childNodes, function(child) {
				child.remove();
			});
		};

		self.setParent = setParent = function(node) {
			//OPTIONAL: node
			
			if (parentNode !== undefined) {
				REMOVE({
					array : parentNode.getChildren(),
					value : self
				});
			}

			parentNode = node;
		};
		
		self.getParent = getParent = function() {
			return parentNode;
		};

		self.getChildren = getChildren = function() {
			return childNodes;
		};

		self.on = on = function(eventName, eventHandler) {
			//REQUIRED: eventName
			//REQUIRED: eventHandler

			EVENT({
				node : self,
				name : eventName
			}, eventHandler);
		};

		self.off = off = function(eventName, eventHandler) {
			//REQUIRED: eventName
			//OPTIONAL: eventHandler

			if (eventHandler !== undefined) {

				EVENT.remove({
					node : self,
					name : eventName
				}, eventHandler);

			} else {

				EVENT.removeAll({
					node : self,
					name : eventName
				});
			}
		};

		self.addStyle = addStyle = function(style) {
			//REQUIRED: style

			ADD_STYLE({
				node : self,
				style : style
			});
		};

		self.getStyle = getStyle = function(name) {
			//REQUIRED: name

			var
			// styles
			styles,

			// style
			style;

			if (wrapperEl !== undefined) {

				styles = wrapperEl.style;

				if (styles !== undefined) {

					style = styles[name];

					return style === '' ? undefined : (style.substring(style.length - 2) === 'px' ? REAL(style) : style);
				}
			}
		};

		self.getWidth = getWidth = function() {
			return wrapperEl.offsetWidth;
		};

		self.getInnerWidth = getInnerWidth = function() {
			return wrapperEl.clientWidth;
		};

		self.getHeight = getHeight = function() {
			return wrapperEl.offsetHeight;
		};

		self.getInnerHeight = getInnerHeight = function() {
			return wrapperEl.clientHeight;
		};

		self.getLeft = getLeft = function() {

			var
			// left
			left = 0,

			// parent el
			parentEl = wrapperEl;

			do {
				left += parentEl.offsetLeft - (parentEl === document.body ? 0 : parentEl.scrollLeft);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return left;
		};

		self.getTop = getTop = function() {

			var
			// top
			top = 0,

			// parent el
			parentEl = wrapperEl;

			do {
				top += parentEl.offsetTop - (parentEl === document.body ? 0 : parentEl.scrollTop);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return top;
		};

		self.hide = hide = function() {

			addStyle({
				display : 'none'
			});
		};

		self.show = show = function() {

			addStyle({
				display : originDisplay === undefined ? '' : originDisplay
			});

			if (checkIsShowing() === true) {

				EVENT.fireAll({
					node : self,
					name : 'show'
				});

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}
		};

		self.checkIsShowing = checkIsShowing = function() {

			if (wrapperEl === document.body) {
				return true;
			} else {
				return parentNode !== undefined && parentNode.checkIsShowing() === true && getStyle('display') !== 'none';
			}
		};
		
		self.setData = setData = function(_data) {
			//REQUIRED: _data
			
			data = _data;
		};
		
		self.getData = getData = function() {
			return data;
		};
		
		self.scrollTo = scrollTo = function(params) {
			//REQUIRED: params
			//OPTIONAL: params.left
			//OPTIONAL: params.top
			
			var
			// left
			left = params.left,
			
			// top
			top = params.top;
			
			if (contentEl !== undefined) {
			
				if (left !== undefined) {
					contentEl.scrollLeft = left;
				}
				
				if (top !== undefined) {
					contentEl.scrollTop = top;
				}
			}
		};
		
		self.scrollTo = scrollTo = function(params) {
			//REQUIRED: params
			//OPTIONAL: params.left
			//OPTIONAL: params.top
			
			var
			// left
			left = params.left,
			
			// top
			top = params.top;
			
			if (contentEl !== undefined) {
			
				if (left !== undefined) {
					contentEl.scrollLeft = left;
				}
				
				if (top !== undefined) {
					contentEl.scrollTop = top;
				}
			}
		};
		
		self.getScrollLeft = getScrollLeft = function() {
			if (contentEl !== undefined) {
				return contentEl.scrollLeft;
			} else {
				return 0;
			}
		};
		
		self.getScrollTop = getScrollTop = function() {
			if (contentEl !== undefined) {
				return contentEl.scrollTop;
			} else {
				return 0;
			}
		};
		
		self.getScrollWidth = getScrollWidth = function() {
			if (contentEl !== undefined) {
				return contentEl.scrollWidth;
			} else {
				return 0;
			}
		};
		
		self.getScrollHeight = getScrollHeight = function() {
			if (contentEl !== undefined) {
				return contentEl.scrollHeight;
			} else {
				return 0;
			}
		};
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.style
		//OPTIONAL: params.c
		//OPTIONAL: params.on

		var
		// style
		style,

		// children
		children,

		// on
		on;

		// init params.
		if (params !== undefined) {
			style = params.style;
			children = params.c === undefined || CHECK_IS_ARRAY(params.c) === true ? params.c : [params.c];
			on = params.on;
		}

		if (style !== undefined) {
			self.addStyle(style);
		}

		if (on !== undefined) {
			EACH(on, function(handler, name) {
				self.on(name, handler);
			});
		}

		if (children !== undefined) {
			EACH(children, function(child, i) {
				self.append(child);
			});
		}
	}
});
