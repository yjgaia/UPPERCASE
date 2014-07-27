var
// div
div,

// test view
TestView = CLASS({

	preset : function() {'use strict';
		return VIEW;
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
MATCH_VIEW({
	uris : ['test', 'test/{id}'],
	target : TestView
});

// match view.
TestBox.MATCH_VIEW({
	uris : ['test', 'test/{id}'],
	target : TestBox.View
});

// go test view.
GO('test/1');

// go TestBox's test view after 5 seconds.
DELAY(2, function() {
	TestBox.GO('test/2');
});

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
		c : 'open test view on new window.',
		on : {
			tap : function() {
				GO_NEW_WIN('test');
			}
		}
	}), BR(), A({
		style : {
			textDecoration : 'underline'
		},
		c : 'open TestBox\'s test view on new window.',
		on : {
			tap : function() {
				TestBox.GO_NEW_WIN('test/1');
			}
		}
	})]
}).appendTo(BODY);

// remove div after 5 seconds.
DELAY(5, function() {
	div.remove();
});
