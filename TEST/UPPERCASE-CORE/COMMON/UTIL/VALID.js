TEST('VALID', (check) => {

	let data = {
		test : 1,
		parentId : 'test',
		factorCount : 1.2,
		isCompanyFolder : 'true',
		category : 'tile',
		man : {
			name : 'test',
			age : 12
		},
		mans : [{
			name : 'test'
		}]
	};

	let validData = {
		parentId : {
			id : true
		},
		name : {
			notEmpty : true,
			size : {
				min : 0,
				max : 255
			}
		},
		factorCount : {
			notEmpty : true,
			integer : true
		},
		isCompanyFolder : {
			bool : true
		},
		category : {
			notEmpty : true,
			one : ['thing', 'creature', 'item', 'wallItem', 'tile', 'wall']
		},
		man : {
			data : true,
			detail : {
				name : {
					notEmpty : true,
					size : {
						max : 255
					}
				}
			}
		},
		mans : {
			array : true,
			element : {
				data : true,
				detail : {
					name : {
						notEmpty : true,
						size : {
							max : 255
						}
					}
				}
			}
		}
	};

	let validResult = VALID(validData).checkAndWash(data);

	check(CHECK_ARE_SAME([data, {
		parentId : 'test',
		factorCount : 1.2,
		isCompanyFolder : true,
		category : 'tile',
		man : {
			name : 'test'
		},
		mans : [{
			name : 'test'
		}]
	}]));

	check(CHECK_ARE_SAME([validResult.getErrors(), {
		parentId : {
			type : 'id',
			value : 'test'
		},
		name : {
			type : 'notEmpty'
		},
		factorCount : {
			type : 'integer',
			value : 1.2
		}
	}]));

	// test not empty.
	check(VALID.notEmpty('abc') === true);
	check(VALID.notEmpty(undefined) === false);
	check(VALID.notEmpty(null) === false);
	check(VALID.notEmpty(1) === true);
	check(VALID.notEmpty(1.2) === true);
	check(VALID.notEmpty([]) === true);
	check(VALID.notEmpty({}) === true);
	check(VALID.notEmpty(true) === true);
	check(VALID.notEmpty(false) === true);
	check(VALID.notEmpty(new Date()) === true);

	// test regex valid.
	check(VALID.regex({
		pattern : /[a-z][a-z][a-z]/,
		value : 'abc'
	}) === true);

	// test string size.
	check(VALID.size({
		min : 1,
		max : 2,
		value : 'abc'
	}) === false);
	check(VALID.size({
		min : 1,
		max : 4,
		value : 'abc'
	}) === true);
	check(VALID.size({
		min : 4,
		max : 1,
		value : 'abc'
	}) === false);
	check(VALID.size({
		min : 1,
		value : 'abc'
	}) === true);
	check(VALID.size({
		max : 4,
		value : 'abc'
	}) === true);
	check(VALID.size({
		min : 4,
		value : 'abc'
	}) === false);
	check(VALID.size({
		max : 1,
		value : 'abc'
	}) === false);
	check(VALID.size({
		value : 'abc'
	}) === true);

	// test integer.
	check(VALID.integer('abc') === false);
	check(VALID.integer(undefined) === false);
	check(VALID.integer(null) === false);
	check(VALID.integer(1) === true);
	check(VALID.integer(1.2) === false);
	check(VALID.integer([]) === false);
	check(VALID.integer({}) === false);
	check(VALID.integer(true) === false);
	check(VALID.integer(false) === false);
	check(VALID.integer(new Date()) === false);

	// test real.
	check(VALID.real('abc') === false);
	check(VALID.real(undefined) === false);
	check(VALID.real(null) === false);
	check(VALID.real(1) === true);
	check(VALID.real(1.2) === true);
	check(VALID.real([]) === false);
	check(VALID.real({}) === false);
	check(VALID.real(true) === false);
	check(VALID.real(false) === false);
	check(VALID.real(new Date()) === false);

	// test boolean.
	check(VALID.bool('abc') === false);
	check(VALID.bool(undefined) === false);
	check(VALID.bool(null) === false);
	check(VALID.bool(1) === false);
	check(VALID.bool(1.2) === false);
	check(VALID.bool([]) === false);
	check(VALID.bool({}) === false);
	check(VALID.bool(true) === true);
	check(VALID.bool(false) === true);
	check(VALID.bool(new Date()) === false);

	// test Date type.
	check(VALID.date('Sun Aug 10 2014 01:22:54 GMT+0900') === true);
	check(VALID.date('abc') === false);
	check(VALID.date(undefined) === false);
	check(VALID.date(null) === false);
	check(VALID.date([]) === false);
	check(VALID.date({}) === false);
	check(VALID.date(true) === false);
	check(VALID.date(false) === false);
	check(VALID.date(new Date()) === true);

	// test min.
	check(VALID.min({
		min : 3,
		value : 'abc'
	}) === false);
	check(VALID.min({
		min : 3,
		value : undefined
	}) === false);
	check(VALID.min({
		min : 3,
		value : null
	}) === false);
	check(VALID.min({
		min : 3,
		value : 1
	}) === false);
	check(VALID.min({
		min : 1,
		value : 3
	}) === true);
	check(VALID.min({
		min : 3,
		value : 1.2
	}) === false);
	check(VALID.min({
		min : 1.2,
		value : 3
	}) === true);
	check(VALID.min({
		min : 1.2,
		value : []
	}) === false);
	check(VALID.min({
		min : 1.2,
		value : {}
	}) === false);
	check(VALID.min({
		min : 1.2,
		value : true
	}) === false);
	check(VALID.min({
		min : 1.2,
		value : false
	}) === false);
	check(VALID.min({
		min : 1.2,
		value : new Date()
	}) === false);

	// test max.
	check(VALID.max({
		max : 3,
		value : 'abc'
	}) === false);
	check(VALID.max({
		max : 3,
		value : undefined
	}) === false);
	check(VALID.max({
		max : 3,
		value : null
	}) === false);
	check(VALID.max({
		max : 3,
		value : 1
	}) === true);
	check(VALID.max({
		max : 1,
		value : 3
	}) === false);
	check(VALID.max({
		max : 3,
		value : 1.2
	}) === true);
	check(VALID.max({
		max : 1.2,
		value : 3
	}) === false);
	check(VALID.max({
		max : 1.2,
		value : []
	}) === false);
	check(VALID.max({
		max : 1.2,
		value : {}
	}) === false);
	check(VALID.max({
		max : 1.2,
		value : true
	}) === false);
	check(VALID.max({
		max : 1.2,
		value : false
	}) === false);
	check(VALID.max({
		max : 1.2,
		value : new Date()
	}) === false);

	// test email.
	check(VALID.email('this@is.email') === true);
	check(VALID.email('abc') === false);
	check(VALID.email(undefined) === false);
	check(VALID.email(null) === false);
	check(VALID.email(1) === false);
	check(VALID.email(1.2) === false);
	check(VALID.email([]) === false);
	check(VALID.email({}) === false);
	check(VALID.email(true) === false);
	check(VALID.email(false) === false);
	check(VALID.email(new Date()) === false);

	// test url.
	check(VALID.url('http://www.btncafe.com') === true);
	check(VALID.url('abc') === false);
	check(VALID.url(undefined) === false);
	check(VALID.url(null) === false);
	check(VALID.url(1) === false);
	check(VALID.url(1.2) === false);
	check(VALID.url([]) === false);
	check(VALID.url({}) === false);
	check(VALID.url(true) === false);
	check(VALID.url(false) === false);
	check(VALID.url(new Date()) === false);

	// test username.
	check(VALID.username('btncafe-88_88') === true);
	check(VALID.username('abc') === true);
	check(VALID.username(undefined) === false);
	check(VALID.username(null) === false);
	check(VALID.username(1) === false);
	check(VALID.username(1.2) === false);
	check(VALID.username([]) === false);
	check(VALID.username({}) === false);
	check(VALID.username(true) === false);
	check(VALID.username(false) === false);
	check(VALID.username(new Date()) === false);

	// test id.
	check(VALID.mongoId('51889ace0000001106000002') === true);
	check(VALID.mongoId('abc') === false);
	check(VALID.mongoId(undefined) === false);
	check(VALID.mongoId(null) === false);
	check(VALID.mongoId(1) === false);
	check(VALID.mongoId(1.2) === false);
	check(VALID.mongoId([]) === false);
	check(VALID.mongoId({}) === false);
	check(VALID.mongoId(true) === false);
	check(VALID.mongoId(false) === false);
	check(VALID.mongoId(new Date()) === false);

	// test one.
	check(VALID.one({
		value : 2,
		array : [1, 2, 3]
	}) === true);

	check(VALID.one({
		value : 4,
		array : [1, 2, 3]
	}) === false);

	// test array.
	check(VALID.array(2) === false);
	check(VALID.array([1, 2, 3]) === true);
	check(VALID.array({
		a : 1,
		b : 2
	}) === false);

	// test data.
	check(VALID.data(2) === false);
	check(VALID.data([1, 2, 3]) === false);
	check(VALID.data({
		a : 1,
		b : 2
	}) === true);

	// test element.
	check(VALID.element({
		array : [1, 2, 3],
		validData : {
			integer : true
		}
	}) === true);

	check(VALID.element({
		array : [1, 2, 3],
		validData : {
			bool : true
		}
	}) === false);

	// test property.
	check(VALID.property({
		data : {
			a : 1,
			b : 2,
			c : 3
		},
		validData : {
			integer : true
		}
	}) === true);

	check(VALID.property({
		data : {
			a : 1,
			b : 2,
			c : 3
		},
		validData : {
			bool : true
		}
	}) === false);

	// test detail.
	check(VALID.detail({
		data : {
			a : 1,
			b : 2,
			c : 3
		},
		validDataSet : {
			b : {
				integer : true
			}
		}
	}) === true);

	check(VALID.detail({
		data : {
			a : 1,
			b : 2,
			c : 3
		},
		validDataSet : {
			b : {
				bool : true
			}
		}
	}) === false);

	// test equal.
	check(VALID.equal({
		value : 4,
		validValue : 4
	}) === true);

	check(VALID.equal({
		value : 3,
		validValue : 4
	}) === false);

	check(VALID.equal({
		value : {
			msg : 1
		},
		validValue : {
			msg : 1
		}
	}) === true);
});
