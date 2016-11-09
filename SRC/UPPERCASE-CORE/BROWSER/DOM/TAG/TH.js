/**
 * HTML th 태그와 대응되는 클래스
 */
global.TH = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'th'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.rowspan
		//OPTIONAL: params.colspan
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		var
		// rowspan
		rowspan,

		// colspan
		colspan;

		// init params.
		if (params !== undefined) {
			rowspan = params.rowspan;
			colspan = params.colspan;
		}

		if (rowspan !== undefined) {
			inner.setAttr({
				name : 'rowspan',
				value : rowspan
			});
		}

		if (colspan !== undefined) {
			inner.setAttr({
				name : 'colspan',
				value : colspan
			});
		}
	}
});
