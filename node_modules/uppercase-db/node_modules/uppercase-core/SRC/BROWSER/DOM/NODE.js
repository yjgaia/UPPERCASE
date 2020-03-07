/*
 * DOM 트리 구조를 정의하기 위한 NODE 클래스
 */
global.NODE = CLASS({

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let wrapperDom;
		let contentDom;
		
		let wrapperEl;
		let contentEl;
		
		let waitingAfterNodes;
		let waitingBeforeNodes;
		
		let parentNode;
		let childNodes = [];
		
		let originDisplay;
		let data;
		
		let isRemoved = false;

		let setWrapperDom = inner.setWrapperDom = (dom) => {
			//REQUIRED: dom

			wrapperDom = dom;
			wrapperEl = dom.getEl();

			on('show', () => {

				EACH(childNodes, (childNode) => {

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

		let setContentDom = inner.setContentDom = (dom) => {
			//REQUIRED: dom

			contentDom = dom;
			contentEl = dom.getEl();
		};

		let setDom = inner.setDom = (dom) => {
			//REQUIRED: dom

			setWrapperDom(dom);
			setContentDom(dom);
		};

		let getWrapperDom = self.getWrapperDom = () => {
			return wrapperDom;
		};

		let getContentDom = self.getContentDom = () => {
			return contentDom;
		};

		let getWrapperEl = self.getWrapperEl = () => {
			return wrapperEl;
		};

		let getContentEl = self.getContentEl = () => {
			return contentEl;
		};

		let attach = (node, index) => {
			//REQUIRED: node
			//OPTIOANL: index

			setParent(node);

			if (index === undefined) {
				parentNode.getChildren().push(self);
			} else {
				parentNode.getChildren().splice(index, 0, self);
			}
			
			fireEvent('attach');

			if (checkIsShowing() === true) {

				fireEvent('show');

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}

			// run after wating after nodes.
			if (waitingAfterNodes !== undefined) {
				EACH(waitingAfterNodes, (node) => {
					after(node);
				});
			}

			// run before wating before nodes.
			if (waitingBeforeNodes !== undefined) {
				EACH(waitingBeforeNodes, (node) => {
					before(node);
				});
			}
			
			parentNode.fireEvent('append');
		};

		let append = self.append = (node) => {
			//REQUIRED: node
			
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

				let splits = String(node === undefined ? '' : node).split('\n');

				EACH(splits, (text, i) => {

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

		let appendTo = self.appendTo = (node) => {
			//REQUIRED: node
			
			let parentEl = node.getContentEl();

			if (parentEl !== undefined) {
				
				parentEl.appendChild(wrapperEl);

				attach(node);
			}

			return self;
		};

		let prepend = self.prepend = (node) => {
			//REQUIRED: node

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

				let splits = String(node === undefined ? '' : node).split('\n');

				REPEAT({
					start : splits.length - 1,
					end : 0
				}, (i) => {

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

		let prependTo = self.prependTo = (node) => {
			//REQUIRED: node

			let parentEl = node.getContentEl();

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

		let after = self.after = (node) => {
			//REQUIRED: node

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
	
						let splits = String(node === undefined ? '' : node).split('\n');
	
						REPEAT({
							start : splits.length - 1,
							end : 0
						}, (i) => {
	
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

		let insertAfter = self.insertAfter = (node) => {
			//REQUIRED: node

			let beforeEl = node.getWrapperEl();
			
			if (beforeEl !== undefined) {
				
				beforeEl.parentNode.insertBefore(wrapperEl, beforeEl.nextSibling);
				
				let nowIndex = FIND({
					array : node.getParent().getChildren(),
					value : self
				});
				
				let toIndex = FIND({
					array : node.getParent().getChildren(),
					value : node
				}) + 1;

				attach(node.getParent(), nowIndex < toIndex ? toIndex - 1 : toIndex);
			}

			return self;
		};

		let before = self.before = (node) => {
			//REQUIRED: node
			
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
	
						let splits = String(node === undefined ? '' : node).split('\n');
	
						EACH(splits, (text, i) => {
	
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

		let insertBefore = self.insertBefore = (node) => {
			//REQUIRED: node

			let afterEl = node.getWrapperEl();

			if (afterEl !== undefined) {
				
				afterEl.parentNode.insertBefore(wrapperEl, afterEl);

				attach(node.getParent(), FIND({
					array : node.getParent().getChildren(),
					value : node
				}));
			}

			return self;
		};

		let getChildren = self.getChildren = () => {
			return childNodes;
		};

		let setParent = self.setParent = (node) => {
			//OPTIONAL: node
			
			if (parentNode !== undefined) {
				REMOVE({
					array : parentNode.getChildren(),
					value : self
				});
			}

			parentNode = node;
		};
		
		let getParent = self.getParent = () => {
			return parentNode;
		};

		let empty = self.empty = () => {
			EACH(childNodes, (child) => {
				child.remove();
			});
		};

		let remove = self.remove = () => {

			if (wrapperEl !== undefined && wrapperEl.parentNode !== TO_DELETE) {

				fireEvent('beforeRemove');

				// empty children.
				empty();
				
				wrapperDom.empty();

				// remove from parent node.
				wrapperEl.parentNode.removeChild(wrapperEl);

				setParent(undefined);

				fireEvent('remove');
			}
			
			if (wrapperEl !== undefined) {
				wrapperEl.remove();
			}
			if (contentEl !== undefined) {
				contentEl.remove();
			}

			// free memory.
			wrapperEl = undefined;
			contentEl = undefined;

			EVENT.removeAll({
				node : self
			});

			EVENT.removeAll({
				node : wrapperDom
			});
			
			// free memory.
			data = undefined;
			
			isRemoved = true;
		};
		
		let checkIsRemoved = self.checkIsRemoved = () => {
			return isRemoved;
		};

		let on = self.on = (eventName, eventHandler) => {
			//REQUIRED: eventName
			//REQUIRED: eventHandler
			
			EVENT({
				node : self,
				name : eventName
			}, eventHandler);
		};

		let off = self.off = (eventName, eventHandler) => {
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
		
		let fireEvent = self.fireEvent = (nameOrParams) => {
			//REQUIRED: nameOrParams
			//REQUIRED: nameOrParams.name	이벤트 이름
			//OPTIONAL: nameOrParams.e
			
			let name;
			let e;
			
			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				name = nameOrParams.name;
				e = nameOrParams.e;
			}
			
			return EVENT.fireAll({
				node : self,
				name : name,
				e : e
			});
		};

		let addStyle = self.addStyle = (style) => {
			//REQUIRED: style

			ADD_STYLE({
				node : self,
				style : style
			});
		};

		let getStyle = self.getStyle = (name) => {
			//REQUIRED: name
			
			if (wrapperEl !== undefined) {

				let styles = wrapperEl.style;

				if (styles !== undefined) {

					let style = styles[name];

					return style === '' ? undefined : (style.substring(style.length - 2) === 'px' ? REAL(style) : style);
				}
			}
		};

		let getWidth = self.getWidth = () => {
			return wrapperEl === undefined ? 0 : wrapperEl.offsetWidth;
		};

		let getInnerWidth = self.getInnerWidth = () => {
			return wrapperEl === undefined ? 0 : wrapperEl.clientWidth;
		};

		let getHeight = self.getHeight = () => {
			return wrapperEl === undefined ? 0 : wrapperEl.offsetHeight;
		};

		let getInnerHeight = self.getInnerHeight = () => {
			return wrapperEl === undefined ? 0 : wrapperEl.clientHeight;
		};

		let getLeft = self.getLeft = () => {

			let left = 0;
			
			let parentEl = wrapperEl;

			do {
				left += parentEl.offsetLeft - (parentEl === document.body ? 0 : parentEl.scrollLeft);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return left;
		};

		let getTop = self.getTop = () => {

			let top = 0;
			
			let parentEl = wrapperEl;

			do {
				top += parentEl.offsetTop - (parentEl === document.body ? 0 : parentEl.scrollTop);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return top;
		};

		let hide = self.hide = () => {
			
			originDisplay = getStyle('display');
			
			if (originDisplay === 'none') {
				originDisplay = undefined;
			}

			addStyle({
				display : 'none'
			});
		};

		let show = self.show = () => {

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

		let checkIsHiding = self.checkIsHiding = () => {
			return checkIsShowing() !== true;
		};

		let checkIsShowing = self.checkIsShowing = () => {

			if (wrapperEl === document.body) {
				return true;
			} else {
				return getStyle('display') !== 'none' && getWidth() > 0;
			}
		};
		
		let scrollTo = self.scrollTo = (params) => {
			//REQUIRED: params
			//OPTIONAL: params.left
			//OPTIONAL: params.top
			
			let left = params.left;
			let top = params.top;
			
			if (contentEl !== undefined) {
			
				if (left !== undefined) {
					contentEl.scrollLeft = left;
				}
				
				if (top !== undefined) {
					contentEl.scrollTop = top;
				}
			}
		};
		
		let getScrollLeft = self.getScrollLeft = () => {
			if (contentEl !== undefined) {
				return contentEl.scrollLeft;
			} else {
				return 0;
			}
		};
		
		let getScrollTop = self.getScrollTop = () => {
			if (contentEl !== undefined) {
				return contentEl.scrollTop;
			} else {
				return 0;
			}
		};
		
		let getScrollWidth = self.getScrollWidth = () => {
			if (contentEl !== undefined) {
				return contentEl.scrollWidth;
			} else {
				return 0;
			}
		};
		
		let getScrollHeight = self.getScrollHeight = () => {
			if (contentEl !== undefined) {
				return contentEl.scrollHeight;
			} else {
				return 0;
			}
		};
		
		let setData = self.setData = (_data) => {
			//REQUIRED: _data
			
			data = _data;
		};
		
		let getData = self.getData = () => {
			return data;
		};
	},

	afterInit : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let style;
		let children;
		let on;

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
			EACH(on, (handler, name) => {
				if (handler !== undefined) {
					self.on(name, handler);
				}
			});
		}

		if (children !== undefined) {
			EACH(children, (child, i) => {
				self.append(child);
			});
		}
	}
});
