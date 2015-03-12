OVERRIDE(COMBINE, function(origin) {
	'use strict';

	/**
	 * combine data set or arrays.
	 */
	global.COMBINE = METHOD({
	
		run : function(dataSetOrArrays) {
			//REQUIRED: dataSetOrArrays
	
			var
			// first
			first,
	
			// result
			result,
			
			// name
			name,
			
			// i
			i;
	
			if (dataSetOrArrays.length > 0) {
	
				first = dataSetOrArrays[0];
	
				// when first is data
				if (CHECK_IS_DATA(first) === true) {
	
					result = {};
	
					for (name in dataSetOrArrays) {
						if (dataSetOrArrays.hasOwnProperty(name) === true) {
							EXTEND({
								origin : result,
								extend : dataSetOrArrays[name]
							});
						}
					}
				}
	
				// when first is array
				else if (CHECK_IS_ARRAY(first) === true) {
	
					result = [];
					
					for ( i = 0; i < dataSetOrArrays.length; i += 1) {
						EXTEND({
							origin : result,
							extend : dataSetOrArrays[i]
						});
					}
				}
			}
	
			return result;
		}
	});
});
