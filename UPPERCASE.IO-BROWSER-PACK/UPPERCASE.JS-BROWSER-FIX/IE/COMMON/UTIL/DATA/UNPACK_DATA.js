OVERRIDE(UNPACK_DATA, function(origin) {
	'use strict';

	/**
	 * Unpack data. (fix for IE)
	 */
	global.UNPACK_DATA = METHOD({

		run : function(data) {
			//REQUIRED: data

			var f = function(data) {

				var
				// result
				result = COPY(data);

				if (result.__DATE_ATTR_NAMES !== undefined) {
					EACH(result.__DATE_ATTR_NAMES, function(dateAttrName, i) {
						result[dateAttrName] = new Date(result[dateAttrName]);
					});
					delete result.__DATE_ATTR_NAMES;
				}

				EACH(result, function(value, name) {
					if (CHECK_IS_DATA(value) === true) {
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

				return result;
			};

			return f(data);
		}
	});
});
