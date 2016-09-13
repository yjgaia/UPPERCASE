TEST('GO_NEW_WIN', function(ok) {
	'use strict';

	var
	// div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c : A({
			style : {
				textDecoration : 'underline'
			},
			c : 'open test view on new window.',
			on : {
				tap : function() {
					GO_NEW_WIN('test');
				}
			}
		})
	}).appendTo(BODY);

	// remove div after 5 seconds.
	DELAY(5, function() {
		div.remove();
	});
});
