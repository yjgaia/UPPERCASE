TEST('REFRESH', function(ok) {
	'use strict';

	var
	// div
	div,
	
	// test view
	TestView = CLASS({

		preset : function() {
			'use strict';
			return VIEW;
		},

		init : function(inner, self) {
			'use strict';

			var
			// change params.
			changeParams,

			// close.
			close;

			// on view.
			console.log('View Opened!');

			self.changeParams = changeParams = function(params) {
			
				// when change params.
				console.log(params);
			};

			//OVERRIDE: self.close
			self.close = close = function() {
				// when close.
				console.log('View Closed!');
			};
		}
	});

	// match view.
	MATCH_VIEW({
		uri : ['refresh', 'refresh/{id}'],
		target : TestView
	});

	// go test view.
	GO('refresh/1');

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
			c : 'Refresh this view.',
			on : {
				tap : function() {
					REFRESH();
				}
			}
		})
	}).appendTo(BODY);

	// remove div after 5 seconds.
	DELAY(5, function() {
		div.remove();
	});
});
