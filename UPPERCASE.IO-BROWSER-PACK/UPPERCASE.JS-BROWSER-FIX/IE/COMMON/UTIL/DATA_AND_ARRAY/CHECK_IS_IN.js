/**
 * check is exists value in data or array.
 */
global.CHECK_IS_IN = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.data
		//OPTIONAL: params.array
		//REQUIRED: params.value

		var
		// data
		data = params.data,

		// array
		array = params.array,

		// value
		value = params.value,
		
		// name
		name,
		
		// i
		i;

		if (data !== undefined) {
			
			for (name in data) {
				if (data.hasOwnProperty(name) === true) {
					if (CHECK_ARE_SAME([data[name], value]) === true) {
						return true;
					}
				}
			}
		}

		if (array !== undefined) {
			
			for ( i = 0; i < array.length; i += 1) {
				if (CHECK_ARE_SAME([array[i], value]) === true) {
					return true;
				}
			}
		}
		
		return false;
	}
});
