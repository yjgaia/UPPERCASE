TEST('OBJECT', (check) => {

	let ParentObject = OBJECT({

		init : (inner, self) => {

			console.log('this is singleton object. object id: ' + self.id);

			check(typeof self.id === 'number');
		}
	}),

	// child object
	ChildObject = OBJECT({

		preset : () => {
			return ParentObject;
		},

		init : (inner, self) => {
			console.log('this is child object.');
		}
	});
});
