OVERRIDE(COPY, function(origin) {
	'use strict';

	/**
	 * copy data or array. (fix for IE)
	 */
	global.COPY = METHOD({

		run : function(data) {
			//REQUIRED: data

			var
			// copy.
			f = function(data) {

				var
				// copy
				copy,

				// value
				value,
				
				// pattern
				pattern,
				
				// flags
				flags,

				// i
				i,
				
				// j
				j;

				if (CHECK_IS_DATA(data) === true) {

					copy = {};

					for (i in data) {
						if (data.hasOwnProperty(i) === true) {
							value = data[i];

							if ( value instanceof Date === true) {
								copy[i] = new Date(value.getTime());
							}
							
							if ( value instanceof RegExp === true) {
								
								pattern = value.toString();
								
								for (j = pattern.length - 1; j >= 0; j -= 1) {
									if (pattern[j] === '/') {
										flags = pattern.substring(j + 1);
										pattern = pattern.substring(1, j);
										break;
									}
								}
								
								copy[i] = new RegExp(pattern, flags);
							}
							
							else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
								copy[i] = f(value);
							}
							
							else {
								copy[i] = value;
							}
						}
					}

				} else if (CHECK_IS_ARRAY(data) === true) {

					copy = [];

					for ( i = 0; i < data.length; i += 1) {
						value = data[i];

						if ( value instanceof Date === true) {
							copy.push(new Date(value.getTime()));
						}
						
						if ( value instanceof RegExp === true) {
							
							pattern = value.toString();
							
							for (j = pattern.length - 1; j >= 0; j -= 1) {
								if (pattern[j] === '/') {
									flags = pattern.substring(j + 1);
									pattern = pattern.substring(1, j);
									break;
								}
							}
							
							copy.push(new RegExp(pattern, flags));
						}
						
						else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
							copy.push(f(value));
						}
						
						else {
							copy.push(value);
						}
					}
				}

				return copy;
			};

			return f(data);
		}
	});
});
