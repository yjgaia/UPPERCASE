/**
 * HTML canvas 태그와 대응되는 클래스
 */
global.CANVAS = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'canvas'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.width
		//OPTIONAL: params.height
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		var
		// wdith
		width,

		// height
		height,

		// get context.
		getContext,

		// set size.
		setSize,

		// get width.
		getWidth,

		// get height.
		getHeight,

		// get data url.
		getDataURL;

		// init params.
		if (params !== undefined) {
			width = params.width;
			height = params.height;
		}

		self.getContext = getContext = function(contextType) {
			//REQUIRED: contextType
			
			return self.getEl().getContext(contextType);
		};

		self.setSize = setSize = function(size) {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			var
			// el
			el = self.getEl();

			if (size.width !== undefined) {
				width = size.width;
			}

			if (size.height !== undefined) {
				height = size.height;
			}

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		setSize({
			width : width,
			height : height
		});

		self.getWidth = getWidth = function() {
			return width;
		};

		self.getHeight = getHeight = function() {
			return height;
		};

		self.getDataURL = getDataURL = function() {
			return self.getEl().toDataURL();
		};
	}
});
