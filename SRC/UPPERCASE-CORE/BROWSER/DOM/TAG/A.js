/**
 * A class
 */
global.A = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'a'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.href		이동할 경로
		//OPTIONAL: params.target	이동할 타겟
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		var
		// style
		style,
		
		// href
		href,
		
		// target
		target,
		
		// set href.
		setHref, 

		// tap.
		tap;

		// init params.
		if (params !== undefined) {
			style = params.style;
			href = params.href;
			target = params.target;
		}

		self.setHref = setHref = function(href) {
			inner.setAttr({
				name : 'href',
				value : href
			});
		};

		if (href !== undefined) {
			setHref(href);
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}
		
		self.tap = tap = function() {

			EVENT.fireAll({
				node : self,
				name : 'tap'
			});
		};
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.href		이동할 경로
		//OPTIONAL: params.target	이동할 타겟
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		var
		// children
		children,
		
		// href
		href,
		
		// is href content
		isHrefContent = false,
		
		// append.
		append,
		
		// prepend.
		prepend;

		// init params.
		if (params !== undefined) {
			children = params.c;
			href = params.href;
		}

		// 아무런 내용이 없으면 이동할 경로를 그대로 표시합니다.
		if (children === undefined && href !== undefined) {
			
			self.append(href);
			
			isHrefContent = true;
			
			OVERRIDE(self.append, function(origin) {
				self.append = append = function(node) {
					//REQUIRED: node
					
					if (isHrefContent === true) {
						self.empty();
						isHrefContent = false;
					}
					
					origin(node);
				};
			});
			
			OVERRIDE(self.prepend, function(origin) {
				self.prepend = prepend = function(node) {
					//REQUIRED: node
					
					if (isHrefContent === true) {
						self.empty();
						isHrefContent = false;
					}
					
					origin(node);
				};
			});
		}
	}
});
