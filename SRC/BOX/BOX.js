/**
 * create box.
 */
global.BOX = METHOD(function(m) {
	'use strict';

	var
	// boxes
	boxes = {},

	// get boxes.
	getBoxes;

	m.getBoxes = getBoxes = function() {
		return boxes;
	};

	return {

		run : function(boxName) {
			//REQUIRED: boxName

			var
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

							//LOADED: PACK
							box[packNameSp] = {};
						}
						pack = box[packNameSp];

					} else {

						if (pack[packNameSp] === undefined) {

							//LOADED: PACK
							pack[packNameSp] = {};
						}
						pack = pack[packNameSp];
					}
				});

				return pack;
			},

			// box name splits
			boxNameSplits = boxName.split('.'),

			// before box split
			beforeBoxSplit = global,

			// before box name splits str
			beforeBoxNameSplitsStr = '';

			box.boxName = boxName;
			box.type = BOX;

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
