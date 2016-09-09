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
		//OPTIONAL: params.href
		//OPTIONAL: params.target
		//OPTIONAL: params.style

		var
		// href
		href,
		
		// target
		target,
		
		// style
		style,
		
		// set href.
		setHref, 

		// tap.
		tap;

		// init params.
		if (params !== undefined) {
			href = params.href;
			target = params.target;
			style = params.style;
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
		//OPTIONAL: params.href
		//OPTIONAL: params.c

		var
		// href
		href,
		
		// is content href
		isContentHref = false,

		// children
		children,
		
		// append.
		append,
		
		// prepend.
		prepend;

		// init params.
		if (params !== undefined) {
			href = params.href;
			children = params.c;
		}

		if (children === undefined && href !== undefined) {
			
			self.append(href);
			
			isContentHref = true;
			
			OVERRIDE(self.append, function(origin) {
				self.append = append = function(node) {
					//REQUIRED: node
					
					if (isContentHref === true) {
						self.empty();
						isContentHref = false;
					}
					
					origin(node);
				};
			});
			
			OVERRIDE(self.prepend, function(origin) {
				self.prepend = prepend = function(node) {
					//REQUIRED: node
					
					if (isContentHref === true) {
						self.empty();
						isContentHref = false;
					}
					
					origin(node);
				};
			});
		}
	}
});
