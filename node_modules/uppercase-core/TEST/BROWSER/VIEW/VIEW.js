TEST('VIEW', (check) => {

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

	// test div
	let div = DIV({
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
				tap : () => {
					TestBox.GO('view');
				}
			}
		}), BR(), A({
			style : {
				textDecoration : 'underline'
			},
			c : 'view/1',
			on : {
				tap : () => {
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
});
