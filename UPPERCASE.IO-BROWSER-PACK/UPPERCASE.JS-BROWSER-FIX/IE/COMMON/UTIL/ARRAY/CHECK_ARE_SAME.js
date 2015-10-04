OVERRIDE(CHECK_ARE_SAME, function(origin) {
	'use strict';

	/**
	 * check are same all elements in array.
	 */
	global.CHECK_ARE_SAME = METHOD({
	
		run : function(array) {
			//REQUIRED: array
	
			var
			// i
			i,
	
			// check two same.
			checkTwoSame = function(a, b) {
				
				var
				// name
				name,
				
				// i
				i;
	
				// when a, b are date
				if ( a instanceof Date === true && b instanceof Date === true) {
					return a.getTime() === b.getTime();
				}
				
				// when a, b are regex
				else if ( a instanceof RegExp === true && b instanceof RegExp === true) {
					return a.toString() === b.toString();
				}
	
				// when a, b are data (JS object)
				else if (CHECK_IS_DATA(a) === true && CHECK_IS_DATA(b) === true) {
					for (name in a) {
						if (a.hasOwnProperty(name) === true) {
							if (checkTwoSame(a[name], b[name]) === false) {
								return false;
							}
						}
					}
				}
	
				// when a, b are array
				else if (CHECK_IS_ARRAY(a) === true && CHECK_IS_ARRAY(b) === true) {
					for ( i = 0; i < a.length; i += 1) {
						if (checkTwoSame(a[i], b[i]) === false) {
							return false;
						}
					}
				}
	
				// when a, b are value
				else {
					return a === b;
				}
			};
	
			if (array.length > 1) {
	
				for ( i = 0; i < array.length; i += 1) {
					if (i < array.length - 1) {
						if (checkTwoSame(array[i], array[i + 1]) === false) {
							return false;
						}
					} else {
						if (checkTwoSame(array[i], array[0]) === false) {
							return false;
						}
					}
				}
			}
	
			return true;
		}
	});
});
