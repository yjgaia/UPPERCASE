TEST('LOOP', function(ok) {
	'use strict';

	var
	// loop
	loop,

	// div
	div = DIV({
		style : {
			position : 'fixed',
			left : 100,
			top : 100,
			width : 100,
			backgroundColor : 'red'
		}
	}).appendTo(BODY),

	// height
	height = 0;

	loop = LOOP(100, {

		start : function() {
			// when start one cycle.
		},

		interval : function() {
			div.addStyle({
				height : height += 1
			});
		},

		end : function() {
			// when end one cycle.
		}
	});

	DELAY(3, function() {

		loop.remove();

		div.remove();
	});
});
