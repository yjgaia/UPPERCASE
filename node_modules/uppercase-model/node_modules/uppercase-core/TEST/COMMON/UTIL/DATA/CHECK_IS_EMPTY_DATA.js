TEST('CHECK_IS_EMPTY_DATA', (check) => {

	let data = {};

	check(CHECK_IS_EMPTY_DATA(data) === true);
});
