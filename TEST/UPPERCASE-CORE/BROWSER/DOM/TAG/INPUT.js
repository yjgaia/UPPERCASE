TEST('INPUT', (check) => {

	let form;
	let input;
	let select;
	let manOption;
	let womanOption;
	let textarea;

	let div = DIV({
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

	check(input.getValue() === 'HDS');

	manOption.setValue('man');
	womanOption.setValue('woman');

	select.setValue('woman');

	check(select.getValue() === 'woman');
	check(manOption.getValue() === 'man');
	check(womanOption.getValue() === 'woman');

	textarea.setValue('Old woman.');

	check(textarea.getValue() === 'Old woman.');
});
