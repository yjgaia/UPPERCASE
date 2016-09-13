TEST('CLEAR_BOTH', function(ok) {
	'use strict';

	var
	// test div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c : [DIV({
			style : {
				backgroundColor : 'red',
				flt : 'left'
			},
			c : 'LEFT-1-1'
		}), DIV({
			style : {
				backgroundColor : 'orange',
				flt : 'left'
			},
			c : 'LEFT-1-2'
		}), CLEAR_BOTH(), DIV({
			style : {
				backgroundColor : 'blue',
				flt : 'left'
			},
			c : 'LEFT-2-1'
		}), DIV({
			style : {
				backgroundColor : 'green',
				flt : 'left'
			},
			c : 'LEFT-2-2'
		}), CLEAR_BOTH()]
	}).appendTo(BODY);

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
