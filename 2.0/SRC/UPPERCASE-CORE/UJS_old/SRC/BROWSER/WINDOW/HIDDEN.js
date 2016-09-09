/**
 * check is document hidden.
 */
global.HIDDEN = METHOD(function(m) {
	'use strict';

	var
	// vendors
	vendors = ['webkit', 'moz', 'o', 'ms'],
	
	// hidden attr name
	hiddenAttrName = 'hidden';
	
	if (document['hidden'] === undefined) {
		
		EACH(vendors, function(vendor) {
			
			if (document[vendor + 'Hidden'] !== undefined) {
				
				hiddenAttrName = vendor + 'Hidden';
				
				return false;
			}
		});
	}

	return {

		run : function() {
			
			var
			// is hidden
			isHidden = document[hiddenAttrName];
			
			return isHidden === undefined ? true : isHidden;
		}
	};
});