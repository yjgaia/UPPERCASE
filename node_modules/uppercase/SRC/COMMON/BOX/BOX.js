/*
 * BOX를 생성합니다.
 */
global.BOX = METHOD((m) => {

	let boxes = {};

	let getAllBoxes = m.getAllBoxes = () => {
		return boxes;
	};

	return {

		run: (boxName) => {
			//REQUIRED: boxName

			let box = (packName) => {
				//REQUIRED: packName

				let packNameSps = packName.split('.');

				let pack;

				EACH(packNameSps, (packNameSp) => {

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

			global[boxName] = boxes[boxName] = box;

			if (CONFIG[boxName] === undefined) {
				CONFIG[boxName] = {};
			}

			FOR_BOX.inject(box);

			return box;
		}
	};
});
