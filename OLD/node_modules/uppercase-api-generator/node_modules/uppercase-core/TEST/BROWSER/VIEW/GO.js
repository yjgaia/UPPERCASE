TEST('GO', (check) => {

	let TestView = CLASS({

		preset : () => {
			return VIEW;
		},

		init : (inner, self) => {
			
			// on view.
			console.log('View Opened!');

			let changeParams = self.changeParams = (params) => {

				// when change params.
				check(params.id === '1');
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
		uri : ['go', 'go/{id}'],
		target : TestView
	});

	// go test view.
	TestBox.GO('go/1');
	
	// go back.
	GO('');
});
