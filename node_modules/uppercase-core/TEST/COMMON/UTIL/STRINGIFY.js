TEST('STRINGIFY', (check) => {

	let now = new Date();
	
	let data = {
		name : 'Yong Jae Sim',
		age : 27,
		country : 'Korea',
		now : now,
		regex : /test/g
	};
	
	let dataStr = STRINGIFY(data);

	check(dataStr === '{"name":"Yong Jae Sim","age":27,"country":"Korea","now":' + now.getTime() + ',"regex":"/test/g","__D":["now"],"__R":["regex"]}');
});
