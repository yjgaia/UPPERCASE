/**
 * HTML optgroup 태그와 대응되는 클래스
 */
global.OPTGROUP = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'optgroup'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.label
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		var
		// label
		label = params.label;

		inner.setAttr({
			name : 'label',
			value : label
		});
	}
});
