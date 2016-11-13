/**
 * HTML img 태그와 대응되는 클래스
 */
global.IMG = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'img'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//REQUIRED: params.src		이미지 경로
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		var
		// src
		src = params.src,

		// el
		el = self.getEl(),

		// get width.
		getWidth,

		// get height.
		getHeight,

		// set size.
		setSize,

		// get src.
		getSrc,

		// set src.
		setSrc;

		//OVERRIDE: self.getWidth
		self.getWidth = getWidth = function() {
			return el.width;
		};

		//OVERRIDE: self.getHeight
		self.getHeight = getHeight = function() {
			return el.height;
		};

		self.setSize = setSize = function(size) {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			var
			// width
			width = size.width,

			// height
			height = size.height;

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		self.getSrc = getSrc = function() {
			return src;
		};

		self.setSrc = setSrc = function(_src) {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});
		};

		if (src !== undefined) {
			setSrc(src);
		}
	}
});
