TEST('MATCH_VIEW', function(ok) {
	'use strict';

	var
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
	}),

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
		c : [A({
			style : {
				textDecoration : 'underline'
			},
			c : 'view',
			on : {
				tap : function() {
					TestBox.GO('view');
				}
			}
		}), BR(), A({
			style : {
				textDecoration : 'underline'
			},
			c : 'view/1',
			on : {
				tap : function() {
					TestBox.GO('view/1');
				}
			}
		})]
	}).appendTo(BODY);

	// match view.
	TestBox.MATCH_VIEW({
		uri : ['view', 'view/{id}'],
		target : TestView
	});

	// remove div after 5 seconds.
	DELAY(5, function() {
		div.remove();
	});
});
