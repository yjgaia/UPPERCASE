TEST('MODEL', (check) => {
	
	// Example Model
	TestBox.TestModel = OBJECT({
	
		preset : () => {
			return TestBox.MODEL;
		},
	
		params : () => {
	
			let validDataSet = {
				name : {
					notEmpty : true,
					size : {
						min : 0,
						max : 255
					}
				},
				age : {
					notEmpty : true,
					integer : true
				},
				isMan : {
					bool : true
				}
			};
	
			return {
				name : 'Test',
				methodConfig : {
					create : {
						valid : VALID(validDataSet)
					},
					update : {
						valid : VALID(validDataSet)
					},
					remove : {
						//role : 'Test'
					}
				}
			};
		}
	});
});
