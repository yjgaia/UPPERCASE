/**
 * 주어진 비동기 함수들을 병렬로 실행합니다.
 */
global.PARALLEL = METHOD({

	run : function(dataOrArrayOrCount, funcs) {
		'use strict';
		//OPTIONAL: dataOrArrayOrCount
		//REQUIRED: funcs

		var
		// property count
		propertyCount,
		
		// done count
		doneCount = 0;

		// only funcs
		if (funcs === undefined) {
			funcs = dataOrArrayOrCount;
			
			RUN(function() {

				var
				// length
				length = funcs.length - 1;

				EACH(funcs, function(func, i) {

					if (i < length) {

						func(function() {

							doneCount += 1;

							if (doneCount === length) {
								funcs[length]();
							}
						});
					}
				});
			});
		}
		
		else if (dataOrArrayOrCount === undefined) {
			funcs[1]();
		}
		
		else if (CHECK_IS_DATA(dataOrArrayOrCount) === true) {
			
			propertyCount = COUNT_PROPERTIES(dataOrArrayOrCount);

			if (propertyCount === 0) {
				funcs[1]();
			} else {

				EACH(dataOrArrayOrCount, function(value, name) {

					funcs[0](value, function() {

						doneCount += 1;

						if (doneCount === propertyCount) {
							funcs[1]();
						}
					}, name);
				});
			}
		}
		
		else if (CHECK_IS_ARRAY(dataOrArrayOrCount) === true) {
	
			if (dataOrArrayOrCount.length === 0) {
				funcs[1]();
			} else {

				EACH(dataOrArrayOrCount, function(value, i) {

					funcs[0](value, function() {

						doneCount += 1;

						if (doneCount === dataOrArrayOrCount.length) {
							funcs[1]();
						}
					}, i);
				});
			}
		}
		
		// when dataOrArrayOrCount is count
		else {
	
			if (dataOrArrayOrCount === 0) {
				funcs[1]();
			} else {

				REPEAT(dataOrArrayOrCount, function(i) {

					funcs[0](i, function() {

						doneCount += 1;

						if (doneCount === dataOrArrayOrCount) {
							funcs[1]();
						}
					});
				});
			}
		}
	}
});
