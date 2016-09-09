TEST('GO', function(ok) {
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
				ok(params.id === '1');
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
		uri : ['go', 'go/{id}'],
		target : TestView
	});

	// go test view.
	GO('go/1');
	
	// go back.
	GO('');
});
