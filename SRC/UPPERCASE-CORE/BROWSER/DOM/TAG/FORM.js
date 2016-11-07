/**
 * Form class
 */
global.FORM = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'form'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일을 지정합니다.
		//OPTIONAL: params.action
		//OPTIONAL: params.target
		//OPTIONAL: params.method
		//OPTIONAL: params.enctype
		//OPTIONAL: params.c		자식 노드를 지정합니다. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트를 지정합니다.

		var
		// action
		action,

		// target
		target,

		// method
		method,

		// enctype
		enctype,

		// get data.
		getData,

		// set data.
		setData,

		// submit.
		submit;

		// init params.
		if (params !== undefined) {
			action = params.action;
			target = params.target;
			method = params.method;
			enctype = params.enctype;
		}

		if (action !== undefined) {
			
			inner.setAttr({
				name : 'action',
				value : action
			});
			
		} else {
			
			EVENT({
				node : self,
				name : 'submit'
			}, function(e) {
				e.stop();
			});
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}

		if (method !== undefined) {
			inner.setAttr({
				name : 'method',
				value : method
			});
		}

		if (enctype !== undefined) {
			inner.setAttr({
				name : 'enctype',
				value : enctype
			});
		}

		OVERRIDE(self.setData, function(origin) {
			
			self.getData = getData = function() {
	
				var
				// data
				data = origin(),
	
				// f.
				f = function(node) {
					//REQUIRED: node
	
					EACH(node.getChildren(), function(child) {
	
						if (child.getValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {
							data[child.getName()] = child.getValue();
						}
	
						f(child);
					});
				};
				
				if (data === undefined) {
					data = {};
				}
	
				f(self);
	
				return data;
			};
		});

		OVERRIDE(self.setData, function(origin) {
			
			self.setData = setData = function(data) {
				//REQUIRED: data
	
				var
				// f.
				f = function(node) {
					//REQUIRED: node
	
					EACH(node.getChildren(), function(child) {
	
						var
						// value
						value;
	
						if (child.setValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {
							value = data[child.getName()];
							child.setValue(value === undefined ? '' : value);
						}
	
						f(child);
					});
				};
	
				f(self);
				
				origin(data);
			};
		});

		self.submit = submit = function(isRealSubmit) {
			//OPTIONAL: isRealSubmit

			EVENT.fireAll({
				node : self,
				name : 'submit'
			});

			if (isRealSubmit === true) {
				self.getEl().submit();
			}
		};
	}
});
