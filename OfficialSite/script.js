// Synchronous highlighting with highlight.js
marked.setOptions({
	highlight : function(code) {
		return hljs.highlightAuto(code).value;
	}
});

INIT_OBJECTS();

global.onload = function() {

	var
	// content
	content,

	// layout
	layout = DIV({
		style : {
			padding : '50px 0',
			margin : 'auto',
			onDisplayResize : function(width, height) {
				if (width > 770) {
					return {
						width : 730
					};
				} else {
					return {
						width : width - 40
					};
				}
			}
		},
		c : [ content = DIV()]
	}).appendTo(BODY);

	GET({
		uri : '/README.md'
	}, function(contentStr) {

		var
		// div
		div = DIV().appendTo(content);

		div.getEl().innerHTML = '<div class="markdown-body">' + marked(contentStr) + '</div>';
	});
};
