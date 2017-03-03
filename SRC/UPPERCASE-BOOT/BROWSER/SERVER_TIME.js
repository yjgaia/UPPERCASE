/*
 * Get server time.
 */
global.SERVER_TIME = METHOD((m) => {

	let diff = 0;

	let setDiff = m.setDiff = (_diff) => {
		diff = _diff;
	};

	return {

		run : (date) => {
			//REQUIRED: date

			return new Date(date.getTime() - diff);
		}
	};
});
