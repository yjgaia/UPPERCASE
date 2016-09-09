Class = CLASS(function(cls) {

	var
	// private static field
	field = 'Value';

	var
	// private static method
	method = function(style) {
		// ...
	};

	// public static field
	cls.field = 'Value';

	// public static method
	cls.method = function(style) {
		// ...
	};

	return {

		// set basic parameters.
		params : function() {
			return {
				// ...
			};
		},

		// preset parameters and parent class.
		preset : function(params) {
			return ParentClass;
		},

		// initialize object.
		init : function(inner, self, params) {
			//REQUIRED: params

			var
			// private field
			field = 'Value';

			var
			// private method
			method = function() {
				// ...
			};
			
			// protected field
			inner.field = 'Value';

			// protected method
			inner.method = function() {
				// ...
			};

			// public field
			self.field = 'Value';

			// public method
			self.method = function() {
				// ...
			};
		}
	};
});
