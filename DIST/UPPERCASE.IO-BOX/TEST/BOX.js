// BOX Examples

var
// box store
boxStore = TestBox.STORE('testStore');

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
