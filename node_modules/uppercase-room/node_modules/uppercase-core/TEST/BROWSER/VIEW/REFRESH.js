TEST('REFRESH', (check) => {

	let TestView = CLASS({

		preset : () => {
			return VIEW;
		},

		init : (inner, self) => {
			
			// on view.
			console.log('View Opened!');

			let changeParams = self.changeParams = (params) => {
			
				// when change params.
				console.log(params);
			};

			//OVERRIDE: self.close
			let close = self.close = () => {
				// when close.
				console.log('View Closed!');
			};
		}
	});

	// match view.
	TestBox.MATCH_VIEW({
		uri : ['refresh', 'refresh/{id}'],
		target : TestView
	});

	// go test view.
	TestBox.GO('refresh/1');

	let div = DIV({
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
				tap : () => {
					REFRESH();
				}
			}
		})
	}).appendTo(BODY);
});
