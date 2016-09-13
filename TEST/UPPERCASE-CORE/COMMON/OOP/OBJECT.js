TEST('OBJECT', function(check) {
	'use strict';

	var
	// parent object
	ParentObject = OBJECT({

		init : function(inner, self) {

			console.log('this is singleton object. object id: ' + self.id);

			check(typeof self.id === 'number');
		}
	}),

	// child object
	ChildObject = OBJECT({

		preset : function() {
			return ParentObject;
		},

		init : function(inner, self) {
			console.log('this is child object.');
		}
	});

	// init all singleton objects.
	INIT_OBJECTS();
});
