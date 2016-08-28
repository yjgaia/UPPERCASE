/**
 * BOX를 생성합니다.
 */
global.BOX = METHOD(function(m) {
	'use strict';

	var
	// boxes
	boxes = {},

	// get all boxes.
	getAllBoxes;

	m.getAllBoxes = getAllBoxes = function() {
		return boxes;
	};

	return {

		run : function(boxName) {
			//REQUIRED: boxName

			var
			// box name splits
			boxNameSplits = boxName.split('.'),

			// before box split
			beforeBoxSplit = global,

			// before box name splits str
			beforeBoxNameSplitsStr = '',
			
			// box.
			box = function(packName) {
				//REQUIRED: packName

				var
				// packNameSps
				packNameSps = packName.split('.'),

				// pack
				pack;

				EACH(packNameSps, function(packNameSp) {

					if (pack === undefined) {

						if (box[packNameSp] === undefined) {
							box[packNameSp] = {};
						}
						
						pack = box[packNameSp];
					}
					
					else {

						if (pack[packNameSp] === undefined) {
							pack[packNameSp] = {};
						}
						
						pack = pack[packNameSp];
					}
				});

				return pack;
			};

			box.type = BOX;
			box.boxName = boxName;

			boxes[boxName] = box;

			EACH(boxNameSplits, function(boxNameSplit, i) {

				beforeBoxNameSplitsStr += (beforeBoxNameSplitsStr === '' ? '' : '.') + boxNameSplit;

				if (i < boxNameSplits.length - 1) {

					if (beforeBoxSplit[boxNameSplit] !== undefined) {
						beforeBoxSplit = beforeBoxSplit[boxNameSplit];
					} else {
						beforeBoxSplit = beforeBoxSplit[boxNameSplit] = {};
					}

				} else {

					beforeBoxSplit[boxNameSplit] = box;
				}
			});

			FOR_BOX.inject(box);

			return box;
		}
	};
});
