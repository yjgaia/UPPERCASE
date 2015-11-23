OVERRIDE(COMBINE, function(origin) {
	'use strict';

	/**
	 * async control-flow method that makes stepping through logic easy.
	 */
	global.NEXT = METHOD({
	
		run : function(countOrArray, funcs) {
			//OPTIONAL: countOrArray
			//REQUIRED: funcs
	
			var
			// count
			count,
	
			// array
			array,
			
			// i
			i,
	
			// f.
			f,
			
			// next.
			next;
	
			if (funcs === undefined) {
				funcs = countOrArray;
				countOrArray = undefined;
			}
	
			if (countOrArray !== undefined) {
				if (CHECK_IS_ARRAY(countOrArray) !== true) {
					count = countOrArray;
				} else {
					array = countOrArray;
				}
			}
			
			for ( i = funcs.length - 1; i >= 0; i -= 1) {
	
				// get last function.
				if (i !== 0 && f === undefined) {
					f = funcs[i]();
				}
	
				// pass next function.
				else if (i > 0) {
	
					next = f;
	
					f = funcs[i](next);
	
					f.next = next;
				}
	
				// run first function.
				else {
	
					next = f;
	
					// when next not exists, next is empty function.
					if (next === undefined) {
						next = function() {
							// ignore.
						};
					}
	
					f = funcs[i];
	
					if (count !== undefined) {
	
						RUN(function() {
	
							var
							// i
							i = -1;
	
							RUN(function(self) {
	
								i += 1;
	
								if (i + 1 < count) {
									f(i, self);
								} else {
									f(i, next);
								}
							});
						});
	
					} else if (array !== undefined) {
	
						RUN(function() {
	
							var
							// length
							length = array.length,
	
							// i
							i = -1;
	
							if (length === 0) {
								next();
							} else {
	
								RUN(function(self) {
	
									i += 1;
	
									if (i + 1 < length) {
	
										// if shrink
										if (array.length === length - 1) {
											i -= 1;
											length -= 1;
										}
	
										f(array[i], self, i);
	
									} else {
										f(array[i], next, i);
									}
								});
							}
						});
	
					} else {
	
						f(next);
					}
				}
			}
		}
	});
});
