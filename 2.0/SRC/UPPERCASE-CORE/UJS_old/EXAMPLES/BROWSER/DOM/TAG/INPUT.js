TEST('INPUT', function(ok) {
	'use strict';

	var
	// form
	form,

	// input
	input,

	// select
	select,

	// options
	manOption, womanOption,

	// textarea
	textarea,

	// test div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c : [

		// form
		form = FORM({
			c : [DIV({
				c : [H5({
					c : 'Name'
				}), input = INPUT({
					name : 'name'
				})]
			}), DIV({
				style : {
					marginTop : 10
				},
				c : [H5({
					c : 'Gender'
				}), select = SELECT({
					name : 'gender',
					c : [ manOption = OPTION({
						value : 'male',
						c : 'Male'
					}), womanOption = OPTION({
						value : 'female',
						c : 'Female'
					})]
				})]
			}), DIV({
				style : {
					marginTop : 10
				},
				c : [H5({
					c : 'Age'
				}), INPUT({
					name : 'age'
				})]
			}), DIV({
				style : {
					marginTop : 10
				},
				c : [H5({
					c : 'Profile'
				}), textarea = TEXTAREA({
					name : 'profile'
				})]
			})]
		}),

		// placeholder
		INPUT({
			style : {
				marginTop : 20
			},
			placeholder : 'This is placeholder.'
		})]
	}).appendTo(BODY);

	form.setData({
		name : 'SYJ',
		gender : 'male',
		age : 26,
		profile : 'Young man.'
	});

	input.setValue('HDS');

	ok(input.getValue() === 'HDS');

	manOption.setValue('man');
	womanOption.setValue('woman');

	select.setValue('woman');

	ok(select.getValue() === 'woman');
	ok(manOption.getValue() === 'man');
	ok(womanOption.getValue() === 'woman');

	textarea.setValue('Old woman.');

	ok(textarea.getValue() === 'Old woman.');

	// remove div after 5 seconds.
	DELAY(5, function() {
		div.remove();
	});
});
