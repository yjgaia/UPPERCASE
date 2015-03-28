Blog.MAIN = METHOD({
	
	run : function() {
		'use strict';
		
		Blog.MATCH_VIEW({
			uri : '',
			target : Blog.List
		});
		
		Blog.MATCH_VIEW({
			uri : ['form', 'form/{articleId}'],
			target : Blog.Form
		});
	}
});
