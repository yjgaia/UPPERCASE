TEST('OBJECT', function(ok) {
	'use strict';

	var
	// object
	object = OBJECT({

		init : function(inner, self) {

			console.log('this is singleton object. object id: ' + self.id);

			ok( typeof self.id === 'number');
		}
	}),

	// child object
	childObject = OBJECT({

		preset : function() {
			return object;
		},

		init : function(inner, self) {
			console.log('this is child object.');
		}
	});

	// init all singleton objects.
	INIT_OBJECTS();
});
