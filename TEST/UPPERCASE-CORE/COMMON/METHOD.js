TEST('METHOD', (check) => {

	// test with one parameter method.
	RUN(() => {

		let Method = METHOD((m) => {

			let staticText = 'static text.';

			let getStaticText = m.getStaticText = () => {
				return staticText;
			};

			return {
				run : (value) => {
					check(value === 'this is value.');
				}
			};
		});

		// run.
		Method('this is value.');

		// check is method.
		check(Method.type === METHOD);

		// static value
		check(Method.getStaticText() === 'static text.');
	});

	// test with multiple parameters method.
	RUN(() => {

		let Method = METHOD({
			run : (params) => {
				check(params.name === 'Hanul');
				check(params.age === 27);
			}
		});

		// run.
		Method({
			name : 'Hanul',
			age : 27
		});
	});

	// test with one function method.
	RUN(() => {

		let Method = METHOD({
			run : (func) => {
				func('ok');
			}
		});

		// run!
		Method((msg) => {
			check(msg === 'ok');
		});
	});

	// test with multiple functions method.
	RUN(() => {

		let Method = METHOD({
			run : (funcs) => {
				funcs.f1('ok');
				funcs.f2('ok');
			}
		});

		// run.
		Method({
			f1 : (msg) => {
				check(msg === 'ok');
			},
			f2 : (msg) => {
				check(msg === 'ok');
			}
		});
	});

	// test with complex method.
	RUN(() => {

		let Method = METHOD({
			run : (params, funcs) => {
				funcs.f1(params.age);
			}
		});

		// run.
		Method({
			name : 'Hanul',
			age : 27
		}, {
			f1 : (msg) => {
				check(msg === 27);
			},
			f2 : (msg) => {
				check(msg === 27);
			}
		});
	});
});
