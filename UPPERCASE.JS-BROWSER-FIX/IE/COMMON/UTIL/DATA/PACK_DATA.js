OVERRIDE(PACK_DATA, function(origin) {
	'use strict';

	/**
	 * Pack data. (fix for IE)
	 */
	global.PACK_DATA = METHOD({

		run : function(data) {
			//REQUIRED: data

			var f = function(data) {

				var
				// result
				result = COPY(data),

				// date attribute names
				dateAttrNames = [];

				EACH(result, function(value, name) {
					if ( value instanceof Date === true) {
						result[name] = parseInt(value.getTime());
						dateAttrNames.push(name);
					} else if (CHECK_IS_DATA(value) === true) {
						result[name] = f(value);
					} else if (CHECK_IS_ARRAY(value) === true) {

						EACH(value, function(v, i) {

							if (CHECK_IS_DATA(v) === true) {
								value[i] = f(v);
							} else {
								// do nothing.
							}
						});
					} else {
						// do nothing.
					}
				});

				result.__DATE_ATTR_NAMES = dateAttrNames;

				return result;
			};

			return f(data);
		}
	});
});
