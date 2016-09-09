TEST('VALID', function(ok) {
	'use strict';

	var
	// data
	data = {
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
	},

	// valid data
	validData = {
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
	},

	// valid result
	validResult = VALID(validData).check(data);

	ok(CHECK_ARE_SAME([data, {
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

	ok(CHECK_ARE_SAME([validResult.getErrors(), {
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
	ok(VALID.notEmpty('abc') === true);
	ok(VALID.notEmpty(undefined) === false);
	ok(VALID.notEmpty(null) === false);
	ok(VALID.notEmpty(1) === true);
	ok(VALID.notEmpty(1.2) === true);
	ok(VALID.notEmpty([]) === true);
	ok(VALID.notEmpty({}) === true);
	ok(VALID.notEmpty(true) === true);
	ok(VALID.notEmpty(false) === true);
	ok(VALID.notEmpty(new Date()) === true);

	// test regex valid.
	ok(VALID.regex({
		pattern : /[a-z][a-z][a-z]/,
		value : 'abc'
	}) === true);

	// test string size.
	ok(VALID.size({
		min : 1,
		max : 2,
		value : 'abc'
	}) === false);
	ok(VALID.size({
		min : 1,
		max : 4,
		value : 'abc'
	}) === true);
	ok(VALID.size({
		min : 4,
		max : 1,
		value : 'abc'
	}) === false);
	ok(VALID.size({
		min : 1,
		value : 'abc'
	}) === true);
	ok(VALID.size({
		max : 4,
		value : 'abc'
	}) === true);
	ok(VALID.size({
		min : 4,
		value : 'abc'
	}) === false);
	ok(VALID.size({
		max : 1,
		value : 'abc'
	}) === false);
	ok(VALID.size({
		value : 'abc'
	}) === true);

	// test integer.
	ok(VALID.integer('abc') === false);
	ok(VALID.integer(undefined) === false);
	ok(VALID.integer(null) === false);
	ok(VALID.integer(1) === true);
	ok(VALID.integer(1.2) === false);
	ok(VALID.integer([]) === false);
	ok(VALID.integer({}) === false);
	ok(VALID.integer(true) === false);
	ok(VALID.integer(false) === false);
	ok(VALID.integer(new Date()) === false);

	// test real.
	ok(VALID.real('abc') === false);
	ok(VALID.real(undefined) === false);
	ok(VALID.real(null) === false);
	ok(VALID.real(1) === true);
	ok(VALID.real(1.2) === true);
	ok(VALID.real([]) === false);
	ok(VALID.real({}) === false);
	ok(VALID.real(true) === false);
	ok(VALID.real(false) === false);
	ok(VALID.real(new Date()) === false);

	// test boolean.
	ok(VALID.bool('abc') === false);
	ok(VALID.bool(undefined) === false);
	ok(VALID.bool(null) === false);
	ok(VALID.bool(1) === false);
	ok(VALID.bool(1.2) === false);
	ok(VALID.bool([]) === false);
	ok(VALID.bool({}) === false);
	ok(VALID.bool(true) === true);
	ok(VALID.bool(false) === true);
	ok(VALID.bool(new Date()) === false);

	// test Date type.
	ok(VALID.date('Sun Aug 10 2014 01:22:54 GMT+0900') === true);
	ok(VALID.date('abc') === false);
	ok(VALID.date(undefined) === false);
	ok(VALID.date(null) === false);
	ok(VALID.date([]) === false);
	ok(VALID.date({}) === false);
	ok(VALID.date(true) === false);
	ok(VALID.date(false) === false);
	ok(VALID.date(new Date()) === true);

	// test min.
	ok(VALID.min({
		min : 3,
		value : 'abc'
	}) === false);
	ok(VALID.min({
		min : 3,
		value : undefined
	}) === false);
	ok(VALID.min({
		min : 3,
		value : null
	}) === false);
	ok(VALID.min({
		min : 3,
		value : 1
	}) === false);
	ok(VALID.min({
		min : 1,
		value : 3
	}) === true);
	ok(VALID.min({
		min : 3,
		value : 1.2
	}) === false);
	ok(VALID.min({
		min : 1.2,
		value : 3
	}) === true);
	ok(VALID.min({
		min : 1.2,
		value : []
	}) === false);
	ok(VALID.min({
		min : 1.2,
		value : {}
	}) === false);
	ok(VALID.min({
		min : 1.2,
		value : true
	}) === false);
	ok(VALID.min({
		min : 1.2,
		value : false
	}) === false);
	ok(VALID.min({
		min : 1.2,
		value : new Date()
	}) === false);

	// test max.
	ok(VALID.max({
		max : 3,
		value : 'abc'
	}) === false);
	ok(VALID.max({
		max : 3,
		value : undefined
	}) === false);
	ok(VALID.max({
		max : 3,
		value : null
	}) === false);
	ok(VALID.max({
		max : 3,
		value : 1
	}) === true);
	ok(VALID.max({
		max : 1,
		value : 3
	}) === false);
	ok(VALID.max({
		max : 3,
		value : 1.2
	}) === true);
	ok(VALID.max({
		max : 1.2,
		value : 3
	}) === false);
	ok(VALID.max({
		max : 1.2,
		value : []
	}) === false);
	ok(VALID.max({
		max : 1.2,
		value : {}
	}) === false);
	ok(VALID.max({
		max : 1.2,
		value : true
	}) === false);
	ok(VALID.max({
		max : 1.2,
		value : false
	}) === false);
	ok(VALID.max({
		max : 1.2,
		value : new Date()
	}) === false);

	// test email.
	ok(VALID.email('this@is.email') === true);
	ok(VALID.email('abc') === false);
	ok(VALID.email(undefined) === false);
	ok(VALID.email(null) === false);
	ok(VALID.email(1) === false);
	ok(VALID.email(1.2) === false);
	ok(VALID.email([]) === false);
	ok(VALID.email({}) === false);
	ok(VALID.email(true) === false);
	ok(VALID.email(false) === false);
	ok(VALID.email(new Date()) === false);

	// test url.
	ok(VALID.url('http://www.btncafe.com') === true);
	ok(VALID.url('abc') === false);
	ok(VALID.url(undefined) === false);
	ok(VALID.url(null) === false);
	ok(VALID.url(1) === false);
	ok(VALID.url(1.2) === false);
	ok(VALID.url([]) === false);
	ok(VALID.url({}) === false);
	ok(VALID.url(true) === false);
	ok(VALID.url(false) === false);
	ok(VALID.url(new Date()) === false);

	// test username.
	ok(VALID.username('btncafe-88_88') === true);
	ok(VALID.username('abc') === true);
	ok(VALID.username(undefined) === false);
	ok(VALID.username(null) === false);
	ok(VALID.username(1) === false);
	ok(VALID.username(1.2) === false);
	ok(VALID.username([]) === false);
	ok(VALID.username({}) === false);
	ok(VALID.username(true) === false);
	ok(VALID.username(false) === false);
	ok(VALID.username(new Date()) === false);

	// test id.
	ok(VALID.id('51889ace0000001106000002') === true);
	ok(VALID.id('abc') === false);
	ok(VALID.id(undefined) === false);
	ok(VALID.id(null) === false);
	ok(VALID.id(1) === false);
	ok(VALID.id(1.2) === false);
	ok(VALID.id([]) === false);
	ok(VALID.id({}) === false);
	ok(VALID.id(true) === false);
	ok(VALID.id(false) === false);
	ok(VALID.id(new Date()) === false);

	// test one.
	ok(VALID.one({
		value : 2,
		array : [1, 2, 3]
	}) === true);

	ok(VALID.one({
		value : 4,
		array : [1, 2, 3]
	}) === false);

	// test array.
	ok(VALID.array(2) === false);
	ok(VALID.array([1, 2, 3]) === true);
	ok(VALID.array({
		a : 1,
		b : 2
	}) === false);

	// test data.
	ok(VALID.data(2) === false);
	ok(VALID.data([1, 2, 3]) === false);
	ok(VALID.data({
		a : 1,
		b : 2
	}) === true);

	// test element.
	ok(VALID.element({
		array : [1, 2, 3],
		validData : {
			integer : true
		}
	}) === true);

	ok(VALID.element({
		array : [1, 2, 3],
		validData : {
			bool : true
		}
	}) === false);

	// test property.
	ok(VALID.property({
		data : {
			a : 1,
			b : 2,
			c : 3
		},
		validData : {
			integer : true
		}
	}) === true);

	ok(VALID.property({
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
	ok(VALID.detail({
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

	ok(VALID.detail({
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
	ok(VALID.equal({
		value : 4,
		validValue : 4
	}) === true);

	ok(VALID.equal({
		value : 3,
		validValue : 4
	}) === false);

	ok(VALID.equal({
		value : {
			msg : 1
		},
		validValue : {
			msg : 1
		}
	}) === true);
});
