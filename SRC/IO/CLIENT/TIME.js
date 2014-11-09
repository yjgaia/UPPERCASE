/**
 * Get time.
 */
global.TIME = TIME = METHOD(function(m) {
	'use strict';

	var
	// diff
	diff = 0,

	// set diff.
	setDiff;

	m.setDiff = setDiff = function(_diff) {
		diff = _diff;
	};

	return {

		run : function(date) {
			//REQUIRED: date

			return new Date(date.getTime() + diff);
		}
	};
});
