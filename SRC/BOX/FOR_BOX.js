/**
 * Insert method or class to box.
 */
global.FOR_BOX = FOR_BOX = METHOD({

	run : function(func) {'use strict';
		//REQUIRED: func

		EACH(BOX.getBoxes(), function(box) {
			func(box);
		});
	}
});
