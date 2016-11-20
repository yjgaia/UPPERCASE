/**
 * HTML iframe 태그와 대응되는 클래스
 */
global.IFRAME = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'iframe',
			style : {
				border : 'none'
			}
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.name
		//OPTIONAL: params.src
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		var
		// name
		name,

		// src
		src,

		// set src.
		setSrc,

		// get src.
		getSrc;

		// init params.
		if (params !== undefined) {
			name = params.name;
			src = params.src;
		}

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

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

		self.getSrc = getSrc = function() {
			return src;
		};
	}
});
