Simple = CLASS({

	init : function(inner, self, name) {
		//REQUIRED: name

		var
		// public method
		introduce;

		self.introduce = introduce = function() {
			console.log('My name is ' + name + '.');
		};
	}
});

UsingStatic = CLASS(function(cls) {

	var
	// private static property
	kind = 'Human';

	// public static property
	cls.city = 'Seoul';

	return {

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// introduce. (public method)
			introduce;

			self.introduce = introduce = function() {
				console.log('My name is ' + name + ', live in ' + cls.city);
			};
		}
	};
});

UsingPreset = CLASS({

	// basic parameters
	params : function() {
		return {
			// ...
		};
	},

	// preset object
	preset : function(params) {
		return ParentClass;
	},

	init : function(inner, self, params) {
		//REQUIRED: params

		// ...
	}
});
