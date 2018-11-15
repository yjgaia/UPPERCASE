/*
 * 데이터를 검증하고, 어떤 부분이 잘못되었는지 오류를 확인할 수 있는 VALID 클래스
 */
global.VALID = CLASS((cls) => {
	
	let notEmpty = cls.notEmpty = (value) => {
		//REQUIRED: value

		let str = (value === undefined || value === TO_DELETE) ? '' : String(value);

		return CHECK_IS_ARRAY(value) === true || str.trim() !== '';
	};

	let regex = cls.regex = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.pattern

		let str = String(params.value);
		let pattern = params.pattern;
		
		let result = str.match(pattern);

		return result !== TO_DELETE && str === result[0];
	};

	let size = cls.size = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//OPTIONAL: params.min
		//REQUIRED: params.max
		
		let value = params.value;
		
		if (CHECK_IS_DATA(value) === true) {
			return false;
		}
		
		let str = String(value);
		let min = params.min;
		let max = params.max;
		
		if (min === undefined) {
			min = 0;
		}

		return min <= str.trim().length && (max === undefined || str.length <= max);
	};

	let integer = cls.integer = (value) => {
		//REQUIRED: value

		let str = String(value);

		return notEmpty(str) === true && str.match(/^(?:-?(?:0|[1-9][0-9]*))$/) !== TO_DELETE;
	};

	let real = cls.real = (value) => {
		//REQUIRED: value
		
		let str = String(value);

		return notEmpty(str) === true && str.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/) !== TO_DELETE;
	};

	let bool = cls.bool = (value) => {
		//REQUIRED: value
		
		let str = String(value);

		return str === 'true' || str === 'false';
	};

	let date = cls.date = (value) => {
		//REQUIRED: value

		let str = String(value);
		let date = Date.parse(str);

		return isNaN(date) === false;
	};

	let min = cls.min = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.min
		
		let value = params.value;
		let min = params.min;

		return real(value) === true && min <= value;
	};

	let max = cls.max = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.max
		
		let value = params.value;
		let max = params.max;

		return real(value) === true && max >= value;
	};

	let email = cls.email = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/) !== TO_DELETE;
	};

	let png = cls.png = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^data:image\/png;base64,/) !== TO_DELETE;
	};

	let url = cls.url = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-a-z\u0080-\uffff\d{1-3}]+\.)+(?:[a-z\u0080-\uffff]+))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\u0000-\uffff~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\u0000-\uffff~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\u0000-\uffff~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\u0000-\uffff~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\u0000-\uffff~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\u0000-\uffff~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i) !== TO_DELETE && value.length <= 2083;
	};

	let username = cls.username = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^[_a-zA-Z0-9\-]+$/) !== TO_DELETE;
	};

	// check is mongo id.
	let mongoId = cls.mongoId = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/[0-9a-f]{24}/) !== TO_DELETE && value.length === 24;
	};

	let one = cls.one = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.array

		let value = params.value;
		let array = params.array;

		return EACH(array, (_value) => {
			if (value === _value) {
				return false;
			}
		}) === false;
	};

	let array = cls.array = (value) => {
		//REQUIRED: value

		return CHECK_IS_ARRAY(value) === true;
	};

	let data = cls.data = (value) => {
		//REQUIRED: value

		return CHECK_IS_DATA(value) === true;
	};

	let element = cls.element = (params) => {
		//REQUIRED: params
		//REQUIRED: params.array
		//REQUIRED: params.validData
		//OPTIONAL: params.isToWash
		
		let array = params.array;

		let valid = VALID({
			_ : params.validData
		});
		
		let isToWash = params.isToWash;
		
		return EACH(array, (value) => {
			if ((isToWash === true ? valid.checkAndWash : valid.check)({
				_ : value
			}).checkHasError() === true) {
				return false;
			}
		}) === true;
	};

	let property = cls.property = (params) => {
		//REQUIRED: params
		//REQUIRED: params.data
		//REQUIRED: params.validData
		//OPTIONAL: params.isToWash

		let data = params.data;

		let valid = VALID({
			_ : params.validData
		});
		
		let isToWash = params.isToWash;
		
		return EACH(data, (value) => {
			if ((isToWash === true ? valid.checkAndWash : valid.check)({
				_ : value
			}).checkHasError() === true) {
				return false;
			}
		}) === true;
	};

	let detail = cls.detail = (params) => {
		//REQUIRED: params
		//REQUIRED: params.data
		//REQUIRED: params.validDataSet
		//OPTIONAL: params.isToWash
		//OPTIONAL: params.errors
		
		let data = params.data;
		let valid = VALID(params.validDataSet);
		let isToWash = params.isToWash;
		let errors = params.errors;
		
		let result = (isToWash === true ? valid.checkAndWash : valid.check)(data);
		
		EXTEND({
			origin : errors,
			extend : result.getErrors()
		});
		
		return result.checkHasError() !== true;
	};

	let equal = cls.equal = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.validValue

		let str = String(params.value);
		let validStr = String(params.validValue);

		return str === validStr;
	};

	return {

		init : (inner, self, validDataSet) => {
			//REQUIRED: validDataSet

			let Check = CLASS({

				init : (inner, self, params) => {
					//REQUIRED: params
					//REQUIRED: params.data
					//OPTIONAL: params.isToWash
					//OPTIONAL: params.isForUpdate

					let data = params.data;
					let isToWash = params.isToWash;
					let isForUpdate = params.isForUpdate;

					let hasError = false;
					let errors = {};

					EACH(validDataSet, (validData, attr) => {

						// when valid data is true, pass
						if (validData !== true) {

							EACH(validData, (validParams, name) => {

								let value = data[attr];
								
								if (isForUpdate === true && value === undefined) {

									// break.
									return false;
								}

								if (isToWash === true && name !== 'notEmpty' && notEmpty(value) !== true) {
									
									data[attr] = isForUpdate === true ? TO_DELETE : undefined;
									
									// continue.
									return true;
								}

								// one
								if (name === 'one') {

									if (one({
										array : validParams,
										value : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											array : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// element
								else if (name === 'element') {

									if (element({
										validData : validParams,
										array : value,
										isToWash : isToWash
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validData : validParams,
											array : value
										};

										// break.
										return false;
									}
								}

								// property
								else if (name === 'property') {

									if (property({
										validData : validParams,
										data : value,
										isToWash : isToWash
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validData : validParams,
											data : value
										};

										// break.
										return false;
									}
								}

								// detail
								else if (name === 'detail') {
									
									let subErrors = {};

									if (detail({
										validDataSet : validParams,
										data : value,
										isToWash : isToWash,
										errors : subErrors
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validDataSet : validParams,
											data : value
										};
										
										EACH(subErrors, (subError, subAttr) => {
											errors[attr + '.' + subAttr] = subError;
										});

										// break.
										return false;
									}
								}

								// need params
								else if (name === 'size') {

									if (cls[name](CHECK_IS_DATA(validParams) === true ? COMBINE([validParams, {
										value : value
									}]) : COMBINE([{
										min : validParams,
										max : validParams
									}, {
										value : value
									}])) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParams : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// regex
								else if (name === 'regex') {

									if (cls[name]({
										pattern : validParams,
										value : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParam : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// min
								else if (name === 'min') {

									if (cls[name]({
										min : validParams,
										value : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParam : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// max
								else if (name === 'max') {

									if (cls[name]({
										max : validParams,
										value : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParam : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// equal
								else if (name === 'equal') {

									if (cls[name]({
										value : value,
										validValue : validParams
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParam : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// need value
								else if (validParams === true) {

									if (cls[name === 'id' ? 'mongoId' : name](value) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											value : value
										};

										// break.
										return false;
									}
								}

								if (typeof value === 'string') {
									
									value = value.trim();
									
									if (notEmpty(value) === true) {
										if (name === 'integer') {
											data[attr] = INTEGER(value);
										} else if (name === 'real') {
											data[attr] = REAL(value);
										} else if (name === 'bool') {
											data[attr] = value === 'true';
										} else if (name === 'date') {
											data[attr] = new Date(value);
										} else if (name === 'username') {
											data[attr] = value.toLowerCase();
										} else {
											data[attr] = value;
										}
									}
									
									else {
										data[attr] = value;
									}
								}
							});
						}
					});

					if (isToWash === true) {
						
						EACH(data, (value, attr) => {
							if (validDataSet[attr] === undefined) {
								delete data[attr];
							}
						});
					}

					let checkHasError = self.checkHasError = () => {
						return hasError;
					};

					let getErrors = self.getErrors = () => {
						return errors;
					};
				}
			});

			let check = self.check = (data) => {
				return Check({
					data : data
				});
			};

			let checkAndWash = self.checkAndWash = (data) => {
				return Check({
					data : data,
					isToWash : true
				});
			};

			let checkForUpdate = self.checkForUpdate = (data) => {
				return Check({
					data : data,
					isToWash : true,
					isForUpdate : true
				});
			};
			
			let getValidDataSet = self.getValidDataSet = () => {
				return validDataSet;
			};
		}
	};
});
