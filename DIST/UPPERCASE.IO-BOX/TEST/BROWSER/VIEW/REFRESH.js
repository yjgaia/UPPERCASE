var
// test div
div;

// test box's view
TestBox.View = CLASS({

	preset : function() {'use strict';
		return TestBox.VIEW;
	},

	init : function(inner, self) {'use strict';

		var
		// on change params.
		onChangeParams,

		// close.
		close;

		// on view.
		console.log('View Opened!');

		self.onChangeParams = onChangeParams = function(params) {
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
TestBox.MATCH_VIEW({
	uris : ['test', 'test/{id}'],
	target : TestBox.View
});

// go test view.
TestBox.GO('test/1');

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
		c : 'Refresh this view.',
		on : {
			tap : function() {
				REFRESH();
			}
		}
	})]
}).appendTo(BODY);

// remove div after 5 seconds.
DELAY(5, function() {
	div.remove();
});
