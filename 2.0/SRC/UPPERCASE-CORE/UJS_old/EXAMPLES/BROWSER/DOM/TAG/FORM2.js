TEST('FORM', function(ok) {
	'use strict';

	var
	// form
	form,

	// input
	input,

	// test div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		}
	}, function() {

		// form
		form = FORM(function() {

			DIV(function() {

				H5(function() {
					return 'Name';
				});

				input = INPUT({
					name : 'name'
				});
			});

			DIV({
				style : {
					marginTop : 10
				}
			}, function() {

				H5(function() {
					return 'Gender';
				});

				SELECT({
					name : 'gender'
				}, function() {

					OPTION({
						value : 'male'
					}, function() {
						return 'Male';
					});

					OPTION({
						value : 'female'
					}, function() {
						return 'Female';
					});
				});
			});

			DIV({
				style : {
					marginTop : 10
				}
			}, function() {

				H5(function() {
					return 'Age';
				});

				INPUT({
					name : 'age'
				});
			});

			DIV({
				style : {
					marginTop : 10
				}
			}, function() {

				H5(function() {
					return 'Profile';
				});

				TEXTAREA({
					name : 'profile'
				});
			});
		});

	}).appendTo(BODY);

	form.setData({
		name : 'SYJ',
		gender : 'male',
		age : 26,
		profile : 'Young man.'
	});

	ok(CHECK_ARE_SAME([form.getData(), {
		name : 'SYJ',
		gender : 'male',
		age : '26',
		profile : 'Young man.'
	}]) === true);

	ok(input.getValue() === 'SYJ');

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
