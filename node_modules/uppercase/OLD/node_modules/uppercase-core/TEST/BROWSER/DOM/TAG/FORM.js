TEST('FORM', (check) => {

	let form;
	let input;
	
	let div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c :

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
				}), SELECT({
					name : 'gender',
					c : [OPTGROUP({
						label : 'Male or Female',
						c : [OPTION({
							value : 'male',
							c : 'Male'
						}), OPTION({
							value : 'female',
							c : 'Female'
						})]
					}), OPTGROUP({
						label : 'Man or Woman',
						c : [OPTION({
							value : 'male',
							c : 'Man'
						}), OPTION({
							value : 'female',
							c : 'Woman'
						})]
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
				}), TEXTAREA({
					name : 'profile'
				})]
			}), A({
				c : 'Clear Name',
				on : {
					tap : () => {
						input.setValue('');
					}
				}
			})]
		})
	}).appendTo(BODY);

	form.setData({
		name : 'SYJ',
		gender : 'male',
		age : 26,
		profile : 'Young man.'
	});

	check(CHECK_ARE_SAME([form.getData(), {
		name : 'SYJ',
		gender : 'male',
		age : '26',
		profile : 'Young man.'
	}]) === true);

	check(input.getValue() === 'SYJ');
});
