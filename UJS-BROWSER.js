/*

Welcome to UJS! (http://uppercase.io)

*/

global = window;

/**
 * when database update, set to delete value.
 *
 * unique value only can be null.
 */
global.TO_DELETE = null;

/**
 * Configuration
 */
global.CONFIG = {
	isDevMode : false
};

/**
 * Create method.
 */
global.METHOD = function(define) {
	'use strict';
	//REQUIRED: define

	var
	// funcs
	funcs,

	// run.
	run,

	// method.
	m = function(params, funcs) {
		//OPTIONAL: params
		//OPTIONAL: funcs

		if (run !== undefined) {
			return run(params, funcs);
		}
	};

	// set type.
	m.type = METHOD;

	// when define is function
	if ( typeof define === 'function') {
		funcs = define(m);
	}

	// when define is function set
	else {
		funcs = define;
	}

	// init funcs.
	if (funcs !== undefined) {
		run = funcs.run;
	};

	return m;
};

/**
 * Create class.
 */
global.CLASS = METHOD(function(m) {
	'use strict';

	var
	// instance count
	instanceCount = 0,

	// get instance id.
	getInstanceId;

	m.getInstanceId = getInstanceId = function() {

		instanceCount += 1;

		return instanceCount - 1;
	};

	return {

		run : function(define) {
			//REQUIRED: define

			var
			// funcs
			funcs,

			// preset.
			preset,

			// init.
			init,

			// params.
			_params,

			// after init.
			afterInit,

			// cls.
			cls = function(params, funcs) {
				//OPTIONAL: params
				//OPTIONAL: funcs

				var
				// inner (like Java's protected.)
				inner = {},

				// self (like Java's public.)
				self = {};

				// set type.
				self.type = cls;

				// check is instance of.
				self.checkIsInstanceOf = function(checkCls) {

					var
					// target cls
					targetCls = cls;

					// check moms.
					while (targetCls !== undefined) {

						if (targetCls === checkCls) {
							return true;
						}

						targetCls = targetCls.mom;
					}

					return false;
				};

				// set id.
				self.id = getInstanceId();

				// run inner init.
				params = innerInit(inner, self, params, funcs);

				// run inner after init.
				innerAfterInit(inner, self, params, funcs);

				return self;
			},

			// inner init.
			innerInit,

			// inner after init.
			innerAfterInit;

			// set type.
			cls.type = CLASS;

			cls.innerInit = innerInit = function(inner, self, params, funcs) {
				//OPTIONAL: params
				//OPTIONAL: funcs

				var
				// mom (parent class)
				mom,

				// temp params
				tempParams,

				// param value
				paramValue,

				// extend.
				extend = function(params, tempParams) {

					EACH(tempParams, function(value, name) {

						if (params[name] === undefined) {
							params[name] = value;
						} else if (CHECK_IS_DATA(params[name]) === true && CHECK_IS_DATA(value) === true) {
							extend(params[name], value);
						}
					});
				};

				// init params.
				if (_params !== undefined) {

					// when params is undefined
					if (params === undefined) {
						params = _params(cls);
					}

					// when params is data
					else if (CHECK_IS_DATA(params) === true) {

						tempParams = _params(cls);

						if (tempParams !== undefined) {
							extend(params, tempParams);
						}
					}

					// when params is value
					else {
						paramValue = params;
						params = _params(cls);
					}
				}

				// preset.
				if (preset !== undefined) {

					mom = preset(params, funcs);

					if (mom !== undefined) {

						cls.mom = mom;

						// when mom's type is CLASS
						if (mom.type === CLASS) {
							mom.innerInit(inner, self, params, funcs);
						}

						// when mon's type is OBJECT
						else {
							mom.type.innerInit(inner, self, params, funcs);
						}
					}
				}

				// init object.
				if (init !== undefined) {
					init(inner, self, paramValue === undefined ? params : paramValue, funcs);
				}

				return params;
			};

			// when define is function
			if ( typeof define === 'function') {
				funcs = define(cls);
			}

			// when define is function set
			else {
				funcs = define;
			}

			// init funcs.
			if (funcs !== undefined) {
				preset = funcs.preset;
				init = funcs.init;
				_params = funcs.params;
				afterInit = funcs.afterInit;
			}

			cls.innerAfterInit = innerAfterInit = function(inner, self, params, funcs) {
				//OPTIONAL: params
				//OPTIONAL: funcs

				var
				// mom
				mom = cls.mom;

				// when mom exists, run mom's after init.
				if (mom !== undefined) {

					// when mom's type is CLASS
					if (mom.type === CLASS) {
						mom.innerAfterInit(inner, self, params, funcs);
					}

					// when mon's type is OBJECT
					else {
						mom.type.innerAfterInit(inner, self, params, funcs);
					}
				}

				// run after init.
				if (afterInit !== undefined) {
					afterInit(inner, self, params, funcs);
				}
			};

			return cls;
		}
	};
});

/**
 * Create object.
 */
global.OBJECT = METHOD(function(m) {
	'use strict';

	var
	// ready objects
	readyObjects = [],

	// is inited
	isInited = false,

	// init object.
	initObject,

	// add ready object.
	addReadyObject,

	// remove ready object.
	removeReadyObject,

	// init objects.
	initObjects;

	initObject = function(object) {

		var
		// cls
		cls = object.type,

		// inner (like Java's protected.)
		inner = {},

		// params
		params = {};

		// set id.
		object.id = CLASS.getInstanceId();

		// run inner init.
		cls.innerInit(inner, object, params);

		// run inner after init.
		cls.innerAfterInit(inner, object, params);
	};

	addReadyObject = function(object) {
		//REQUIRED: object

		// when inited all
		if (isInited === true) {
			initObject(object);
		}

		// when not inited all
		else {
			readyObjects.push(object);
		}
	};

	m.removeReadyObject = removeReadyObject = function(object) {
		REMOVE({
			array : readyObjects,
			value : object
		});
	};

	m.initObjects = initObjects = function() {

		// init all objects.
		EACH(readyObjects, function(object) {
			initObject(object);
		});

		isInited = true;
	};

	return {

		run : function(define) {
			//REQUIRED: define

			var
			// cls
			cls = CLASS(define),

			// self
			self = {};

			// set type.
			self.type = cls;

			// check is instance of.
			self.checkIsInstanceOf = function(checkCls) {

				var
				// target cls
				targetCls = cls;

				// check moms.
				while (targetCls !== undefined) {

					if (targetCls === checkCls) {
						return true;
					}

					targetCls = targetCls.mom;
				}

				return false;
			};

			addReadyObject(self);

			return self;
		}
	};
});

/**
 * init all objects.
 */
global.INIT_OBJECTS = METHOD({

	run : function() {'use strict';

		OBJECT.initObjects();
	}
});

/**
 * create box.
 */
global.BOX = METHOD(function(m) {
	'use strict';

	var
	// boxes
	boxes = {},

	// get boxes.
	getBoxes;

	m.getBoxes = getBoxes = function() {
		return boxes;
	};

	return {

		run : function(boxName) {
			//REQUIRED: boxName

			var
			// box.
			box = function(packName) {
				//REQUIRED: packName

				var
				// packNameSps
				packNameSps = packName.split('.'),

				// pack
				pack;

				EACH(packNameSps, function(packNameSp) {

					if (pack === undefined) {

						if (box[packNameSp] === undefined) {

							//LOADED: PACK
							box[packNameSp] = {};
						}
						pack = box[packNameSp];

					} else {

						if (pack[packNameSp] === undefined) {

							//LOADED: PACK
							pack[packNameSp] = {};
						}
						pack = pack[packNameSp];
					}
				});

				return pack;
			},

			// box name splits
			boxNameSplits = boxName.split('.'),

			// before box split
			beforeBoxSplit = global,

			// before box name splits str
			beforeBoxNameSplitsStr = '';

			box.boxName = boxName;
			box.type = BOX;

			boxes[boxName] = box;

			EACH(boxNameSplits, function(boxNameSplit, i) {

				beforeBoxNameSplitsStr += (beforeBoxNameSplitsStr === '' ? '' : '.') + boxNameSplit;

				if (i < boxNameSplits.length - 1) {

					if (beforeBoxSplit[boxNameSplit] !== undefined) {
						beforeBoxSplit = beforeBoxSplit[boxNameSplit];
					} else {
						beforeBoxSplit = beforeBoxSplit[boxNameSplit] = {};
					}

				} else {

					beforeBoxSplit[boxNameSplit] = box;
				}
			});

			FOR_BOX.inject(box);

			return box;
		}
	};
});

/**
 * inject method or class to box.
 */
global.FOR_BOX = METHOD(function(m) {
	'use strict';

	var
	// funcs
	funcs = [],

	// inject.
	inject;

	m.inject = inject = function(box) {
		EACH(funcs, function(func) {
			func(box);
		});
	};

	return {

		run : function(func) {
			//REQUIRED: func

			EACH(BOX.getBoxes(), function(box) {
				func(box);
			});

			funcs.push(func);
		}
	};
});

/**
 * async control-flow method that makes stepping through logic easy.
 */
global.NEXT = METHOD({

	run : function(countOrArray, funcs) {
		'use strict';
		//OPTIONAL: countOrArray
		//REQUIRED: funcs

		var
		// count
		count,

		// array
		array,

		// f.
		f;

		if (funcs === undefined) {
			funcs = countOrArray;
			countOrArray = undefined;
		}

		if (countOrArray !== undefined) {
			if (CHECK_IS_ARRAY(countOrArray) !== true) {
				count = countOrArray;
			} else {
				array = countOrArray;
			}
		}

		REPEAT({
			start : funcs.length - 1,
			end : 0
		}, function(i) {

			var
			// next.
			next;

			// get last function.
			if (i !== 0 && f === undefined) {
				f = funcs[i]();
			}

			// pass next function.
			else if (i > 0) {

				next = f;

				f = funcs[i](next);

				f.next = next;
			}

			// run first function.
			else {

				next = f;

				// when next not exists, next is empty function.
				if (next === undefined) {
					next = function() {
						// ignore.
					};
				}

				f = funcs[i];

				if (count !== undefined) {

					RUN(function() {

						var
						// i
						i = -1;

						RUN(function(self) {

							i += 1;

							if (i + 1 < count) {
								f(i, self);
							} else {
								f(i, next);
							}
						});
					});

				} else if (array !== undefined) {

					RUN(function() {

						var
						// length
						length = array.length,

						// i
						i = -1;

						if (length === 0) {
							next();
						} else {

							RUN(function(self) {

								i += 1;

								if (i + 1 < length) {

									// if shrink
									if (array.length === length - 1) {
										i -= 1;
										length -= 1;
									}

									f(array[i], self, i);

								} else {
									f(array[i], next, i);
								}
							});
						}
					});

				} else {

					f(next);
				}
			}
		});
	}
});

/**
 * override something.
 */
global.OVERRIDE = METHOD({

	run : function(origin, func) {
		'use strict';
		//REQUIRED: origin
		//REQUIRED: func

		// when origin is OBJECT.
		if (origin.type !== undefined && origin.type.type === CLASS) {

			// remove origin from init ready objects.
			OBJECT.removeReadyObject(origin);
		}

		func(origin);
	}
});

/**
 * run funcs in parallel.
 */
global.PARALLEL = METHOD({

	run : function(countOrArray, funcs) {
		'use strict';
		//OPTIONAL: countOrArray
		//REQUIRED: funcs

		var
		// count
		count,

		// array
		array,

		// done count
		doneCount = 0;

		if (funcs === undefined) {
			funcs = countOrArray;
			countOrArray = undefined;
		}

		if (countOrArray !== undefined) {
			if (CHECK_IS_ARRAY(countOrArray) !== true) {
				count = countOrArray;
			} else {
				array = countOrArray;
			}
		}

		if (count !== undefined) {

			if (count === 0) {
				funcs[1]();
			} else {

				REPEAT(count, function(i) {

					funcs[0](i, function() {

						doneCount += 1;

						if (doneCount === count) {
							funcs[1]();
						}
					});
				});
			}

		} else if (array !== undefined) {

			if (array.length === 0) {
				funcs[1]();
			} else {

				EACH(array, function(value, i) {

					funcs[0](value, function() {

						doneCount += 1;

						if (doneCount === array.length) {
							funcs[1]();
						}
					}, i);
				});
			}

		} else {

			RUN(function() {

				var
				// length
				length = funcs.length - 1;

				EACH(funcs, function(func, i) {

					if (i < length) {

						func(function() {

							doneCount += 1;

							if (doneCount === length) {
								funcs[length]();
							}
						});
					}
				});
			});
		}
	}
});

/**
 * parse stringified value.
 */
global.PARSE_STR = METHOD({

	run : function(stringifiedValue) {
		'use strict';
		//REQUIRED: stringifiedValue

		var
		// value
		value;

		try {

			value = JSON.parse(stringifiedValue);

			return CHECK_IS_DATA(value) === true ? UNPACK_DATA(value) : value;

		} catch(e) {

			// when error, return undefined.
			return undefined;
		}
	}
});

/**
 * generate random string.
 */
global.RANDOM_STR = METHOD({

	run : function(length) {
		'use strict';
		//REQUIRED: length

		var
		// random string
		randomStr = '',

		// characters
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

		// i
		i;

		REPEAT(length, function() {

			// add random character to random string.
			randomStr += characters.charAt(RANDOM({
				limit : characters.length
			}));
		});

		return randomStr;
	}
});

/**
 * stringify.
 */
global.STRINGIFY = METHOD({

	run : function(value) {
		'use strict';
		//REQUIRED: value

		return JSON.stringify(CHECK_IS_DATA(value) === true ? PACK_DATA(value) : value);
	}
});

/**
 * test.
 */
global.TEST = METHOD(function(m) {
	'use strict';

	var
	// error count
	errorCount = 0;

	return {

		run : function(name, test) {
			//REQUIRED: name
			//REQUIRED: test

			test(function(bool) {
				//REQUIRED: bool

				var
				// temp
				temp = {},

				// line
				line,

				// throw error.
				throwError;

				if (bool === true) {
					console.log('[' + name + ' TEST] SUCCESS! ' + errorCount + ' error(s) founded.');
				} else {

					temp.__THROW_ERROR_$$$ = function() {
						try {
							throw Error();
						} catch(error) {
							return error;
						}
					};

					line = temp.__THROW_ERROR_$$$().stack;

					if (line !== undefined) {
						line = line.substring(line.indexOf('__THROW_ERROR_$$$'));
						line = line.split('\n')[2];
						line = line.substring(line.indexOf('at '));
					}

					errorCount += 1;

					console.log('[' + name + ' TEST] ERROR! ' + line + ' ' + errorCount + ' error(s) founded.');
				}
			});
		}
	};
});

/**
 * URI matcher class
 */
global.URI_MATCHER = CLASS({

	init : function(inner, self, format) {
		'use strict';
		//REQUIRED: format

		var
		// Check class
		Check = CLASS({

			init : function(inner, self, uri) {
				//REQUIRED: uri

				var
				// uri parts
				uriParts = uri.split('/'),

				// is matched
				isMatched,

				// uri parmas
				uriParams = {},

				// find.
				find = function(format) {

					var
					// format parts
					formatParts = format.split('/');

					return EACH(uriParts, function(uriPart, i) {

						var
						// format part
						formatPart = formatParts[i];

						if (formatPart === '**') {
							isMatched = true;
							return false;
						}

						if (formatPart === undefined) {
							return false;
						}

						// find params.
						if (uriPart !== '' && formatPart.charAt(0) === '{' && formatPart.charAt(formatPart.length - 1) === '}') {
							uriParams[formatPart.substring(1, formatPart.length - 1)] = uriPart;
						} else if (formatPart !== '*' && formatPart !== uriPart) {
							return false;
						}

						if (i === uriParts.length - 1 && i < formatParts.length - 1 && formatParts[formatParts.length - 1] !== '') {
							return false;
						}

					}) === true || isMatched === true;
				},

				// check is matched.
				checkIsMatched,

				// get uri params.
				getURIParams;

				if (CHECK_IS_ARRAY(format) === true) {
					isMatched = EACH(format, function(format) {
						return find(format) !== true;
					}) !== true;
				} else {
					isMatched = find(format);
				}

				self.checkIsMatched = checkIsMatched = function() {
					return isMatched;
				};

				self.getURIParams = getURIParams = function() {
					return uriParams;
				};
			}
		}),

		// check.
		check;

		self.check = check = function(uri) {
			return Check(uri);
		};
	}
});

/**
 * Data validation class
 */
global.VALID = CLASS(function(cls) {
	'use strict';

	var
	// not empty.
	notEmpty,

	// regex.
	regex,

	// size.
	size,

	// integer.
	integer,

	// real.
	real,

	// bool.
	bool,

	// date.
	date,

	// min.
	min,

	// max.
	max,

	// email.
	email,

	// png.
	png,

	// url.
	url,

	// username.
	username,

	// id.
	id,

	// one.
	one,

	// array.
	array,

	// data.
	data,

	// element.
	element,

	// property.
	property,

	// detail.
	detail,

	// equal.
	equal;

	cls.notEmpty = notEmpty = function(value) {
		//REQUIRED: value

		var
		// string
		str = (value === undefined || value === TO_DELETE) ? '' : String(value);

		return CHECK_IS_ARRAY(value) === true || str.trim() !== '';
	};

	cls.regex = regex = function(params) {
		//REQUIRED: params
		//REQUIRED: params.pattern
		//REQUIRED: params.value

		var
		// pattern
		pattern = params.pattern,

		// string
		str = String(params.value);

		return str === str.match(pattern)[0];
	};

	cls.size = size = function(params) {
		//OPTIONAL: params.min
		//REQUIRED: params.max
		//REQUIRED: params.value

		var
		// min
		min = params.min,

		// max
		max = params.max,

		// string
		str = String(params.value),

		// length
		length = str.length;

		if (min === undefined) {
			min = 0;
		}

		return min <= length && (max === undefined || length <= max);
	};

	cls.integer = integer = function(value) {
		//REQUIRED: value

		var
		// string
		str = String(value);

		return notEmpty(str) === true && str.match(/^(?:-?(?:0|[1-9][0-9]*))$/) !== TO_DELETE;
	};

	cls.real = real = function(value) {
		//REQUIRED: value

		var
		// string
		str = String(value);

		return notEmpty(str) === true && str.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/) !== TO_DELETE;
	};

	cls.bool = bool = function(value) {
		//REQUIRED: value

		var
		// string
		str = String(value);

		return str === 'true' || str === 'false';
	};

	cls.date = date = function(value) {
		//REQUIRED: value

		var
		// string
		str = String(value),

		// date
		date = Date.parse(str);

		return isNaN(date) === false;
	};

	cls.min = min = function(params) {
		//REQUIRED: params
		//REQUIRED: params.min
		//REQUIRED: params.value

		var
		// min
		min = params.min,

		// value
		value = params.value;

		return real(value) === true && min <= value;
	};

	cls.max = max = function(params) {
		//REQUIRED: params
		//REQUIRED: params.max
		//REQUIRED: params.value

		var
		// max
		max = params.max,

		// value
		value = params.value;

		return real(value) === true && max >= value;
	};

	cls.email = email = function(value) {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/) !== TO_DELETE;
	};

	cls.png = png = function(value) {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^data:image\/png;base64,/) !== TO_DELETE;
	};

	cls.url = url = function(value) {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i) !== TO_DELETE && value.length <= 2083;
	};

	cls.username = username = function(value) {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^[_a-zA-Z0-9\-]+$/) !== TO_DELETE;
	};

	// mongodb id check
	cls.id = id = function(value) {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/[0-9a-f]{24}/) !== TO_DELETE && value.length === 24;
	};

	cls.one = one = function(params) {
		//REQUIRED: params
		//REQUIRED: params.array
		//REQUIRED: params.value

		var
		// array
		array = params.array,
		
		// value
		value = params.value;

		return EACH(array, function(_value) {
			if (value === _value) {
				return false;
			}
		}) === false;
	};

	cls.array = array = function(value) {
		//REQUIRED: value

		return CHECK_IS_ARRAY(value) === true;
	};

	cls.data = data = function(value) {
		//REQUIRED: value

		return CHECK_IS_DATA(value) === true;
	};

	cls.element = element = function(params) {
		//REQUIRED: params
		//REQUIRED: params.array
		//REQUIRED: params.validData

		var
		// array
		array = params.array,

		// valid
		valid = VALID({
			_ : params.validData
		});

		return EACH(array, function(value) {
			if (valid.check({
				_ : value
			}).checkHasError() === true) {
				return false;
			}
		}) === true;
	};

	cls.property = property = function(params) {
		//REQUIRED: params
		//REQUIRED: params.data
		//REQUIRED: params.validData

		var
		// array
		data = params.data,

		// valid
		valid = VALID({
			_ : params.validData
		});

		return EACH(data, function(value) {
			if (valid.check({
				_ : value
			}).checkHasError() === true) {
				return false;
			}
		}) === true;
	};

	cls.detail = detail = function(params) {
		//REQUIRED: params
		//REQUIRED: params.data
		//REQUIRED: params.validDataSet

		var
		// data
		data = params.data,

		// valid
		valid = VALID(params.validDataSet);

		return valid.check(data).checkHasError() !== true;
	};

	cls.equal = equal = function(params) {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.validValue

		var
		// value
		value = params.value,

		// string
		str = String(value),

		// valid value
		validValue = params.validValue,

		// valid str
		validStr = String(validValue);

		return str === validStr;
	};

	return {

		init : function(inner, self, validDataSet) {
			//REQUIRED: validDataSet

			var
			// Check class
			Check = CLASS({

				init : function(inner, self, params) {
					//REQUIRED: params
					//REQUIRED: params.data
					//OPTIONAL: params.isForUpdate

					var
					// data
					data = params.data,

					// is for update
					isForUpdate = params.isForUpdate,

					// has error
					hasError = false,

					// errors
					errors = {},

					// check has error.
					checkHasError,

					// get errors.
					getErrors;

					EACH(validDataSet, function(validData, attr) {

						// when valid data is true, pass
						if (validData !== true) {

							EACH(validData, function(validParams, name) {

								var
								// value
								value = data[attr];

								if (isForUpdate === true && value === undefined) {

									// break.
									return false;
								}

								if (name !== 'notEmpty' && notEmpty(value) !== true) {
									
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
										array : value
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
										data : value
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

									if (detail({
										validDataSet : validParams,
										data : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validDataSet : validParams,
											data : value
										};

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

									if (cls[name](value) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											value : value
										};

										// break.
										return false;
									}
								}

								if (notEmpty(value) === true && typeof value === 'string') {
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
									}
								}
							});
						}
					});

					EACH(data, function(value, attr) {
						if (validDataSet[attr] === undefined) {
							delete data[attr];
						}
					});

					self.checkHasError = checkHasError = function() {
						return hasError;
					};

					self.getErrors = getErrors = function() {
						return errors;
					};
				}
			}),

			// check.
			check,

			// check for update.
			checkForUpdate,
			
			// get valid data set.
			getValidDataSet;

			self.check = check = function(data) {
				return Check({
					data : data
				});
			};

			self.checkForUpdate = checkForUpdate = function(data) {
				return Check({
					data : data,
					isForUpdate : true
				});
			};
			
			self.getValidDataSet = getValidDataSet = function() {
				return validDataSet;
			};
		}
	};
});

/**
 * check it is arguments.
 */
global.CHECK_IS_ARGUMENTS = METHOD({

	run : function(it) {'use strict';
		//OPTIONAL: it

		if (it !== undefined && it !== TO_DELETE && typeof it === 'object' && (Object.prototype.toString.call(it) === '[object Arguments]' || (it.callee !== undefined && typeof it.callee === 'function'))) {
			return true;
		}

		return false;
	}
});

/**
 * check are same all elements in array.
 */
global.CHECK_ARE_SAME = METHOD({

	run : function(array) {
		'use strict';
		//REQUIRED: array

		var
		// are same
		areSame = false,

		// check two same.
		checkTwoSame = function(a, b) {

			// when a, b are date
			if ( a instanceof Date === true && b instanceof Date === true) {
				return a.getTime() === b.getTime();
			}
			
			// when a, b are regex
			else if ( a instanceof RegExp === true && b instanceof RegExp === true) {
				return a.toString() === b.toString();
			}

			// when a, b are data (JS object)
			else if (CHECK_IS_DATA(a) === true && CHECK_IS_DATA(b) === true) {
				return EACH(a, function(value, name) {
					return checkTwoSame(value, b[name]);
				});
			}

			// when a, b are array
			else if (CHECK_IS_ARRAY(a) === true && CHECK_IS_ARRAY(b) === true) {
				return EACH(a, function(value, i) {
					return checkTwoSame(value, b[i]);
				});
			}

			// when a, b are value
			else {
				return a === b;
			}
		};

		if (array.length > 1) {

			areSame = REPEAT(array.length, function(i) {
				if (i < array.length - 1) {
					return checkTwoSame(array[i], array[i + 1]);
				} else {
					return checkTwoSame(array[i], array[0]);
				}
			});
		}

		return areSame;
	}
});

/**
 * check it is array.
 */
global.CHECK_IS_ARRAY = METHOD({

	run : function(it) {
		'use strict';
		//OPTIONAL: it

		if (it !== undefined && it !== TO_DELETE && typeof it === 'object' && Object.prototype.toString.call(it) === '[object Array]') {
			return true;
		}

		return false;
	}
});

/**
 * check it is data.
 */
global.CHECK_IS_DATA = METHOD({

	run : function(it) {
		'use strict';
		//OPTIONAL: it

		if (it !== undefined && it !== TO_DELETE && CHECK_IS_ARGUMENTS(it) !== true && CHECK_IS_ARRAY(it) !== true && it instanceof Date !== true && it instanceof RegExp !== true && typeof it === 'object') {
			return true;
		}

		return false;
	}
});

/**
 * check is empty data.
 */
global.CHECK_IS_EMPTY_DATA = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		return CHECK_ARE_SAME([data, {}]);
	}
});

/**
 * count data's properties
 */
global.COUNT_PROPERTIES = METHOD({

	run : function(data) {
		'use strict';
		//OPTIONAL: data

		var
		// count
		count = 0;
		
		EACH(data, function() {
			count += 1;
		});
		
		return count;
	}
});

/**
 * pack data with Date type.
 */
global.PACK_DATA = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		var
		// result
		result = COPY(data),

		// date attribute names
		dateAttrNames = [],
		
		// regex attribute names
		regexAttrNames = [];

		EACH(result, function(value, name) {

			// when value is Date type
			if ( value instanceof Date === true) {

				// change to timestamp integer.
				result[name] = INTEGER(value.getTime());
				dateAttrNames.push(name);
			}
			
			// when value is RegExp type
			else if ( value instanceof RegExp === true) {

				// change to string.
				result[name] = value.toString();
				regexAttrNames.push(name);
			}

			// when value is data
			else if (CHECK_IS_DATA(value) === true) {
				result[name] = PACK_DATA(value);
			}

			// when value is array
			else if (CHECK_IS_ARRAY(value) === true) {

				EACH(value, function(v, i) {

					if (CHECK_IS_DATA(v) === true) {
						value[i] = PACK_DATA(v);
					}
				});
			}
		});

		result.__DATE_ATTR_NAMES = dateAttrNames;
		result.__REGEX_ATTR_NAMES = regexAttrNames;

		return result;
	}
});

/**
 * unpack data with Date type.
 */
global.UNPACK_DATA = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		var
		// result
		result = COPY(data);

		// when date attribute names exists
		if (result.__DATE_ATTR_NAMES !== undefined) {

			// change timestamp integer to Date type.
			EACH(result.__DATE_ATTR_NAMES, function(dateAttrName, i) {
				result[dateAttrName] = new Date(result[dateAttrName]);
			});
			delete result.__DATE_ATTR_NAMES;
		}
		
		// when regex attribute names exists
		if (result.__REGEX_ATTR_NAMES !== undefined) {

			// change string to RegExp type.
			EACH(result.__REGEX_ATTR_NAMES, function(regexAttrName, i) {
				
				var
				// pattern
				pattern = result[regexAttrName],
				
				// flags
				flags,
				
				// j
				j;
				
				for (j = pattern.length - 1; j >= 0; j -= 1) {
					if (pattern[j] === '/') {
						flags = pattern.substring(j + 1);
						pattern = pattern.substring(1, j);
						break;
					}
				}
				
				result[regexAttrName] = new RegExp(pattern, flags);
			});
			delete result.__REGEX_ATTR_NAMES;
		}

		EACH(result, function(value, name) {

			// when value is data
			if (CHECK_IS_DATA(value) === true) {
				result[name] = UNPACK_DATA(value);
			}

			// when value is array
			else if (CHECK_IS_ARRAY(value) === true) {

				EACH(value, function(v, i) {

					if (CHECK_IS_DATA(v) === true) {
						value[i] = UNPACK_DATA(v);
					}
				});
			}
		});

		return result;
	}
});

/**
 * check is exists value in data or array.
 */
global.CHECK_IS_IN = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.data
		//OPTIONAL: params.array
		//REQUIRED: params.value

		var
		// data
		data = params.data,

		// array
		array = params.array,

		// value
		value = params.value;

		if (data !== undefined) {
			return EACH(data, function(_value, name) {
				if (CHECK_ARE_SAME([_value, value]) === true) {
					return false;
				}
			}) !== true;
		}

		if (array !== undefined) {
			return EACH(array, function(_value, key) {
				if (CHECK_ARE_SAME([_value, value]) === true) {
					return false;
				}
			}) !== true;
		}
	}
});

/**
 * combine data set or arrays.
 */
global.COMBINE = METHOD({

	run : function(dataSetOrArrays) {
		'use strict';
		//REQUIRED: dataSetOrArrays

		var
		// first
		first,

		// result
		result;

		if (dataSetOrArrays.length > 0) {

			first = dataSetOrArrays[0];

			// when first is data
			if (CHECK_IS_DATA(first) === true) {

				result = {};

				EACH(dataSetOrArrays, function(data) {
					EXTEND({
						origin : result,
						extend : data
					});
				});
			}

			// when first is array
			else if (CHECK_IS_ARRAY(first) === true) {

				result = [];

				EACH(dataSetOrArrays, function(array) {
					EXTEND({
						origin : result,
						extend : array
					});
				});
			}
		}

		return result;
	}
});

/**
 * copy data or array.
 */
global.COPY = METHOD({

	run : function(dataOrArray) {
		'use strict';
		//REQUIRED: dataOrArray

		var
		// copy
		copy;

		// when dataOrArray is data (JS object)
		if (CHECK_IS_DATA(dataOrArray) === true) {

			copy = {};

			EXTEND({
				origin : copy,
				extend : dataOrArray
			});
		}

		// when dataOrArray is array
		else if (CHECK_IS_ARRAY(dataOrArray) === true) {

			copy = [];

			EXTEND({
				origin : copy,
				extend : dataOrArray
			});
		}

		return copy;
	}
});

/**
 * extend data or array.
 */
global.EXTEND = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.origin
		//REQUIRED: params.extend

		var
		// origin
		origin = params.origin,

		// extend
		extend = params.extend;

		// when origin is data
		if (CHECK_IS_DATA(origin) === true) {

			EACH(extend, function(value, name) {
				
				var
				// pattern
				pattern,
				
				// flags
				flags,
				
				// j
				i;
				
				if ( value instanceof Date === true) {
					origin[name] = new Date(value.getTime());
				}
				
				else if ( value instanceof RegExp === true) {
					
					pattern = value.toString();
					
					for (i = pattern.length - 1; i >= 0; i -= 1) {
						if (pattern[i] === '/') {
							flags = pattern.substring(i + 1);
							pattern = pattern.substring(1, i);
							break;
						}
					}
					
					origin[name] = new RegExp(pattern, flags);
				}
				
				else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
					origin[name] = COPY(value);
				}
				
				else {
					origin[name] = value;
				}
			});
		}

		// when origin is array
		else if (CHECK_IS_ARRAY(origin) === true) {

			EACH(extend, function(value) {
				
				var
				// pattern
				pattern,
				
				// flags
				flags,
				
				// j
				i;

				if ( value instanceof Date === true) {
					origin.push(new Date(value.getTime()));
				}
				
				else if ( value instanceof RegExp === true) {
					
					pattern = value.toString();
					
					for (i = pattern.length - 1; i >= 0; i -= 1) {
						if (pattern[i] === '/') {
							flags = pattern.substring(i + 1);
							pattern = pattern.substring(1, i);
							break;
						}
					}
					
					origin.push(new RegExp(pattern, flags));
				}
				
				else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
					origin.push(COPY(value));
				}
				
				else {
					origin.push(value);
				}
			});
		}

		return origin;
	}
});

/**
 * find name or key in data or array.
 */
global.FIND = METHOD({

	run : function(dataOrArrayOrParams, filter) {
		'use strict';
		//REQUIRED: dataOrArrayOrParams
		//OPTIONAL: dataOrArrayOrParams.data
		//OPTIONAL: dataOrArrayOrParams.array
		//REQUIRED: dataOrArrayOrParams.value
		//OPTIONAL: filter

		var
		// data
		data,

		// array
		array,

		// value
		value,

		// ret
		ret;

		// when filter exists
		if (filter !== undefined) {

			// when dataOrArrayOrParams is data
			if (CHECK_IS_DATA(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, name) {

					// value passed filter.
					if (filter(value) === true) {
						ret = value;
						return false;
					}
				});
			}

			// when dataOrArrayOrParams is array
			else if (CHECK_IS_ARRAY(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, key) {

					// value passed filter.
					if (filter(value) === true) {
						ret = value;
						return false;
					}
				});
			}
		}

		// when filter not exists
		else {

			// init params.
			data = dataOrArrayOrParams.data;
			array = dataOrArrayOrParams.array;
			value = dataOrArrayOrParams.value;

			if (data !== undefined) {

				EACH(data, function(_value, name) {
					if (_value === value) {
						ret = name;
						return false;
					}
				});
			}

			if (array !== undefined) {

				EACH(array, function(_value, key) {
					if (_value === value) {
						ret = key;
						return false;
					}
				});
			}
		}

		return ret;
	}
});

/**
 * remove at name or key or some value in data or array.
 */
global.REMOVE = METHOD({

	run : function(dataOrArrayOrParams, filter) {
		'use strict';
		//REQUIRED: dataOrArrayOrParams
		//OPTIONAL: dataOrArrayOrParams.data
		//OPTIONAL: dataOrArrayOrParams.array
		//OPTIONAL: dataOrArrayOrParams.name
		//OPTIONAL: dataOrArrayOrParams.key
		//OPTIONAL: dataOrArrayOrParams.value
		//OPTIONAL: filter

		var
		// data
		data,

		// array
		array,

		// name
		name,

		// key
		key,

		// value
		value;

		// when filter exists
		if (filter !== undefined) {

			// when dataOrArrayOrParams is data
			if (CHECK_IS_DATA(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, name) {

					// remove value passed filter.
					if (filter(value) === true) {

						REMOVE({
							data : dataOrArrayOrParams,
							name : name
						});
					}
				});
			}

			// when dataOrArrayOrParams is array
			else if (CHECK_IS_ARRAY(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, key) {

					// remove value passed filter.
					if (filter(value) === true) {

						REMOVE({
							array : dataOrArrayOrParams,
							key : key
						});
					}
				});
			}
		}

		// when filter not exists
		else {

			// init params.
			data = dataOrArrayOrParams.data;
			array = dataOrArrayOrParams.array;
			name = dataOrArrayOrParams.name;
			key = dataOrArrayOrParams.key;
			value = dataOrArrayOrParams.value;

			// remove at name.
			if (name !== undefined) {
				delete data[name];
			}

			// remove at key.
			if (key !== undefined) {
				array.splice(key, 1);
			}

			// remove value.
			if (value !== undefined) {

				if (data !== undefined) {

					EACH(data, function(_value, name) {

						if (CHECK_ARE_SAME([_value, value]) === true) {

							REMOVE({
								data : data,
								name : name
							});
						}
					});
				}

				if (array !== undefined) {

					EACH(array, function(_value, key) {

						if (CHECK_ARE_SAME([_value, value]) === true) {

							REMOVE({
								array : array,
								key : key
							});
						}
					});
				}
			}
		}
	}
});

/**
 * Calendar class
 */
global.CALENDAR = CLASS({

	init : function(inner, self, date) {
		'use strict';
		//OPTIONAL: date

		var
		// get year.
		getYear,

		// get month.
		getMonth,

		// get date.
		getDate,

		// get day.
		getDay,

		// get hour.
		getHour,

		// get minute
		getMinute,

		// get second.
		getSecond;

		if (date === undefined) {
			date = new Date();
		}

		self.getYear = getYear = function() {
			return date.getFullYear();
		};

		self.getMonth = getMonth = function(isFormal) {
			//OPTIONAL: isFormal
			
			var
			// month
			month = date.getMonth() + 1;
			
			if (isFormal === true) {
				if (month < 10) {
					return '0' + month;
				} else {
					return '' + month;
				}
			} else {
				return month;
			}
		};

		self.getDate = getDate = function(isFormal) {
			//OPTIONAL: isFormal
			
			var
			// date
			d = date.getDate();
			
			if (isFormal === true) {
				if (d < 10) {
					return '0' + d;
				} else {
					return '' + d;
				}
			} else {
				return d;
			}
		};

		self.getDay = getDay = function() {
			return date.getDay();
		};

		self.getHour = getHour = function(isFormal) {
			//OPTIONAL: isFormal
			
			var
			// hour
			hour = date.getHours();
			
			if (isFormal === true) {
				if (hour < 10) {
					return '0' + hour;
				} else {
					return '' + hour;
				}
			} else {
				return hour;
			}
		};

		self.getMinute = getMinute = function(isFormal) {
			//OPTIONAL: isFormal
			
			var
			// minute
			minute = date.getMinutes();
			
			if (isFormal === true) {
				if (minute < 10) {
					return '0' + minute;
				} else {
					return '' + minute;
				}
			} else {
				return minute;
			}
		};

		self.getSecond = getSecond = function(isFormal) {
			//OPTIONAL: isFormal
			
			var
			// second
			second = date.getSeconds();
			
			if (isFormal === true) {
				if (second < 10) {
					return '0' + second;
				} else {
					return '' + second;
				}
			} else {
				return second;
			}
		};
	}
});

/**
 * create date type.
 */
global.CREATE_DATE = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.year
		//OPTIONAL: params.month
		//OPTIONAL: params.date
		//OPTIONAL: params.hour
		//OPTIONAL: params.minute
		//OPTIONAL: params.second
		
		var
		// year
		year = params.year,
		
		// month
		month = params.month,
		
		// date
		date = params.date,
		
		// hour
		hour = params.hour,
		
		// minute
		minute = params.minute,
		
		// second
		second = params.second,
		
		// now cal
		nowCal = CALENDAR(new Date());
		
		if (year === undefined) {
			year = nowCal.getYear();
		}
		
		if (month === undefined) {
			month = date === undefined ? 0 : nowCal.getMonth();
		}
		
		if (date === undefined) {
			date = hour === undefined ? 0 : nowCal.getDate();
		}
		
		if (hour === undefined) {
			hour = minute === undefined ? 0 : nowCal.getHour();
		}
		
		if (minute === undefined) {
			minute = second === undefined ? 0 : nowCal.getMinute();
		}
		
		if (second === undefined) {
			second = 0;
		}

		return new Date(year, month - 1, date, hour, minute, second);
	}
});

/**
 * Delay class
 */
global.DELAY = CLASS({

	init : function(inner, self, seconds, func) {
		'use strict';
		//REQUIRED: seconds
		//OPTIONAL: func

		var
		// milliseconds
		milliseconds,
		
		// start time
		startTime = Date.now(),
		
		// remaining
		remaining,
		
		// timeout
		timeout,

		// resume.
		resume,
		
		// pause.
		pause,
		
		// remove.
		remove;

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}
		
		remaining = milliseconds = seconds * 1000;
		
		self.resume = resume = RAR(function() {
			
			if (timeout === undefined) {
				
				timeout = setTimeout(function() {
					func(self);
				}, remaining);
			}
		});
		
		self.pause = pause = function() {
			
			remaining = milliseconds - (Date.now() - startTime);
			
			clearTimeout(timeout);
			timeout = undefined;
		};
		
		self.remove = remove = function() {
			pause();
		};
	}
});

/**
 * Interval class
 */
global.INTERVAL = CLASS({

	init : function(inner, self, seconds, func) {
		'use strict';
		//REQUIRED: seconds
		//OPTIONAL: func

		var
		// milliseconds
		milliseconds,
		
		// start time
		startTime = Date.now(),
		
		// remaining
		remaining,
		
		// interval
		interval,
		
		// resume.
		resume,
		
		// pause.
		pause,

		// remove.
		remove;

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}
		
		remaining = milliseconds = seconds === 0 ? 1 : seconds * 1000;
		
		self.resume = resume = RAR(function() {
			
			if (interval === undefined) {
				
				interval = setInterval(function() {
					
					if (func(self) === false) {
						remove();
					}
					
					startTime = Date.now();
					
				}, remaining);
			}
		});
		
		self.pause = pause = function() {
			
			remaining = milliseconds - (Date.now() - startTime);
			
			clearInterval(interval);
			interval = undefined;
		};
		
		self.remove = remove = function() {
			pause();
		};
	}
});

/**
 * Loop class (for game etc.)
 */
global.LOOP = CLASS(function(cls) {
	'use strict';

	var
	// before time
	beforeTime,

	// animation interval
	animationInterval,

	// loop infos
	loopInfos = [],

	// runs
	runs = [],

	// fire.
	fire = function() {

		if (animationInterval === undefined) {

			beforeTime = Date.now();

			animationInterval = INTERVAL(function() {

				var
				// time
				time = Date.now(),

				// times
				times = time - beforeTime,

				// loop info
				loopInfo,

				// count
				count,

				// interval
				interval,

				// i, j
				i, j;

				if (times > 0) {

					for ( i = 0; i < loopInfos.length; i += 1) {

						loopInfo = loopInfos[i];

						if (loopInfo.fps !== undefined && loopInfo.fps > 0) {

							if (loopInfo.timeSigma === undefined) {
								loopInfo.timeSigma = 0;
								loopInfo.countSigma = 0;
							}

							// calculate count.
							count = parseInt(loopInfo.fps / (1000 / times) * (loopInfo.timeSigma / times + 1), 10) - loopInfo.countSigma;

							// start.
							if (loopInfo.start !== undefined) {
								loopInfo.start();
							}

							// run interval.
							interval = loopInfo.interval;
							for ( j = 0; j < count; j += 1) {
								interval(loopInfo.fps);
							}

							// end.
							if (loopInfo.end !== undefined) {
								loopInfo.end(times);
							}

							loopInfo.countSigma += count;

							loopInfo.timeSigma += times;
							if (loopInfo.timeSigma > 1000) {
								loopInfo.timeSigma = undefined;
							}
						}
					}

					// run runs.
					for ( i = 0; i < runs.length; i += 1) {
						runs[i](times);
					}

					beforeTime = time;
				}
			});
		}
	},

	// stop.
	stop = function() {

		if (loopInfos.length <= 0 && runs.length <= 0) {

			animationInterval.remove();
			animationInterval = undefined;
		}
	};

	return {

		init : function(inner, self, fps, intervalOrFuncs) {
			//OPTIONAL: fps
			//OPTIONAL: intervalOrFuncs
			//OPTIONAL: intervalOrFuncs.start
			//REQUIRED: intervalOrFuncs.interval
			//OPTIONAL: intervalOrFuncs.end

			var
			// run.
			run,

			// start.
			start,

			// interval.
			interval,

			// end.
			end,

			// info
			info,
			
			// resume.
			resume,
			
			// pause.
			pause,

			// change fps.
			changeFPS,

			// remove.
			remove;

			// when intervalOrFuncs exists
			if (intervalOrFuncs !== undefined) {

				// init intervalOrFuncs.
				if (CHECK_IS_DATA(intervalOrFuncs) !== true) {
					interval = intervalOrFuncs;
				} else {
					start = intervalOrFuncs.start;
					interval = intervalOrFuncs.interval;
					end = intervalOrFuncs.end;
				}
			
				self.resume = resume = RAR(function() {
					
					loopInfos.push( info = {
						fps : fps,
						start : start,
						interval : interval,
						end : end
					});
					
					fire();
				});

				self.pause = pause = function() {

					REMOVE({
						array : loopInfos,
						value : info
					});

					stop();
				};

				self.changeFPS = changeFPS = function(fps) {
					//REQUIRED: fps

					info.fps = fps;
				};

				self.remove = remove = function() {
					pause();
				};
			}

			// when fps is run
			else {
				
				self.resume = resume = RAR(function() {
					
					runs.push( run = fps);
					
					fire();
				});

				self.pause = pause = function() {

					REMOVE({
						array : runs,
						value : run
					});

					stop();
				};

				self.remove = remove = function() {
					pause();
				};
			}
		}
	};
});

/**
 * run `func` and return it.
 */
global.RAR = METHOD({

	run : function(params, func) {
		'use strict';
		//OPTIONAL: params
		//REQUIRED: func

		// init params and func.
		if (func === undefined) {
			func = params;
			params = undefined;
		}

		func(params);

		return func;
	}
});

/**
 * just run.
 *
 * use this if you need a code block.
 */
global.RUN = METHOD({

	run : function(func) {
		'use strict';
		//REQUIRED: func

		var
		// f.
		f = function() {
			return func(f);
		};

		return f();
	}
});

/**
 * convert integer string to integer number.
 */
global.INTEGER = METHOD({

	run : function(integerString) {
		'use strict';
		//OPTIONAL: integerString

		return integerString === undefined ? undefined : parseInt(integerString, 10);
	}
});

/**
 * generate random integer.
 */
global.RANDOM = METHOD({

	run : function(limitOrParams) {
		'use strict';
		//REQUIRED: limitOrParams
		//OPTIONAL: limitOrParams.min
		//OPTIONAL: limitOrParams.max
		//OPTIONAL: limitOrParams.limit

		var
		// min
		min,

		// max
		max,

		// limit
		limit;

		// init limitOrParams.
		if (CHECK_IS_DATA(limitOrParams) !== true) {
			limit = limitOrParams;
		} else {
			min = limitOrParams.min;
			max = limitOrParams.max;
			limit = limitOrParams.limit;
		}

		if (min === undefined) {
			min = 0;
		}

		if (limit !== undefined) {
			max = limit - 1;
		}

		return Math.floor(Math.random() * (max - min + 1) + min);
	}
});

/**
 * convert real number string to real number.
 */
global.REAL = METHOD({

	run : function(realNumberString) {'use strict';
		//OPTIONAL: realNumberString

		return realNumberString === undefined ? undefined : parseFloat(realNumberString);
	}
});

/**
 * same as `foreach`.
 */
global.EACH = METHOD({

	run : function(dataOrArrayOrString, func) {
		'use strict';
		//OPTIONAL: dataOrArrayOrString
		//REQUIRED: func

		var
		// length
		length,

		// name
		name,

		// extras
		i;

		// when dataOrArrayOrString is undefined
		if (dataOrArrayOrString === undefined) {
			return false;
		}

		// when dataOrArrayOrString is data
		else if (CHECK_IS_DATA(dataOrArrayOrString) === true) {

			for (name in dataOrArrayOrString) {
				if (dataOrArrayOrString.hasOwnProperty(name) === true) {
					if (func(dataOrArrayOrString[name], name) === false) {
						return false;
					}
				}
			}
		}

		// when dataOrArrayOrString is func
		else if (func === undefined) {

			func = dataOrArrayOrString;
			dataOrArrayOrString = undefined;

			return function(dataOrArrayOrString) {
				return EACH(dataOrArrayOrString, func);
			};
		}

		// when dataOrArrayOrString is array or arguments or string
		else {

			length = dataOrArrayOrString.length;

			for ( i = 0; i < length; i += 1) {

				if (func(dataOrArrayOrString[i], i) === false) {
					return false;
				}

				// when shrink
				if (dataOrArrayOrString.length < length) {
					i -= length - dataOrArrayOrString.length;
					length -= length - dataOrArrayOrString.length;
				}

				// when stretch
				else if (dataOrArrayOrString.length > length) {
					length += dataOrArrayOrString.length - length;
				}
			}
		}

		return true;
	}
});

/**
 * run `func` repeat `count` time, or same as `for`.
 */
global.REPEAT = METHOD({

	run : function(countOrParams, func) {
		'use strict';
		//OPTIONAL: countOrParams
		//REQUIRED: countOrParams.start
		//OPTIONAL: countOrParams.end
		//OPTIONAL: countOrParams.limit
		//OPTIONAL: countOrParams.step
		//REQUIRED: func

		var
		// count
		count,

		// start
		start,

		// end
		end,

		// limit
		limit,

		// step
		step,

		// extras
		i;
		
		if (func === undefined) {
			func = countOrParams;
			countOrParams = undefined;
		}

		if (countOrParams !== undefined) {
			if (CHECK_IS_DATA(countOrParams) !== true) {
				count = countOrParams;
			} else {
				start = countOrParams.start;
				end = countOrParams.end;
				limit = countOrParams.limit;
				step = countOrParams.step;
			}
		}

		if (limit === undefined && end !== undefined) {
			limit = end + 1;
		}

		if (step === undefined) {
			step = 1;
		}

		// count mode
		if (count !== undefined) {

			for ( i = 0; i < parseInt(count, 10); i += 1) {
				if (func(i) === false) {
					return false;
				}
			}
		}

		// end mode
		else if (end !== undefined && start > end) {

			for ( i = start; i >= end; i -= step) {
				if (func(i) === false) {
					return false;
				}
			}

		}

		// limit mode
		else if (limit !== undefined) {

			for ( i = start; i < limit; i += step) {
				if (func(i) === false) {
					return false;
				}
			}
		}
		
		// func mode
		else {
			
			return function(countOrParams) {
				return REPEAT(countOrParams, func);
			};
		}

		return true;
	}
});

/**
 * same as `foreach`, but reverse.
 */
global.REVERSE_EACH = METHOD({

	run : function(arrayOrString, func) {
		'use strict';
		//OPTIONAL: arrayOrString
		//REQUIRED: func

		var
		// length
		length,

		// name
		name,

		// extras
		i;

		// when arrayOrString is undefined
		if (arrayOrString === undefined) {
			return false;
		}

		// when arrayOrString is func
		else if (func === undefined) {

			func = arrayOrString;
			arrayOrString = undefined;

			return function(arrayOrString) {
				return REVERSE_EACH(arrayOrString, func);
			};
		}

		// when arrayOrString is array or arguments or string
		else {

			length = arrayOrString.length;

			for ( i = length - 1; i >= 0; i -= 1) {

				if (func(arrayOrString[i], i) === false) {
					return false;
				}
				
				// when shrink
				if (arrayOrString.length < length) {
					i += length - arrayOrString.length;
				}
			}
		}

		return true;
	}
});

/**
 * Browser-side Configuration
 */
global.BROWSER_CONFIG = {
	
	// fixScriptsFolderPath

	host : location.hostname,
	
	port : location.port === '' ? (location.protocol === 'https:' ? 443 : 80) : INTEGER(location.port),
	
	isSecure : location.protocol === 'https:',

	isSupportingX2 : false,
	
	isUsingFlashCanvasPro : false
};

/**
 * Browser store class (using Cookie)
 */
global.COOKIE_STORE = CLASS({

	init : function(inner, self, storeNameOrParams) {
		'use strict';
		//REQUIRED: storeNameOrParams
		//REQUIRED: storeNameOrParams.storeName
		//OPTIONAL: storeNameOrParams.domain

		var
		// store name
		storeName,
		
		// domain
		domain,
		
		// gen full name.
		genFullName,

		// save.
		save,

		// get.
		get,
		
		// list.
		list,

		// remove.
		remove;
		
		if (CHECK_IS_DATA(storeNameOrParams) !== true) {
			storeName = storeNameOrParams;
		} else {
			storeName = storeNameOrParams.storeName;
			domain = storeNameOrParams.domain;
		}

		inner.genFullName = genFullName = function(name) {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		self.save = save = function(params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value
			//OPTIONAL: params.isToSession

			var
			// name
			name = params.name,

			// value
			value = params.value,

			// expire time
			expireTime,

			// is to session
			isToSession = params.isToSession;

			if (isToSession === true) {
				expireTime = 0;
			} else {

				// set expire time 1 year
				expireTime = new Date();
				expireTime.setDate(expireTime.getDate() + 356);
			}

			document.cookie = genFullName(name) + '=' + encodeURIComponent(JSON.stringify(value)) + '; expires=' + (expireTime === 0 ? expireTime : expireTime.toGMTString()) + '; path=/;' + (domain === undefined ? '' : ' domain=' + domain + ';');
		};

		self.get = get = function(name) {
			//REQUIRED: name

			var
			// cookie
			cookie = document.cookie,

			// isPop
			pop,

			// extras
			i, temp, d;

			name = genFullName(name) + '=';

			i = cookie.indexOf(name);

			if (cookie && i >= 0) {
				temp = cookie.substring(i, cookie.length);
				d = temp.indexOf(';');
				if (d > 0) {
					pop = temp.substring(name.length, d);
				} else {
					pop = temp.substring(name.length);
				}
			}
			
			return pop === undefined ? undefined : JSON.parse(decodeURIComponent(pop));
		};
		
		self.list = list = function() {
			
			var
			// values
			values = {},
			
			// full name
			fullName,
			
			// name
			name;
			
			EACH(document.cookie.split(';'), function(str) {
				
				var
				// index
				index = str.indexOf('='),
				
				// full name
				fullName = str.substring(0, index);
				
				if (fullName.substring(0, storeName.length + 1) === storeName + '.') {
					
					name = fullName.substring(storeName.length + 1);
					
					values[name] = str.substring(index + 1);
				}
			});
			
			return values;
		};

		self.remove = remove = function(name) {
			//REQUIRED: name

			var
			// expire time
			expireTime;

			expireTime = new Date();
			expireTime.setDate(expireTime.getDate() - 1);
			
			document.cookie = genFullName(name) + '=; expires=' + expireTime.toGMTString() + '; path=/;' + (domain === undefined ? '' : ' domain=' + domain + ';');
		};
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.COOKIE_STORE = CLASS({

		init : function(inner, self, storeNameOrParams) {
			//REQUIRED: storeNameOrParams
			//REQUIRED: storeNameOrParams.storeName
			//OPTIONAL: storeNameOrParams.domain

			var
			// store name
			storeName,
			
			// domain
			domain,
			
			// store
			store,
			
			// save.
			save,

			// get.
			get,

			// remove.
			remove;
			
			if (CHECK_IS_DATA(storeNameOrParams) !== true) {
				storeName = storeNameOrParams;
			} else {
				storeName = storeNameOrParams.storeName;
				domain = storeNameOrParams.domain;
			}
			
			store = COOKIE_STORE({
				storeName : box.boxName + '.' + storeName,
				domain : domain
			});

			self.save = save = store.save;

			self.get = get = store.get;

			self.remove = remove = store.remove;
		}
	});
});

/**
 * Browser information object
 */
global.INFO = OBJECT({

	init : function(inner, self) {
		'use strict';

		var
		// is touch mode
		isTouchMode = global.ontouchstart !== undefined,
		
		// browser info
		browserInfo,

		// get lang.
		getLang,

		// change lang.
		changeLang,

		// check is HD display.
		checkIsHDDisplay,

		// check is touch mode.
		checkIsTouchMode,

		// check is exists tap delay.
		checkIsExistsTapDelay,

		// get browser info.
		getBrowserInfo;

		self.getLang = function() {

			var
			// language
			lang = STORE('__INFO').get('lang');

			if (lang === undefined) {

				lang = navigator.language;

				if (lang.length > 2) {
					lang = lang.substring(0, 2);
				}

				lang = lang.toLowerCase();
			}

			return lang;
		};

		self.changeLang = changeLang = function(lang) {
			//REQUIRED: lang

			STORE('__INFO').save({
				name : 'lang',
				value : lang
			});

			location.reload();
		};

		self.checkIsHDDisplay = checkIsHDDisplay = function() {
			return global.devicePixelRatio !== undefined && devicePixelRatio > 1 ? true : false;
		};

		self.checkIsTouchMode = checkIsTouchMode = function() {
			return isTouchMode;
		};

		self.checkIsExistsTapDelay = checkIsExistsTapDelay = function() {
			return false;
		};

		self.getBrowserInfo = getBrowserInfo = function() {
			// using bowser. (https://github.com/ded/bowser)
			return {
				name : bowser.name,
				version : REAL(bowser.version)
			};
		};
		
		EVENT_LOW('mousemove', function() {
			isTouchMode = false;
		});
		
		EVENT_LOW('touchstart', function() {
			isTouchMode = true;
		});
	}
});

/**
 * load JS file.
 */
global.LOAD = METHOD({

	run : function(urlOrParams, handlers) {
		'use strict';
		//REQUIRED: urlOrParams
		//REQUIRED: urlOrParams.url
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.isSecure
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.paramStr
		//OPTIONAL: urlOrParams.isNoCache
		//OPTIONAL: handlers
		//OPTIONAL: handlers.error

		var
		// url
		url,

		// is no Cache
		isNoCache,

		// host
		host,

		// port
		port,

		// is secure
		isSecure,

		// uri
		uri,

		// param str
		paramStr,

		// error handler.
		errorHandler,

		// current script
		currentScript,

		// script els
		scriptEls,

		// script el
		scriptEl,

		// is loaded
		isLoaded;

		if (CHECK_IS_DATA(urlOrParams) !== true) {
			url = urlOrParams;
		} else {

			url = urlOrParams.url;

			if (url === undefined) {

				host = urlOrParams.host === undefined ? BROWSER_CONFIG.host : urlOrParams.host;
				port = urlOrParams.port === undefined ? BROWSER_CONFIG.port : urlOrParams.port;
				isSecure = urlOrParams.isSecure;
				uri = urlOrParams.uri;
				paramStr = urlOrParams.paramStr;

				url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + uri + '?' + paramStr;
			}

			isNoCache = urlOrParams.isNoCache;
		}

		if (handlers !== undefined) {
			errorHandler = handlers.error;
		}

		READY.readyLoad();

		scriptEls = document.getElementsByTagName('script');
		currentScript = scriptEls[scriptEls.length - 1];

		scriptEl = document.createElement('script');
		scriptEl.src = (url.indexOf('?') === -1 ? url + '?' : url + '&') + (isNoCache !== true && CONFIG.version !== undefined ? 'version=' + CONFIG.version : (new Date()).getTime());

		scriptEl.onload = function() {

			if (isLoaded !== true) {
				isLoaded = true;

				READY.loaded();
			}
		};

		scriptEl.onreadystatechange = function() {

			var
			// ready state
			readyState = this.readyState;

			if (isLoaded !== true && (readyState === 'loaded' || readyState === 'complete')) {
				isLoaded = true;

				DELAY(function() {
					READY.loaded();
				});
			}
		};

		try {
			// this work only IE >= 9
			scriptEl.onerror = errorHandler;
		} catch (e) {
			// ignore.
		}

		// create script.
		return DOM({
			el : scriptEl
		}).insertAfter(DOM({
			el : currentScript
		}));
	}
});

/**
 * get/set meta description.
 */
global.META_DESCRIPTION = METHOD(function() {
	
	var
	// map
	map = {
		'&' : '&amp;',
		'<' : '&lt;',
		'>' : '&gt;',
		'"' : '&quot;',
		'\'' : '&#039;'
	};
	
	return {
	
		run : function(description) {
			'use strict';
			
			var
			// meta tags
			metaTags,
			
			// i
			i,
			
			// is set
			isSet = false,
			
			// new meta tag
			newMetaTag;
			
			// get.
			if (description === undefined) {
				description = '';
				
				metaTags = document.getElementsByTagName('meta');
				
				for (i = 0; i < metaTags.length; i += 1) {
					if (metaTags[i].name.toLowerCase() === 'description') {
						description = metaTags[i].content;
					}
				}
			}
			
			// set.
			else {
				
				description = description.replace(/[&<>"']/g, function(c) {
					return map[c];
				});
				
				metaTags = document.getElementsByTagName('meta');
				
				for (i = 0; i < metaTags.length; i += 1) {
					if (metaTags[i].name.toLowerCase() === 'description') {
						metaTags[i].content = description;
						isSet = true;
					}
				}
				
				if (isSet !== true) {
					newMetaTag = document.createElement('meta');
					newMetaTag.name = 'description';
					newMetaTag.content = description;
					
					document.getElementsByTagName('head')[0].appendChild(newMetaTag);
				}
			}
	
			return description;
		}
	};
});

/**
 * document ready.
 */
global.READY = METHOD(function(m) {
	'use strict';

	var
	// ready count
	readyCount = 0,

	// is loaded
	isLoaded,

	// handlers
	handlers = [],

	// ready load.
	readyLoad,

	// loaded.
	loaded;

	m.readyLoad = readyLoad = function() {
		readyCount += 1;
	};

	m.loaded = loaded = function() {

		readyCount -= 1;

		if (isLoaded === true && readyCount === 0) {

			EACH(handlers, function(handler) {
				handler();
			});

			handlers = [];
		}
	};

	global.onload = function() {

		isLoaded = true;

		if (readyCount === 0) {

			EACH(handlers, function(handler) {
				handler();
			});

			handlers = [];
		}
	};

	return {

		run : function(handler) {
			//REQUIRED: handler

			if (readyCount > 0 || isLoaded !== true) {
				handlers.push(handler);
			} else {
				handler();
			}
		}
	};
});

/**
 * SOUND class
 */
global.SOUND = CLASS(function(cls) {
	'use strict';

	var
	// audio context
	audioContext;

	return {

		init : function(inner, self, params) {
			//REQUIRED: params
			//OPTIONAL: params.mp3
			//OPTIONAL: params.ogg
			//OPTIONAL: params.isLoop

			var
			// src
			src = params.mp3,

			// ogg
			ogg = params.ogg,

			// is loop
			isLoop = params.isLoop,

			// audio
			audio = new Audio(),

			// request
			request,

			// buffer
			buffer,

			// source
			source,

			// delayed.
			delayed,

			// play.
			play,

			// stop.
			stop;

			// Check if we can play mp3, if not then fall back to ogg
			if (audio.canPlayType('audio/mpeg;') === '' && audio.canPlayType('audio/ogg;')) {
				src = ogg;
			}
			
			if (src === undefined) {
				
				self.play = play = function() {
					return self;
				};
	
				self.stop = stop = function() {
					// ignore.
				};
			}
			
			else {
				
				// init audioContext.
				if (audioContext === undefined && global.AudioContext !== undefined) {
					audioContext = new AudioContext();
				}
	
				// if exists audio context
				if (audioContext !== undefined) {
	
					request = new XMLHttpRequest();
					request.open('GET', src, true);
					request.responseType = 'arraybuffer';
	
					request.onload = function() {
	
						audioContext.decodeAudioData(request.response, function(_buffer) {
	
							var
							// gain
							gain = audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode();
	
							buffer = _buffer;
	
							// default volume
							// support both webkitAudioContext or standard AudioContext
							gain.connect(audioContext.destination);
							gain.gain.value = 0.5;
	
							if (delayed !== undefined) {
								delayed();
							}
						});
					};
					request.send();
	
					self.play = play = function() {
	
						delayed = function() {
	
							source = audioContext.createBufferSource();
							// creates a sound source
							source.buffer = buffer;
							// tell the source which sound to play
							source.connect(audioContext.destination);
							// connect the source to the context's destination (the speakers)
							// support both webkitAudioContext or standard AudioContext
	
							source.loop = isLoop;
	
							if (source.noteOn !== undefined) {
								source.noteOn(0);
							} else {
								source.start(0);
							}
	
							delayed = undefined;
						};
	
						if (buffer !== undefined) {
							delayed();
						}
	
						return self;
					};
	
					self.stop = stop = function() {
	
						if (source !== undefined) {
							if (source.noteOff !== undefined) {
								source.noteOff(0);
							} else {
								source.stop(0);
							}
						}
					};
	
				}
	
				// if not exists audio context
				else {
	
					audio.src = src;
	
					if (isLoop === true) {
	
						// when audio ended, play again.
						audio.addEventListener('ended', function() {
							this.currentTime = 0;
							this.play();
						}, false);
					}
	
					self.play = play = function() {
	
						audio.play();
	
						return self;
					};
	
					self.stop = stop = function() {
						audio.pause();
					};
				}
			}
		}
	};
});

/**
 * Browser store class
 */
global.STORE = CLASS({

	init : function(inner, self, storeName) {
		'use strict';
		//REQUIRED: storeName

		var
		// gen full name.
		genFullName,

		// save.
		save,

		// get.
		get,
		
		// list.
		list,

		// remove.
		remove;

		inner.genFullName = genFullName = function(name) {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		self.save = save = function(params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value
			//OPTIONAL: params.isToSession

			var
			// name
			name = params.name,

			// full name
			fullName = genFullName(name),

			// value
			value = params.value,

			// is to session
			isToSession = params.isToSession;

			sessionStorage.setItem(fullName, STRINGIFY(value));

			if (isToSession !== true) {
				localStorage.setItem(fullName, STRINGIFY(value));
			}
		};

		self.get = get = function(name) {
			//REQUIRED: name

			var
			// full name
			fullName = genFullName(name),

			// value
			value = PARSE_STR(sessionStorage.getItem(fullName));

			if (value === undefined || value === TO_DELETE) {
				value = PARSE_STR(localStorage.getItem(fullName));

				if (value === TO_DELETE) {
					value = undefined;
				}
			}

			return value;
		};
		
		self.list = list = function() {
			
			var
			// values
			values = {},
			
			// full name
			fullName,
			
			// name
			name,
			
			// i
			i;
			
			// find session storage value.
			for (i = 0; i < sessionStorage.length; i += 1) {
				
				fullName = sessionStorage.key(i);
				
				if (fullName.substring(0, storeName.length + 1) === storeName + '.') {
					
					name = fullName.substring(storeName.length + 1);
					
					values[name] = get(name);
				}
			}
			
			// find local storage value.
			for (i = 0; i < localStorage.length; i += 1) {
				
				fullName = localStorage.key(i);
				
				if (fullName.substring(0, storeName.length + 1) === storeName + '.') {
					
					name = fullName.substring(storeName.length + 1);
					
					values[name] = get(name);
				}
			}
			
			return values;
		};

		self.remove = remove = function(name) {
			//REQUIRED: name

			var
			// full name
			fullName = genFullName(name);

			sessionStorage.removeItem(fullName);
			localStorage.removeItem(fullName);
		};
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.STORE = CLASS({

		init : function(inner, self, storeName) {
			//REQUIRED: storeName

			var
			// store
			store = STORE(box.boxName + '.' + storeName),

			// save.
			save,

			// get.
			get,

			// remove.
			remove;

			self.save = save = store.save;

			self.get = get = store.get;

			self.remove = remove = store.remove;
		}
	});
});

/**
 * create clear:both div.
 */
global.CLEAR_BOTH = METHOD({

	run : function() {
		'use strict';

		return DIV({
			style : {
				clear : 'both'
			}
		});
	}
});

/**
 * Dom wrapper class
 */
global.DOM = CLASS({

	preset : function() {
		'use strict';

		return NODE;
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.tag
		//OPTIONAL: params.style
		//OPTIONAL: params.c
		//OPTIONAL: params.on
		//OPTIONAL: params.__TEXT
		//OPTIONAL: params.el

		var
		// tag
		tag = params.tag,

		// __TEXT
		__TEXT = params.__TEXT,

		// HTML Element
		el = params.el,

		// get el.
		getEl,

		// set el.
		setEl,

		// set attr.
		setAttr;

		// when tag is not undefined
		if (tag !== undefined) {

			if (tag === 'body') {
				el = document.body;
			} else if (tag === '__STRING') {
				el = document.createTextNode(__TEXT);
			} else {
				el = document.createElement(tag);
			}
		}

		// when tag is undefined, el is not undefined
		else if (el !== document.body && el.parentNode !== TO_DELETE) {

			self.setParent(DOM({
				el : el.parentNode
			}));
		}

		self.getEl = getEl = function() {
			return el;
		};

		inner.setEl = setEl = function(_el) {
			//REQUIRED: _el

			el = _el;

			inner.setDom(self);
		};

		setEl(el);

		inner.setAttr = setAttr = function(params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value

			var
			// name
			name = params.name,

			// value
			value = params.value;

			el.setAttribute(name, value);
		};
	}
});

/**
 * Node interface
 */
global.NODE = CLASS({

	init : function(inner, self) {
		'use strict';

		var
		// wrapper dom
		wrapperDom,

		// content dom
		contentDom,

		// wrapper el
		wrapperEl,

		// content el
		contentEl,

		// waiting after nodes
		waitingAfterNodes,

		// waiting before nodes
		waitingBeforeNodes,

		// parent node
		parentNode,

		// child nodes
		childNodes = [],

		// origin display
		originDisplay,
		
		// data
		data,

		// set wrapper dom.
		setWrapperDom,

		// set content dom.
		setContentDom,

		// set dom.
		setDom,

		// get wrapper dom.
		getWrapperDom,

		// get content dom.
		getContentDom,

		// get wrapper el.
		getWrapperEl,

		// get content el.
		getContentEl,

		// attach.
		attach,

		// append.
		append,

		// append to.
		appendTo,

		// prepend.
		prepend,

		// prepend to.
		prependTo,

		// after.
		after,

		// insert after.
		insertAfter,

		// before.
		before,

		// insert before.
		insertBefore,

		// remove.
		remove,

		// empty.
		empty,

		// set parent.
		setParent,

		// get parent.
		getParent,

		// get children.
		getChildren,

		// on.
		on,

		// off.
		off,

		// add style.
		addStyle,

		// get style.
		getStyle,

		// get width.
		getWidth,

		// get inner width.
		getInnerWidth,

		// get height.
		getHeight,

		// get inner height.
		getInnerHeight,

		// get left.
		getLeft,

		// get top.
		getTop,

		// hide.
		hide,

		// show.
		show,

		// check is showing.
		checkIsShowing,
		
		// set data.
		setData,
		
		// get data.
		getData,
		
		// scroll to.
		scrollTo;

		inner.setWrapperDom = setWrapperDom = function(dom) {
			//REQUIRED: dom

			wrapperDom = dom;
			wrapperEl = dom.getEl();

			originDisplay = getStyle('display');

			on('show', function() {

				EACH(childNodes, function(childNode) {

					if (childNode.checkIsShowing() === true) {

						EVENT.fireAll({
							node : childNode,
							name : 'show'
						});

						EVENT.removeAll({
							node : childNode,
							name : 'show'
						});
					}
				});
			});
		};

		inner.setContentDom = setContentDom = function(dom) {
			//REQUIRED: dom

			contentDom = dom;
			contentEl = dom.getEl();
		};

		inner.setDom = setDom = function(dom) {
			//REQUIRED: dom

			setWrapperDom(dom);
			setContentDom(dom);
		};

		self.getWrapperDom = getWrapperDom = function() {
			return wrapperDom;
		};

		self.getContentDom = getContentDom = function() {
			return contentDom;
		};

		self.getWrapperEl = getWrapperEl = function() {
			return wrapperEl;
		};

		self.getContentEl = getContentEl = function() {
			return contentEl;
		};

		attach = function(node, index) {
			//REQUIRED: node
			//OPTIOANL: index

			setParent(node);

			if (index === undefined) {
				parentNode.getChildren().push(self);
			} else {
				parentNode.getChildren().splice(index, 0, self);
			}
			
			EVENT.fireAll({
				node : self,
				name : 'attach'
			});

			if (checkIsShowing() === true) {

				EVENT.fireAll({
					node : self,
					name : 'show'
				});

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}

			// run after wating after nodes.
			if (waitingAfterNodes !== undefined) {
				EACH(waitingAfterNodes, function(node) {
					after(node);
				});
			}

			// run before wating before nodes.
			if (waitingBeforeNodes !== undefined) {
				EACH(waitingBeforeNodes, function(node) {
					before(node);
				});
			}
		};

		self.append = append = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;

			// append child.
			if (CHECK_IS_DATA(node) === true) {
				node.appendTo(self);
			}

			// append textarea content.
			else if (self.type === TEXTAREA) {

				append(DOM({
					tag : '__STRING',
					__TEXT : String(node === undefined ? '' : node)
				}));
			}

			// append string.
			else {

				splits = String(node === undefined ? '' : node).split('\n');

				EACH(splits, function(text, i) {

					append(DOM({
						tag : '__STRING',
						__TEXT : text
					}));

					if (i < splits.length - 1) {
						append(BR());
					}
				});
			}
		};

		self.appendTo = appendTo = function(node) {
			//REQUIRED: node
			
			var
			// parent el
			parentEl = node.getContentEl();

			if (parentEl !== undefined) {
				
				parentEl.appendChild(wrapperEl);

				attach(node);
			}

			return self;
		};

		self.prepend = prepend = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;

			// prepend child.
			if (CHECK_IS_DATA(node) === true) {
				node.prependTo(self);
			}

			// prepend textarea content.
			else if (self.type === TEXTAREA) {

				prepend(DOM({
					tag : '__STRING',
					__TEXT : String(node === undefined ? '' : node)
				}));
			}

			// prepend string.
			else {

				splits = String(node === undefined ? '' : node).split('\n');

				REPEAT({
					start : splits.length - 1,
					end : 0
				}, function(i) {

					prepend(DOM({
						tag : '__STRING',
						__TEXT : splits[i]
					}));

					if (i < splits.length - 1) {
						prepend(BR());
					}
				});
			}
		};

		self.prependTo = prependTo = function(node) {
			//REQUIRED: node

			var
			// parent el
			parentEl = node.getContentEl();

			if (parentEl !== undefined) {
				
				if (parentEl.childNodes[0] === undefined) {
					parentEl.appendChild(wrapperEl);
				} else {
					parentEl.insertBefore(wrapperEl, parentEl.childNodes[0]);
				}

				attach(node, 0);
			}

			return self;
		};

		self.after = after = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;
			
			if (wrapperEl !== undefined) {
	
				// wait after node.
				if (wrapperEl.parentNode === TO_DELETE) {
	
					if (waitingAfterNodes === undefined) {
						waitingAfterNodes = [];
					}
	
					waitingAfterNodes.push(node);
				}
	
				// after node.
				else {
	
					// after child.
					if (CHECK_IS_DATA(node) === true) {
						node.insertAfter(self);
					}
	
					// after string.
					else {
	
						splits = String(node === undefined ? '' : node).split('\n');
	
						REPEAT({
							start : splits.length - 1,
							end : 0
						}, function(i) {
	
							after(DOM({
								tag : '__STRING',
								__TEXT : splits[i]
							}));
	
							if (i < splits.length - 1) {
								after(BR());
							}
						});
					}
				}
			}
		};

		self.insertAfter = insertAfter = function(node) {
			//REQUIRED: node

			var
			// before el
			beforeEl = node.getWrapperEl(),
			
			// now index
			nowIndex,
			
			// to index
			toIndex;
			
			if (beforeEl !== undefined) {
				
				beforeEl.parentNode.insertBefore(wrapperEl, beforeEl.nextSibling);
				
				nowIndex = FIND({
					array : node.getParent().getChildren(),
					value : self
				});
				
				toIndex = FIND({
					array : node.getParent().getChildren(),
					value : node
				}) + 1;

				attach(node.getParent(), nowIndex < toIndex ? toIndex - 1 : toIndex);
			}

			return self;
		};

		self.before = before = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;
			
			if (wrapperEl !== undefined) {
	
				// wait before node.
				if (wrapperEl.parentNode === TO_DELETE) {
	
					if (waitingBeforeNodes === undefined) {
						waitingBeforeNodes = [];
					}
	
					waitingBeforeNodes.push(node);
				}
	
				// before node.
				else {
	
					// before child.
					if (CHECK_IS_DATA(node) === true) {
						node.insertBefore(self);
					}
	
					// before string.
					else {
	
						splits = String(node === undefined ? '' : node).split('\n');
	
						EACH(splits, function(text, i) {
	
							before(DOM({
								tag : '__STRING',
								__TEXT : text
							}));
	
							if (i < splits.length - 1) {
								before(BR());
							}
						});
					}
				}
			}
		};

		self.insertBefore = insertBefore = function(node) {
			//REQUIRED: node

			var
			// after el
			afterEl = node.getWrapperEl();

			if (afterEl !== undefined) {
				
				afterEl.parentNode.insertBefore(wrapperEl, afterEl);

				attach(node.getParent(), FIND({
					array : node.getParent().getChildren(),
					value : node
				}));
			}

			return self;
		};

		self.remove = remove = function() {

			if (wrapperEl !== undefined && wrapperEl.parentNode !== TO_DELETE) {

				// empty children.
				empty();

				// remove from parent node.
				wrapperEl.parentNode.removeChild(wrapperEl);

				setParent(undefined);

				// fire remove event.
				EVENT.fireAll({
					node : self,
					name : 'remove'
				});

				EVENT.removeAll({
					node : self
				});

				// free memory.
				wrapperEl = undefined;
				contentEl = undefined;
			}
			
			// free memory.
			data = undefined;
		};

		self.empty = empty = function() {
			EACH(childNodes, function(child) {
				child.remove();
			});
		};

		self.setParent = setParent = function(node) {
			//OPTIONAL: node
			
			if (parentNode !== undefined) {
				REMOVE({
					array : parentNode.getChildren(),
					value : self
				});
			}

			parentNode = node;
		};
		
		self.getParent = getParent = function() {
			return parentNode;
		};

		self.getChildren = getChildren = function() {
			return childNodes;
		};

		self.on = on = function(eventName, eventHandler) {
			//REQUIRED: eventName
			//REQUIRED: eventHandler

			EVENT({
				node : self,
				name : eventName
			}, eventHandler);
		};

		self.off = off = function(eventName, eventHandler) {
			//REQUIRED: eventName
			//OPTIONAL: eventHandler

			if (eventHandler !== undefined) {

				EVENT.remove({
					node : self,
					name : eventName
				}, eventHandler);

			} else {

				EVENT.removeAll({
					node : self,
					name : eventName
				});
			}
		};

		self.addStyle = addStyle = function(style) {
			//REQUIRED: style

			ADD_STYLE({
				node : self,
				style : style
			});
		};

		self.getStyle = getStyle = function(name) {
			//REQUIRED: name

			var
			// styles
			styles,

			// style
			style;

			if (wrapperEl !== undefined) {

				styles = wrapperEl.style;

				if (styles !== undefined) {

					style = styles[name];

					return style === '' ? undefined : (style.substring(style.length - 2) === 'px' ? REAL(style) : style);
				}
			}
		};

		self.getWidth = getWidth = function() {
			return wrapperEl.offsetWidth;
		};

		self.getInnerWidth = getInnerWidth = function() {
			return wrapperEl.clientWidth;
		};

		self.getHeight = getHeight = function() {
			return wrapperEl.offsetHeight;
		};

		self.getInnerHeight = getInnerHeight = function() {
			return wrapperEl.clientHeight;
		};

		self.getLeft = getLeft = function() {

			var
			// left
			left = 0,

			// parent el
			parentEl = wrapperEl;

			do {
				left += parentEl.offsetLeft - (parentEl === document.body ? 0 : parentEl.scrollLeft);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return left;
		};

		self.getTop = getTop = function() {

			var
			// top
			top = 0,

			// parent el
			parentEl = wrapperEl;

			do {
				top += parentEl.offsetTop - (parentEl === document.body ? 0 : parentEl.scrollTop);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return top;
		};

		self.hide = hide = function() {

			addStyle({
				display : 'none'
			});
		};

		self.show = show = function() {

			addStyle({
				display : originDisplay === undefined ? '' : originDisplay
			});

			if (checkIsShowing() === true) {

				EVENT.fireAll({
					node : self,
					name : 'show'
				});

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}
		};

		self.checkIsShowing = checkIsShowing = function() {

			if (wrapperEl === document.body) {
				return true;
			} else {
				return parentNode !== undefined && parentNode.checkIsShowing() === true && getStyle('display') !== 'none';
			}
		};
		
		self.setData = setData = function(_data) {
			//REQUIRED: _data
			
			data = _data;
		};
		
		self.getData = getData = function() {
			return data;
		};
		
		self.scrollTo = scrollTo = function(params) {
			//REQUIRED: params
			//OPTIONAL: params.left
			//OPTIONAL: params.top
			
			var
			// left
			left = params.left,
			
			// top
			top = params.top;
			
			if (contentEl !== undefined) {
			
				if (left !== undefined) {
					contentEl.scrollLeft = left;
				}
				
				if (top !== undefined) {
					contentEl.scrollTop = top;
				}
			}
		};
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.style
		//OPTIONAL: params.c
		//OPTIONAL: params.on

		var
		// style
		style,

		// children
		children,

		// on
		on;

		// init params.
		if (params !== undefined) {
			style = params.style;
			children = params.c === undefined || CHECK_IS_ARRAY(params.c) === true ? params.c : [params.c];
			on = params.on;
		}

		if (style !== undefined) {
			self.addStyle(style);
		}

		if (on !== undefined) {
			EACH(on, function(handler, name) {
				self.on(name, handler);
			});
		}

		if (children !== undefined) {
			EACH(children, function(child, i) {
				self.append(child);
			});
		}
	}
});

/**
 * animate node.
 */
global.ANIMATE = METHOD({

	run : function(params, callback) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.node
		//REQUIRED: params.keyframes
		//OPTIONAL: params.duration
		//OPTIONAL: params.timingFunction
		//OPTIONAL: params.delay
		//OPTIONAL: params.iterationCount
		//OPTIONAL: params.direction
		//OPTIONAL: params.playState
		//OPTIONAL: callback

		var
		// node
		node = params.node,

		// keyframes
		keyframes = params.keyframes,

		// duration
		duration = params.duration === undefined ? 0.5 : params.duration,

		// timing function
		timingFunction = params.timingFunction === undefined ? '' : params.timingFunction,

		// delay
		delay = params.delay === undefined ? '' : params.delay,

		// iteration count
		iterationCount = params.iterationCount === undefined ? '' : params.iterationCount,

		// direction
		direction = params.direction === undefined ? '' : params.direction,

		// play state
		playState = params.playState === undefined ? '' : params.playState,

		// str
		str = keyframes.getName() + ' ' + duration + 's ' + timingFunction + ' ' + delay + ' ' + iterationCount + ' ' + direction + ' ' + playState;

		node.addStyle(keyframes.getStartStyle());

		node.addStyle({
			animation : str
		});

		node.addStyle(keyframes.getFinalStyle());

		if (callback !== undefined && (iterationCount === '' || iterationCount === 1)) {

			DELAY(duration, function() {
				callback(node);
			});
		}
	}
});


/**
 * Animation keyframes class
 */
global.KEYFRAMES = CLASS({

	init : function(inner, self, keyframes) {
		'use strict';
		//REQUIRED: keyframes

		var
		// name
		name = '__KEYFRAMES_' + self.id,

		// str
		str = '',

		// style el
		styleEl,

		// rules string
		rulesStr = '',

		// start style
		startStyle,

		// final style
		finalStyle,

		// get name.
		getName,

		// get start style.
		getStartStyle,

		// get final style.
		getFinalStyle;

		EACH(keyframes, function(style, key) {

			str += key + '{';

			EACH(style, function(value, name) {

				if ( typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
					value = value + 'px';
				}

				str += name.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + value + ';';

				// cross browser transform
				if (name === 'transform') {
					str += '-webkit-transform:' + value + ';';
					str += '-moz-transform:' + value + ';';
					str += '-o-transform:' + value + ';';
					str += '-ms-transform:' + value + ';';
				}
			});

			str += '}';

			if (key === 'from' || key === '0%') {
				startStyle = style;
			} else if (key === 'to' || key === '100%') {
				finalStyle = style;
			}
		});

		// cross browser @keyframes
		rulesStr += '@-webkit-keyframes ' + name + '{' + str + '}';
		rulesStr += '@-moz-keyframes ' + name + '{' + str + '}';
		rulesStr += '@-o-keyframes ' + name + '{' + str + '}';
		rulesStr += '@-ms-keyframes ' + name + '{' + str + '}';
		rulesStr += '@keyframes ' + name + '{' + str + '}';

		// create style element.
		styleEl = document.createElement('style');
		styleEl.type = 'text/css';
		styleEl.appendChild(document.createTextNode(rulesStr));
		document.getElementsByTagName('head')[0].appendChild(styleEl);

		self.getName = getName = function() {
			return name;
		};

		self.getStartStyle = getStartStyle = function() {
			return startStyle;
		};

		self.getFinalStyle = getFinalStyle = function() {
			return finalStyle;
		};
	}
});

/**
 * Dom event object wrapper class
 */
global.E = CLASS({

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.e
		//REQUIRED: params.el

		var
		// e
		e = params.e,

		// el
		el = params.el,

		// check is descendant.
		checkIsDescendant,

		// stop default.
		stopDefault,

		// stop bubbling.
		stopBubbling,

		// stop default and bubbling.
		stop,

		// get left.
		getLeft,

		// get top.
		getTop,

		// get key code.
		getKeyCode,

		// get key name.
		getKeyName,
		
		// get state.
		getState,
		
		// get detail.
		getDetail;

		checkIsDescendant = function(parent, child) {

			var
			// node
			node = child.parentNode;

			while (node !== TO_DELETE) {

				if (node === parent) {
					return true;
				}

				node = node.parentNode;
			}

			return false;
		};

		self.stopDefault = stopDefault = function() {
			e.preventDefault();
		};

		self.stopBubbling = stopBubbling = function() {
			e.stopPropagation();
		};

		self.stop = stop = function() {
			stopDefault();
			stopBubbling();
		};

		self.getLeft = getLeft = function() {

			var
			// touch page x
			touchPageX;

			// if is touch mode
			if (INFO.checkIsTouchMode() === true) {

				if (e.touches !== undefined && e.touches[0] !== undefined) {

					// first touch position.

					EACH(e.touches, function(touch) {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageX = touch.pageX;
							return false;
						}
					});

					if (touchPageX === undefined) {
						touchPageX = e.touches[0].pageX;
					}

					if (touchPageX !== undefined) {
						return touchPageX;
					}
				}

				if (e.changedTouches !== undefined && e.changedTouches[0] !== undefined) {

					// first touch position.

					EACH(e.changedTouches, function(touch) {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageX = touch.pageX;
							return false;
						}
					});

					if (touchPageX === undefined) {
						touchPageX = e.changedTouches[0].pageX;
					}

					if (touchPageX !== undefined) {
						return touchPageX;
					}
				}
			}

			return e.pageX;
		};

		self.getTop = getTop = function() {

			var
			// touch page y
			touchPageY;

			// if is touch mode
			if (INFO.checkIsTouchMode() === true) {

				if (e.touches !== undefined && e.touches[0] !== undefined) {

					// first touch position.

					EACH(e.touches, function(touch) {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageY = touch.pageY;
							return false;
						}
					});

					if (touchPageY === undefined) {
						touchPageY = e.touches[0].pageY;
					}

					if (touchPageY !== undefined) {
						return touchPageY;
					}
				}

				if (e.changedTouches !== undefined && e.changedTouches[0] !== undefined) {

					// first touch position.

					EACH(e.changedTouches, function(touch) {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageY = touch.pageY;
							return false;
						}
					});

					if (touchPageY === undefined) {
						touchPageY = e.changedTouches[0].pageY;
					}

					if (touchPageY !== undefined) {
						return touchPageY;
					}
				}
			}

			return e.pageY;
		};

		self.getKeyCode = getKeyCode = function() {
			return e.keyCode;
		};

		self.getKeyName = getKeyName = function() {
			return e.keyName;
		};
		
		self.getState = getState = function() {
			return e.state;
		};
		
		self.getDetail = getDetail = function() {
			return e.detail;
		};
	}
});

/**
 * Dom epmty event object class
 */
global.EMPTY_E = CLASS({

	init : function(inner, self) {
		'use strict';

		var
		// stop default.
		stopDefault,

		// stop bubbling.
		stopBubbling,

		// stop default and bubbling.
		stop,

		// get left.
		getLeft,

		// get top.
		getTop,

		// get key code.
		getKeyCode,
		
		// get state.
		getState;

		self.stopDefault = stopDefault = function() {
			// ignore.
		};

		self.stopBubbling = stopBubbling = function() {
			// ignore.
		};

		self.stop = stop = function() {
			// ignore.
		};

		self.getLeft = getLeft = function() {

			// on heaven!
			return -999999;
		};

		self.getTop = getTop = function() {

			// on heaven!
			return -999999;
		};

		self.getKeyCode = getKeyCode = function() {

			// on heaven!
			return -999999;
		};
		
		self.getState = getState = function() {
			// ignore.
		};
	}
});

/**
 * Event class
 */
global.EVENT = CLASS(function(cls) {
	'use strict';

	var
	// event map
	eventMaps = {},
	
	// vendors
	vendors = ['webkit', 'moz', 'o', 'ms'],
	
	// visibility change event name
	visibilityChangeEventName = 'visibilitychange',

	// fire all.
	fireAll,

	// remove all.
	removeAll,

	// remove.
	remove;
	
	if (document['hidden'] === undefined) {
		
		EACH(vendors, function(vendor) {
			
			if (document[vendor + 'Hidden'] !== undefined) {
				
				visibilityChangeEventName = vendor + 'visibilitychange';
				
				return false;
			}
		});
	}

	cls.fireAll = fireAll = function(nameOrParams) {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//REQUIRED: nameOrParams.name

		var
		// node
		node,

		// name
		name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events,

		// ret
		ret;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			events = eventMap[name];

			if (events !== undefined) {

				EACH(events, function(evt) {

					if (evt.fire() === false) {
						
						ret = false;
					}
				});
			}
		}

		return ret;
	};

	cls.removeAll = removeAll = function(nameOrParams) {
		//OPTIONAL: nameOrParams
		//OPTIONAL: nameOrParams.node
		//OPTIONAL: nameOrParams.name

		var
		// node
		node,

		// name
		name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			if (name !== undefined) {

				events = eventMap[name];

				if (events !== undefined) {

					EACH(events, function(evt) {
						evt.remove();
					});
				}

			} else {

				EACH(eventMap, function(events) {
					EACH(events, function(evt) {
						evt.remove();
					});
				});
			}
		}
	};

	cls.remove = remove = function(params, eventHandler) {
		//REQUIRED: params
		//OPTIONAL: params.node
		//REQUIRED: params.name
		//REQUIRED: eventHandler

		var
		// node
		node = params.node,

		// name
		name = params.name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events;

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			events = eventMap[name];

			if (events !== undefined) {

				EACH(events, function(evt) {
					if (evt.getEventHandler() === eventHandler) {
						evt.remove();
					}
				});
			}
		}
	};

	return {

		init : function(inner, self, nameOrParams, eventHandler) {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node
			//OPTIONAL: nameOrParams.lowNode
			//REQUIRED: nameOrParams.name
			//REQUIRED: eventHandler

			var
			// node
			node,

			// low node
			lowNode,

			// name
			name,

			// node id
			nodeId,

			// event lows
			eventLows = [],

			// sub event
			subEvent,

			// touch start left, top
			startLeft, startTop,

			// last tap time
			lastTapTime,

			// remove from map.
			removeFromMap,

			// remove.
			remove,

			// fire.
			fire,
			
			// get event handler.
			getEventHandler;

			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				node = nameOrParams.node;
				lowNode = nameOrParams.lowNode;
				name = nameOrParams.name;

				if (lowNode === undefined) {
					lowNode = node;
				}
			}

			if (node === undefined) {
				nodeId = 'body';
			} else {
				nodeId = node.id;
			}

			// push event to map.

			if (eventMaps[nodeId] === undefined) {
				eventMaps[nodeId] = {};
			}

			if (eventMaps[nodeId][name] === undefined) {
				eventMaps[nodeId][name] = [];
			}

			eventMaps[nodeId][name].push(self);

			removeFromMap = function() {

				REMOVE({
					array : eventMaps[nodeId][name],
					value : self
				});

				if (eventMaps[nodeId][name].length <= 0) {
					delete eventMaps[nodeId][name];
				}

				if (CHECK_IS_EMPTY_DATA(eventMaps[nodeId]) === true) {
					delete eventMaps[nodeId];
				}
			};

			// tap event (for remove click delay, simulate click event.)
			if (name === 'tap') {

				// when is touch mode or when is exists tap delay (300ms)
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, function(e) {
					if (INFO.checkIsTouchMode() === true && INFO.checkIsExistsTapDelay() === true && e !== undefined) {
						startLeft = e.getLeft();
						startTop = e.getTop();
					}
				}));

				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, function(e, node) {

					var
					// left
					left,

					// top
					top;

					if (INFO.checkIsTouchMode() === true && INFO.checkIsExistsTapDelay() === true && e !== undefined) {

						left = e.getLeft();
						top = e.getTop();

						if (startLeft - 5 <= left && left <= startLeft + 5 && startTop - 5 <= top && top <= startTop + 5) {
						
							if (lastTapTime === undefined || Date.now() - lastTapTime > 100) {
								
								lastTapTime = Date.now();
								
								if (nodeId !== 'body') {
									e.stopDefault();
								}
								
								return eventHandler(e, node);
							}
						}
					}
				}));

				// when is not touch mode or when is not exists tap delay (300ms)
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'click'
				}, function(e, node) {
					
					if (INFO.checkIsTouchMode() !== true || INFO.checkIsExistsTapDelay() !== true) {
						
						if (lastTapTime === undefined || Date.now() - lastTapTime > 100) {
							
							lastTapTime = Date.now();
							
							if (nodeId !== 'body') {
								e.stopDefault();
							}
							
							return eventHandler(e, node);
						}
					}
				}));
			}

			// double tap event (not exists, simulate.)
			else if (name === 'doubletap') {

				subEvent = EVENT({
					node : node,
					name : 'tap'
				}, function(e) {

					if (lastTapTime === undefined) {
						lastTapTime = Date.now();
					} else {

						if (Date.now() - lastTapTime < 600) {
							eventHandler(e, node);
						}

						lastTapTime = undefined;

						// clear text selections.
						getSelection().removeAllRanges();
					}
				});
			}

			// when is not touch mode, touchmove link to mousedown event
			else if (name === 'touchstart') {
				
				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousedown'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// when is not touch mode, touchmove link to mousemove event
			else if (name === 'touchmove') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchmove'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousemove'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// when is not touch mode, touchend link to mouseup event
			else if (name === 'touchend') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseup'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// mouse over event (when is touch mode, link to touchstart event.)
			else if (name === 'mouseover') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() === true) {
						eventHandler(e, node);
					}
				}));

				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseover'
				}, function(e, node) {
					if (INFO.checkIsTouchMode() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// other events
			else if (name !== 'attach' && name !== 'show' && name !== 'remove') {
				eventLows.push(EVENT_LOW(nameOrParams, eventHandler));
			}
			
			self.remove = remove = function() {

				EACH(eventLows, function(eventLow) {
					eventLow.remove();
				});
					
				if (subEvent !== undefined) {
					subEvent.remove();
				}

				removeFromMap();
			};

			self.fire = fire = function() {

				// pass empty e object.
				return eventHandler(EMPTY_E(), node);
			};

			self.getEventHandler = getEventHandler = function() {
				return eventHandler;
			};
		}
	};
});
/**
 * Low event class
 */
global.EVENT_LOW = CLASS({

	init : function(inner, self, nameOrParams, eventHandler) {
		'use strict';
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//OPTIONAL: nameOrParams.lowNode
		//REQUIRED: nameOrParams.name
		//REQUIRED: eventHandler

		var
		// node
		node,

		// low node
		lowNode,

		// name
		name,

		// el
		el,

		// inner handler.
		innerHandler,

		// remove.
		remove;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			lowNode = nameOrParams.lowNode;
			name = nameOrParams.name;

			if (lowNode === undefined) {
				lowNode = node;
			}
		}

		if (lowNode !== undefined) {
			el = lowNode.getWrapperEl();
		} else if (global['on' + name] === undefined) {
			el = document;
		} else {
			el = global;
		}

		inner.innerHandler = innerHandler = function(e) {
			//REQUIRED: e
			
			var
			// result
			result = eventHandler(E({
				e : e,
				el : el
			}), node);
			
			if (name === 'beforeunload' && result !== undefined) {
				e.returnValue = result;
			}

			return result;
		};

		el.addEventListener(name, innerHandler, false);

		self.remove = remove = function() {
			el.removeEventListener(name, innerHandler, false);
		};
	}
});

/**
 * Event once class
 */
global.EVENT_ONCE = CLASS({

	init : function(inner, self, nameOrParams, eventHandler) {
		'use strict';
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//OPTIONAL: nameOrParams.lowNode
		//REQUIRED: nameOrParams.name
		//REQUIRED: eventHandler

		var
		// evt
		evt = EVENT(nameOrParams, function(e, node) {
			eventHandler(e, node);
			evt.remove();
		}),

		// remove.
		remove,

		// fire.
		fire;

		self.remove = remove = function() {
			evt.remove();
		};

		self.fire = fire = function() {
			evt.fire();
		};
	}
});

/**
 * add style.
 */
global.ADD_STYLE = METHOD(function(m) {
	'use strict';

	var
	// vendors
	vendors = ['Webkit', 'Moz', 'O', 'Ms'],
	
	// cross browser style names
	crossBrowserStyleNames = ['transform', 'transformOrigin', 'animation', 'touchCallout', 'userSelect', 'backgroundSize', 'backgroundPosition'],
	
	// is support fixed
	isSupportFixed;

	NEXT([
	function(next) {

		// when body exsists
		if (document.body === TO_DELETE) {

			EVENT({
				name : 'load'
			}, next);
		}

		// when body not exsists
		else {
			next();
		}
	},

	function() {

		// check is support fixed.
		return function() {

			var
			// el
			el = document.createElement('div');

			el.style.position = 'fixed';
			el.style.top = '10px';

			document.body.appendChild(el);

			isSupportFixed = el.offsetTop === 10;

			document.body.removeChild(el);
		};
	}]);

	return {

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.node
			//REQUIRED: params.style

			var
			// node
			node = params.node,

			// style
			style = params.style,

			// el
			el = node.getWrapperEl(),

			// switch bg to X2.
			switchBGToX2 = function(uri) {

				if (X2.checkIsCached(uri) === true) {

					// background switch to X2 image.
					X2.switchBG({
						node : node,
						uri : uri
					});

				} else {

					EXPORT_IMG_TYPE(IMG({
						src : uri
					}), function(type) {

						if (type === 'png' || type === 'gif' || type === 'bmp') {

							// background switch to X2 image.
							X2.switchBG({
								node : node,
								uri : uri
							});
						}
					});
				}
			};

			EACH(style, function(value, name) {

				var
				// resize event
				resizeEvent,

				// scroll event
				scrollEvent,

				// fix position.
				fixPosition;

				if (value !== undefined) {

					// on display resize
					if (name === 'onDisplayResize') {

						resizeEvent = EVENT({
							name : 'resize'
						}, RAR(function() {

							// when this, value is function.
							ADD_STYLE({
								node : node,
								style : value(WIN_WIDTH(), WIN_HEIGHT())
							});
						}));

						// remove resize event when remove node.
						node.on('remove', function() {
							resizeEvent.remove();
						});

					} else {

						try {

							// fix position fixed when not support fixed.
							if (name === 'position' && value === 'fixed' && isSupportFixed !== true) {

								el.style.position = 'absolute';

								node.__FIXED = true;

								// save fixed position.
								if (node.__FIXED_LEFT === undefined && el.style.left !== '') {
									node.__FIXED_LEFT = INTEGER(el.style.left);
								}

								if (node.__FIXED_RIGHT === undefined && el.style.right !== '') {
									node.__FIXED_RIGHT = INTEGER(el.style.right);
								}

								if (node.__FIXED_TOP === undefined && el.style.top !== '') {
									node.__FIXED_TOP = INTEGER(el.style.top);
								}

								if (node.__FIXED_BOTTOM === undefined && el.style.bottom !== '') {
									node.__FIXED_BOTTOM = INTEGER(el.style.bottom);
								}

								// when scroll
								scrollEvent = EVENT({
									name : 'scroll'
								}, RAR( fixPosition = function() {

									if (node.__FIXED_LEFT !== undefined) {
										el.style.left = (node.__FIXED_LEFT + SCROLL_LEFT()) + 'px';
									}

									if (node.__FIXED_RIGHT !== undefined) {
										el.style.left = (SCROLL_LEFT() + WIN_WIDTH() - node.getWidth() - node.__FIXED_RIGHT) + 'px';
									}

									if (node.__FIXED_TOP !== undefined) {
										el.style.top = (node.__FIXED_TOP + SCROLL_TOP()) + 'px';
									}

									if (node.__FIXED_BOTTOM !== undefined) {
										el.style.top = (SCROLL_TOP() + WIN_HEIGHT() - node.getHeight() - node.__FIXED_BOTTOM) + 'px';
									}
								}));

								// fix position when show.
								node.on('attach', function() {
									fixPosition();
								});

								// fix position delayed.
								DELAY(function() {
									fixPosition();
								});

								// remove scroll event when remove node.
								node.on('remove', function() {
									scrollEvent.remove();
								});
							}

							// save position when fixed.
							else if (node.__FIXED === true && name === 'left') {

								node.__FIXED_LEFT = INTEGER(value);

								el.style.left = (value + SCROLL_LEFT()) + 'px';

							} else if (node.__FIXED === true && name === 'right') {

								node.__FIXED_RIGHT = INTEGER(value);

								el.style.left = (SCROLL_LEFT() + WIN_WIDTH() - node.getWidth() - node.__FIXED_RIGHT) + 'px';

							} else if (node.__FIXED === true && name === 'top') {

								node.__FIXED_TOP = INTEGER(value);

								el.style.top = (value + SCROLL_TOP()) + 'px';

							} else if (node.__FIXED === true && name === 'bottom') {

								node.__FIXED_BOTTOM = INTEGER(value);

								el.style.top = (SCROLL_TOP() + WIN_HEIGHT() - node.getHeight() - node.__FIXED_BOTTOM) + 'px';
							}

							// flt -> float
							else if (name === 'flt') {
								el.style.cssFloat = value;
							}

							// assume number value is px value.
							else if ( typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {

								el.style[name] = value + 'px';

								// X2 support.
								if (BROWSER_CONFIG.isSupportingX2 === true &&

								// after INIT_OBJECTS(), check is hd display.
								INFO.checkIsHDDisplay !== undefined && INFO.checkIsHDDisplay() === true) {

									if (name === 'width' || name === 'height') {
										el.removeAttribute('width');
										el.removeAttribute('height');
									}
								}
							}

							// set background X2 image.
							else if (name === 'backgroundX2Image') {
								el.style.backgroundImage = 'url(' + value + ')';
							}

							// set background image. (not need url prefix.)
							else if (name === 'backgroundImage' && value !== 'none') {

								el.style[name] = 'url(' + value + ')';

								// X2 support.
								if (BROWSER_CONFIG.isSupportingX2 === true &&

								// after INIT_OBJECTS(), check is hd display.
								INFO.checkIsHDDisplay !== undefined && INFO.checkIsHDDisplay() === true) {

									// background switch to X2 image.
									switchBGToX2(value);
								}
							}

							// set normal style.
							else {

								el.style[name] = value;

								// X2 support.
								if (BROWSER_CONFIG.isSupportingX2 === true &&

								// after INIT_OBJECTS(), check is hd display.
								INFO.checkIsHDDisplay !== undefined && INFO.checkIsHDDisplay() === true) {

									// when image
									if (name === 'width' || name === 'height') {
										el.removeAttribute('width');
										el.removeAttribute('height');
									}

									// when background
									if (name === 'background' && value.length >= 7 && value.substring(0, 4) === 'url(') {

										// background switch to X2 image.
										switchBGToX2(value.charAt(4) === '\'' || value.charAt(4) === '"' ? value.substring(5, value.length - 2) : value.substring(4, value.length - 1));
									}
								}

								// cross browser styles
								if (CHECK_IS_IN({
									array : crossBrowserStyleNames,
									value : name
								}) === true) {
								
									EACH(vendors, function(vender) {
										el.style[vender + name.charAt(0).toUpperCase() + name.slice(1)] = value;
									});
								}
							}

						} catch(e) {
							// ignore.
						}
					}
				}
			});
		}
	};
});

/**
 * get rgba style string.
 */
global.RGBA = METHOD({

	run : function(rgba) {
		'use strict';
		//REQUIRED: rgba

		return 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
	}
});

/**
 * A class
 */
global.A = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'a'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.href
		//OPTIONAL: params.target
		//OPTIONAL: params.style

		var
		// href
		href,
		
		// target
		target,
		
		// style
		style,
		
		// set href.
		setHref, 

		// tap.
		tap;

		// init params.
		if (params !== undefined) {
			href = params.href;
			target = params.target;
			style = params.style;
		}

		self.setHref = setHref = function(href) {
			inner.setAttr({
				name : 'href',
				value : href
			});
		};

		if (href !== undefined) {
			setHref(href);
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}

		if (style === undefined || style.cursor === undefined) {
			self.addStyle({
				cursor : 'pointer'
			});
		}

		if (style === undefined || style.textDecoration === undefined) {
			self.addStyle({
				textDecoration : 'underline'
			});
		}

		self.tap = tap = function() {

			EVENT.fireAll({
				node : self,
				name : 'tap'
			});
		};
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.href
		//OPTIONAL: params.c

		var
		// href
		href,
		
		// is content href
		isContentHref = false,

		// children
		children,
		
		// append.
		append,
		
		// prepend.
		prepend;

		// init params.
		if (params !== undefined) {
			href = params.href;
			children = params.c;
		}

		if (children === undefined && href !== undefined) {
			
			self.append(href);
			
			isContentHref = true;
			
			OVERRIDE(self.append, function(origin) {
				self.append = append = function(node) {
					//REQUIRED: node
					
					if (isContentHref === true) {
						self.empty();
						isContentHref = false;
					}
					
					origin(node);
				};
			});
			
			OVERRIDE(self.prepend, function(origin) {
				self.prepend = prepend = function(node) {
					//REQUIRED: node
					
					if (isContentHref === true) {
						self.empty();
						isContentHref = false;
					}
					
					origin(node);
				};
			});
		}
	}
});

/**
 * Body class
 */
global.BODY = OBJECT({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'body'
		};
	}
});

/**
 * Br class
 */
global.BR = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'br'
		};
	}
});

/**
 * Canvas class
 */
global.CANVAS = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'canvas'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.width
		//OPTIONAL: params.height

		var
		// wdith
		width,

		// height
		height,

		// get context.
		getContext,

		// set size.
		setSize,

		// get width.
		getWidth,

		// get height.
		getHeight,

		// get data url.
		getDataURL;

		// init params.
		if (params !== undefined) {
			width = params.width;
			height = params.height;
		}

		self.getContext = getContext = function() {
			return CONTEXT(self);
		};

		self.setSize = setSize = function(size) {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			var
			// el
			el = self.getEl();

			if (size.width !== undefined) {
				width = size.width;
			}

			if (size.height !== undefined) {
				height = size.height;
			}

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		setSize({
			width : width,
			height : height
		});

		self.getWidth = getWidth = function() {
			return width;
		};

		self.getHeight = getHeight = function() {
			return height;
		};

		self.getDataURL = getDataURL = function() {
			return self.getEl().toDataURL();
		};
	}
});

/**
 * Div class
 */
global.DIV = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'div'
		};
	}
});

/**
 * Form class
 */
global.FORM = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'form'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.action
		//OPTIONAL: params.target
		//OPTIONAL: params.method
		//OPTIONAL: params.enctype

		var
		// action
		action,

		// target
		target,

		// method
		method,

		// enctype
		enctype,

		// get data.
		getData,

		// set data.
		setData,

		// submit.
		submit;

		// init params.
		if (params !== undefined) {
			action = params.action;
			target = params.target;
			method = params.method;
			enctype = params.enctype;
		}

		if (action !== undefined) {
			
			inner.setAttr({
				name : 'action',
				value : action
			});
			
		} else {
			
			EVENT({
				node : self,
				name : 'submit'
			}, function(e) {
				e.stop();
			});
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}

		if (method !== undefined) {
			inner.setAttr({
				name : 'method',
				value : method
			});
		}

		if (enctype !== undefined) {
			inner.setAttr({
				name : 'enctype',
				value : enctype
			});
		}

		OVERRIDE(self.setData, function(origin) {
			
			self.getData = getData = function() {
	
				var
				// data
				data = origin(),
	
				// f.
				f = function(node) {
					//REQUIRED: node
	
					EACH(node.getChildren(), function(child) {
	
						if (child.getValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {
							data[child.getName()] = child.getValue();
						}
	
						f(child);
					});
				};
				
				if (data === undefined) {
					data = {};
				}
	
				f(self);
	
				return data;
			};
		});

		OVERRIDE(self.setData, function(origin) {
			
			self.setData = setData = function(data) {
				//REQUIRED: data
	
				var
				// f.
				f = function(node) {
					//REQUIRED: node
	
					EACH(node.getChildren(), function(child) {
	
						var
						// value
						value;
	
						if (child.setValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {
							value = data[child.getName()];
							child.setValue(value === undefined ? '' : value);
						}
	
						f(child);
					});
				};
	
				f(self);
				
				origin(data);
			};
		});

		self.submit = submit = function(isRealSubmit) {
			//OPTIONAL: isRealSubmit

			EVENT.fireAll({
				node : self,
				name : 'submit'
			});

			if (isRealSubmit === true) {
				self.getEl().submit();
			}
		};
	}
});

/**
 * H1 class
 */
global.H1 = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'h1'
		};
	}
});

/**
 * H2 class
 */
global.H2 = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'h2'
		};
	}
});

/**
 * H3 class
 */
global.H3 = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'h3'
		};
	}
});

/**
 * H4 class
 */
global.H4 = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'h4'
		};
	}
});

/**
 * H5 class
 */
global.H5 = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'h5'
		};
	}
});

/**
 * H6 class
 */
global.H6 = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'h6'
		};
	}
});

/**
 * Iframe class
 */
global.IFRAME = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'iframe',
			style : {
				border : 'none'
			}
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.name
		//OPTIONAL: params.src

		var
		// name
		name,

		// src
		src,

		// set src.
		setSrc,

		// get src.
		getSrc;

		// init params.
		if (params !== undefined) {
			name = params.name;
			src = params.src;
		}

		inner.setAttr({
			name : 'allowTransparency',
			value : true
		});

		inner.setAttr({
			name : 'frameBorder',
			value : 0
		});

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

		self.setSrc = setSrc = function(_src) {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});
		};

		if (src !== undefined) {
			setSrc(src);
		}

		self.getSrc = getSrc = function() {
			return src;
		};
	}
});

/**
 * Img class
 */
global.IMG = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'img'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.src

		var
		// src
		src = params.src,

		// el
		el = self.getEl(),

		// is X2 switched
		isX2Switched,

		// get width.
		getWidth,

		// get height.
		getHeight,

		// set size.
		setSize,

		// get src.
		getSrc,

		// set x2 src.
		setX2Src,

		// set src.
		setSrc,

		// check is X2.
		checkIsX2;

		//OVERRIDE: self.getWidth
		self.getWidth = getWidth = function() {
			return el.width;
		};

		//OVERRIDE: self.getHeight
		self.getHeight = getHeight = function() {
			return el.height;
		};

		self.setSize = setSize = function(size) {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			var
			// width
			width = size.width,

			// height
			height = size.height;

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		self.getSrc = getSrc = function() {
			return src;
		};

		self.setX2Src = setX2Src = function(x2Src) {
			//REQUIRED: x2Src

			inner.setAttr({
				name : 'src',
				value : x2Src
			});
		};

		self.setSrc = setSrc = function(_src) {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});

			// X2 support.
			if (isX2Switched !== true && BROWSER_CONFIG.isSupportingX2 === true &&

			// after INIT_OBJECTS(), check is hd display.
			INFO.checkIsHDDisplay !== undefined && INFO.checkIsHDDisplay() === true) {

				if (X2.checkIsCached(src) === true) {

					// switch X2 img.
					X2.switchImg(self);

				} else {

					EXPORT_IMG_TYPE(self, function(type) {

						if (type === 'png' || type === 'gif' || type === 'bmp') {

							isX2Switched = true;

							// switch X2 img.
							X2.switchImg(self);
						}
					});
				}
			}
		};

		if (src !== undefined) {
			setSrc(src);
		}

		self.checkIsX2 = checkIsX2 = function() {
			return isX2Switched;
		};
	}
});

/**
 * Input class
 */
global.INPUT = CLASS(function(cls) {
	'use strict';

	var
	// focusing input ids
	focusingInputIds = [],

	// get focusing input ids.
	getFocusingInputIds;

	cls.getFocusingInputIds = getFocusingInputIds = function(id) {
		return focusingInputIds;
	};

	return {

		preset : function() {
			return DOM;
		},

		params : function() {
			return {
				tag : 'input'
			};
		},

		init : function(inner, self, params) {
			//OPTIONAL: params
			//OPTIONAL: params.name
			//OPTIONAL: params.type
			//OPTIONAL: params.placeholder
			//OPTIONAL: params.value
			//OPTIONAL: params.capture
			//OPTIONAL: params.accept
			//OPTIONAL: params.isMultiple

			var
			// name
			name,

			// type
			type,

			// placeholder
			placeholder,

			// capture
			capture,

			// accept
			accept,

			// is multiple
			isMultiple,

			// get name.
			getName,

			// get value.
			getValue,

			// set value.
			setValue,

			// select.
			select,

			// focus.
			focus,

			// blur.
			blur,

			// toggle check.
			toggleCheck,

			// check is checked.
			checkIsChecked;

			// init params.
			if (params !== undefined) {
				name = params.name;
				type = params.type;
				placeholder = params.placeholder;
				capture = params.capture;
				accept = params.accept;
				isMultiple = params.isMultiple;
			}

			if (type !== undefined) {
				inner.setAttr({
					name : 'type',
					value : type
				});
			}

			if (type !== 'submit' && type !== 'reset') {

				if (name !== undefined) {
					inner.setAttr({
						name : 'name',
						value : name
					});
				}

				if (placeholder !== undefined) {
					inner.setAttr({
						name : 'placeholder',
						value : placeholder
					});
				}
				
				if (capture !== undefined) {
					inner.setAttr({
						name : 'capture',
						value : capture
					});
				}
				
				if (accept !== undefined) {
					inner.setAttr({
						name : 'accept',
						value : accept
					});
				}

				if (isMultiple === true) {
					inner.setAttr({
						name : 'multiple',
						value : isMultiple
					});
				}

				self.getName = getName = function() {
					return name;
				};

				self.getValue = getValue = function() {
					if (type === 'checkbox' || type === 'radio') {
						return self.getEl().checked;
					}
					return self.getEl().value;
				};

				self.select = select = function() {
					if (type === 'file') {
						self.getEl().click();
					} else {
						self.getEl().select();
					}
				};

				self.focus = focus = function() {
					self.getEl().focus();
				};

				self.blur = blur = function() {
					self.getEl().blur();
				};

				if (type === 'checkbox' || type === 'radio') {

					self.toggleCheck = toggleCheck = function(e) {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = true;
						}

						EVENT.fireAll({
							node : self,
							name : 'change'
						});

						return self.getEl().checked;
					};

					self.checkIsChecked = checkIsChecked = function() {
						return self.getEl().checked;
					};

					EVENT({
						node : self,
						name : 'keyup'
					}, function(e) {
						if (e !== undefined && e.getKeyCode() === 32) {
							DELAY(function() {
								EVENT.fireAll({
									node : self,
									name : 'change'
								});
							});
						}
					});
				}
			}

			self.setValue = setValue = function(value) {
				//REQUIRED: value

				if (type === 'checkbox' || type === 'radio') {

					if (value === true) {

						if (self.getEl().checked !== true) {

							self.getEl().checked = true;

							EVENT.fireAll({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {

							self.getEl().checked = false;

							EVENT.fireAll({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {

						self.getEl().value = value;

						EVENT.fireAll({
							node : self,
							name : 'change'
						});

					} else {
						self.getEl().value = value;
					}
				}
			};

			EVENT({
				node : self,
				name : 'focus'
			}, function() {
				getFocusingInputIds().push(self.id);
			});

			EVENT({
				node : self,
				name : 'blur'
			}, function() {

				REMOVE({
					array : getFocusingInputIds(),
					value : self.id
				});
			});

			self.on('remove', function() {

				REMOVE({
					array : getFocusingInputIds(),
					value : self.id
				});
			});
			
			// can radio be false
			if (type === 'radio') {
				
				EVENT({
					node : self,
					name : 'touchstart'
				}, function() {
					
					if (checkIsChecked() === true) {
						
						EVENT_ONCE({
							node : self,
							name : 'touchend'
						}, function() {
							DELAY(function() {
								setValue(false);
							});
						});
					}
				});
			}
		},

		afterInit : function(inner, self, params) {
			//OPTIONAL: params
			//OPTIONAL: params.name
			//OPTIONAL: params.type
			//OPTIONAL: params.placeholder
			//OPTIONAL: params.value
			//OPTIONAL: params.isMultiple

			var
			// type
			type,

			// value
			value;

			// init params.
			if (params !== undefined) {
				type = params.type;
				value = params.value;
			}

			if (value !== undefined) {

				if (type === 'checkbox' || type === 'radio') {

					if (value === true) {

						if (self.getEl().checked !== true) {
							self.getEl().checked = true;
						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {
						self.getEl().value = value;
					} else {
						self.getEl().value = value;
					}
				}
			}
		}
	};
});

/**
 * LI class
 */
global.LI = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'li'
		};
	}
});

/**
 * Optgroup class
 */
global.OPTGROUP = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'optgroup'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.label

		var
		// label
		label = params.label;

		inner.setAttr({
			name : 'label',
			value : label
		});
	}
});

/**
 * Option class
 */
global.OPTION = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'option'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.value
		//OPTIONAL: params.c

		var
		// get value.
		getValue,

		// set value.
		setValue;

		self.getValue = getValue = function() {
			return self.getEl().value;
		};

		self.setValue = setValue = function(value) {
			//REQUIRED: value

			self.getEl().value = value;
		};
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.value
		//OPTIONAL: params.c

		var
		// value
		value,
		
		// children
		children;

		// init params.
		if (params !== undefined) {
			value = params.value;
			children = params.c;
		}

		if (value === undefined) {
			self.setValue('');
		} else {
			self.setValue(value);
			
			if (children === undefined) {
				self.append(value);
			}
		}
	}
});

/**
 * P class
 */
global.P = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'p'
		};
	}
});

/**
 * Select class
 */
global.SELECT = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'select'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.name
		//OPTIONAL: params.value

		var
		// name
		name,

		// is ctrl down
		isCtrlDown = false,

		// get name.
		getName,

		// get value.
		getValue,

		// set value.
		setValue,

		// select.
		select,

		// focus.
		focus,

		// blur.
		blur;

		// init params.
		if (params !== undefined) {
			name = params.name;
		}

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

		self.getName = getName = function() {
			return name;
		};

		self.getValue = getValue = function() {
			return self.getEl().value;
		};

		self.setValue = setValue = function(value) {
			//REQUIRED: value

			if (self.getEl().value !== value) {

				self.getEl().value = value;

				EVENT.fireAll({
					node : self,
					name : 'change'
				});

			} else {
				self.getEl().value = value;
			}
		};

		self.select = select = function() {
			self.getEl().select();
		};

		self.focus = focus = function() {
			self.getEl().focus();
		};

		self.blur = blur = function() {
			self.getEl().blur();
		};

		EVENT({
			node : self,
			name : 'keydown'
		}, function(e) {

			var
			// key code
			keyCode = e.getKeyCode();

			if (keyCode === 91 || keyCode === 17) {
				isCtrlDown = true;
			} else if (isCtrlDown !== true) {
				e.stopBubbling();
			}
		});

		EVENT({
			node : self,
			name : 'keyup'
		}, function(e) {

			var
			// key code
			keyCode = e.getKeyCode();

			if (keyCode === 91 || keyCode === 17) {
				isCtrlDown = false;
			}
		});

		EVENT({
			node : self,
			name : 'focus'
		}, function() {
			INPUT.getFocusingInputIds().push(self.id);
		});

		EVENT({
			node : self,
			name : 'blur'
		}, function() {

			REMOVE({
				array : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});

		self.on('remove', function() {

			REMOVE({
				array : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value

		var
		// value
		value;

		// init params.
		if (params !== undefined) {
			value = params.value;
		}

		if (value !== undefined) {
			self.setValue(value);
		}
	}
});

/**
 * Span class
 */
global.SPAN = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'span'
		};
	}
});

/**
 * Table class
 */
global.TABLE = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'table'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.style

		var
		// style
		style;

		// init params.
		if (params !== undefined) {
			style = params.style;
		}

		if (style === undefined || style.width === undefined) {
			self.addStyle({
				width : '100%'
			});
		}
	}
});

/**
 * Td class
 */
global.TD = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'td'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.rowspan
		//OPTIONAL: params.colspan

		var
		// rowspan
		rowspan,

		// colspan
		colspan;

		// init params.
		if (params !== undefined) {
			rowspan = params.rowspan;
			colspan = params.colspan;
		}

		if (rowspan !== undefined) {
			inner.setAttr({
				name : 'rowspan',
				value : rowspan
			});
		}

		if (colspan !== undefined) {
			inner.setAttr({
				name : 'colspan',
				value : colspan
			});
		}
	}
});

/**
 * Textarea class
 */
global.TEXTAREA = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'textarea'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value

		var
		// name
		name,

		// placeholder
		placeholder,

		// is ctrl down
		isCtrlDown = false,

		// get name.
		getName,

		// get value.
		getValue,

		// set value.
		setValue,

		// select.
		select,

		// focus.
		focus,

		// blur.
		blur;

		// init params.
		if (params !== undefined) {
			name = params.name;
			placeholder = params.placeholder;
		}

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

		if (placeholder !== undefined) {
			inner.setAttr({
				name : 'placeholder',
				value : placeholder
			});
		}

		self.getName = getName = function() {
			return name;
		};

		self.getValue = getValue = function() {
			return self.getEl().value;
		};

		self.setValue = setValue = function(value) {
			//REQUIRED: value

			if (self.getEl().value !== value) {

				self.getEl().value = value;

				EVENT.fireAll({
					node : self,
					name : 'change'
				});

			} else {
				self.getEl().value = value;
			}
		};

		self.select = select = function() {
			self.getEl().select();
		};

		self.focus = focus = function() {
			self.getEl().focus();
		};

		self.blur = blur = function() {
			self.getEl().blur();
		};

		EVENT({
			node : self,
			name : 'keydown'
		}, function(e) {

			var
			// key code
			keyCode = e.getKeyCode();

			if (keyCode === 91 || keyCode === 17) {
				isCtrlDown = true;
			} else if (isCtrlDown !== true) {
				e.stopBubbling();
			}
		});

		EVENT({
			node : self,
			name : 'keyup'
		}, function(e) {

			var
			// key code
			keyCode = e.getKeyCode();

			if (keyCode === 91 || keyCode === 17) {
				isCtrlDown = false;
			}
		});

		EVENT({
			node : self,
			name : 'focus'
		}, function() {
			INPUT.getFocusingInputIds().push(self.id);
		});

		EVENT({
			node : self,
			name : 'blur'
		}, function() {

			REMOVE({
				array : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});

		self.on('remove', function() {

			REMOVE({
				array : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value

		var
		// value
		value;

		// init params.
		if (params !== undefined) {
			value = params.value;
		}

		if (value !== undefined) {
			self.setValue(value);
		}
	}
});

/**
 * Th class
 */
global.TH = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'th'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.rowspan
		//OPTIONAL: params.colspan

		var
		// rowspan
		rowspan,

		// colspan
		colspan;

		// init params.
		if (params !== undefined) {
			rowspan = params.rowspan;
			colspan = params.colspan;
		}

		if (rowspan !== undefined) {
			inner.setAttr({
				name : 'rowspan',
				value : rowspan
			});
		}

		if (colspan !== undefined) {
			inner.setAttr({
				name : 'colspan',
				value : colspan
			});
		}
	}
});

/**
 * Tr class
 */
global.TR = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'tr'
		};
	}
});

/**
 * Ul class
 */
global.UL = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'ul'
		};
	}
});

/**
 * check the pixel is blank pixel.
 */
global.CHECK_IS_BLANK_PIXEL = METHOD(function(m) {
	'use strict';

	var
	// img blank pixel data set
	imgBlankPixelDataSet = {};

	return {

		run : function(params, callback) {
			//REQUIRED: params
			//REQUIRED: params.img
			//OPTIONAL: params.left
			//OPTIONAL: params.right
			//OPTIONAL: params.centerLeft
			//OPTIONAL: params.top
			//OPTIONAL: params.bottom
			//OPTIONAL: params.centerTop
			//REQUIRED: callback

			var
			// img
			img = params.img,

			// left
			left = params.left,

			// right
			right = params.right,

			// center left
			centerLeft = params.centerLeft,

			// top
			top = params.top,

			// bottom
			bottom = params.bottom,

			// center top
			centerTop = params.centerTop;

			EXPORT_IMG_DATA(img, function(imgData) {

				var
				// uri
				uri = img.getSrc(),

				// img blank pixel data
				imgBlankPixelData = imgBlankPixelDataSet[uri],

				// width
				width,

				// heigth
				height,

				// data
				data,

				// img blank pixels
				imgBlankPixels,

				// extras
				i, j;

				// export.
				if (imgBlankPixelData === undefined) {

					width = imgData.width;
					height = imgData.height;
					data = imgData.data;

					imgBlankPixelData = [];
					for ( i = 0; i < height; i += 1) {
						imgBlankPixelData[i] = [];
						for ( j = 0; j < width; j += 1) {
							imgBlankPixelData[i][j] = data[i * width * 4 + j * 4 + 3] < 255 / 2;
						}
					}

					imgBlankPixelDataSet[uri] = imgBlankPixelData;
				}

				// find top.
				if (top !== undefined) {
					imgBlankPixels = imgBlankPixelData[INTEGER(top)];
				} else if (bottom !== undefined) {
					imgBlankPixels = imgBlankPixelData[imgBlankPixelData.length - INTEGER(bottom) - 1];
				} else if (centerTop !== undefined) {
					imgBlankPixels = imgBlankPixelData[INTEGER(imgBlankPixelData.length / 2) + INTEGER(centerTop)];
				}

				// find left.
				if (imgBlankPixels !== undefined) {
					if (left !== undefined) {
						callback(imgBlankPixels[INTEGER(left)]);
					} else if (right !== undefined) {
						callback(imgBlankPixels[imgBlankPixels.length - INTEGER(right) - 1]);
					} else if (centerLeft !== undefined) {
						callback(imgBlankPixels[INTEGER(imgBlankPixels.length / 2) + INTEGER(centerLeft)]);
					}
				}
			});
		}
	};
});

/**
 * Context for canvas wrapper class
 */
global.CONTEXT = CLASS({

	init : function(inner, self, canvas) {
		'use strict';
		//REQUIRED: canvas

		var
		// native context
		nativeContext = canvas.getEl().getContext('2d'),

		// draw img.
		drawImg,

		// get image data.
		getImageData,

		// create image data.
		createImageData,

		// put image data.
		putImageData,

		// set scale.
		setScale,

		// rotate.
		rotate,

		// save.
		save,

		// restore.
		restore,

		// clear.
		clear,
		
		// begin path.
		beginPath,
		
		// close path.
		closePath,
		
		// move to.
		moveTo,
		
		// line to.
		lineTo,
		
		// strock.
		strock,
		
		// set strock style.
		setStrokeStyle,
		
		// fill.
		fill,
		
		// set fill style.
		setFillStyle;

		self.drawImg = drawImg = function(params) {
			//REQUIRED: params
			//REQUIRED: params.img
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.clipX
			//OPTIONAL: params.clipY
			//OPTIONAL: params.clipWidth
			//OPTIONAL: params.clipHeight
			//OPTIONAL: params.width
			//OPTIONAL: params.height

			var
			// img
			img = params.img,

			// x
			x = params.x === undefined ? 0 : params.x,

			// y
			y = params.y === undefined ? 0 : params.y,

			// clip x
			clipX = params.clipX !== undefined ? params.clipX : 0,

			// clip y
			clipY = params.clipY !== undefined ? params.clipY : 0,

			// clip width
			clipWidth = params.clipWidth,

			// clip height
			clipHeight = params.clipHeight,

			// width
			width = params.width,

			// height
			height = params.height,

			// scale
			scale = img.checkIsX2() === true ? 2 : 1;

			if (clipWidth === undefined && clipHeight === undefined) {
				if (width > 0 && height > 0) {
					nativeContext.drawImage(img.getEl(), x, y, width, height);
				} else {
					nativeContext.drawImage(img.getEl(), x, y);
				}
			} else {

				if (clipWidth === undefined) {
					clipWidth = img.getWidth();
				}
				if (clipHeight === undefined) {
					clipHeight = img.getHeight();
				}

				nativeContext.drawImage(img.getEl(), clipX * scale, clipY * scale, clipWidth * scale, clipHeight * scale, x, y, width, height);
			}
		};

		self.getImageData = getImageData = function(params) {
			//OPTIONAL: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.width
			//OPTIONAL: params.height

			var
			// x
			x = params === undefined || params.x === undefined ? 0 : params.x,

			// y
			y = params === undefined || params.y === undefined ? 0 : params.y,

			// width
			width = params === undefined || params.width === undefined ? canvas.getWidth() : params.width,

			// height
			height = params === undefined || params.height === undefined ? canvas.getHeight() : params.height;

			return nativeContext.getImageData(x, y, width, height);
		};

		self.createImageData = createImageData = function(params) {
			//REQUIRED: params
			//REQUIRED: params.width
			//REQUIRED: params.height

			var
			// width
			width = params.width,

			// height
			height = params.height;

			return nativeContext.createImageData(width, height);
		};

		self.putImageData = putImageData = function(params) {
			//REQUIRED: params
			//REQUIRED: params.data
			//OPTIONAL: params.x
			//OPTIONAL: params.y

			var
			// data
			data = params.data,

			// x
			x = params.x === undefined ? 0 : params.x,

			// y
			y = params.y === undefined ? 0 : params.y;

			nativeContext.putImageData(data, x, y);
		};

		self.setScale = setScale = function(scaleSize) {
			//REQUIRED: scaleSize
			//OPTIONAL: scaleSize.scaleWidth
			//OPTIONAL: scaleSize.scaleHeight

			var
			// scale width
			scaleWidth = scaleSize.scaleWidth,

			// scale height
			scaleHeight = scaleSize.scaleHeight;

			nativeContext.scale(scaleWidth, scaleHeight);
		};

		self.rotate = rotate = function(params) {
			//REQUIRED: params
			//REQUIRED: params.centerX
			//REQUIRED: params.centerY
			//REQUIRED: params.degree

			var
			// center x
			centerX = params.centerX,

			// center y
			centerY = params.centerY,

			// degree
			degree = params.degree;

			// Move registration point to the center of the canvas
			nativeContext.translate(centerX, centerY);

			// Rotate degree
			nativeContext.rotate(degree * Math.PI / 180);

			// Move registration point back to the y x corner of canvas
			nativeContext.translate(-centerX, -centerY);
		};

		self.save = save = function() {
			nativeContext.save();
		};

		self.restore = restore = function() {
			nativeContext.restore();
		};

		self.clear = clear = function() {
			nativeContext.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
		};
		
		self.beginPath = beginPath = function() {
			nativeContext.beginPath();
		};
		
		self.closePath = closePath = function() {
			nativeContext.closePath();
		};
		
		self.moveTo = moveTo = function(params) {
			//REQUIRED: params
			//REQUIRED: params.x
			//REQUIRED: params.y
			
			var
			// x
			x = params.x,
			
			// y
			y = params.y;
			
			nativeContext.moveTo(x, y);
		};
		
		self.lineTo = lineTo = function(params) {
			//REQUIRED: params
			//REQUIRED: params.x
			//REQUIRED: params.y
			
			var
			// x
			x = params.x,
			
			// y
			y = params.y;
			
			nativeContext.lineTo(x, y);
		};
		
		self.strock = strock = function(params) {
			nativeContext.strock();
		};
		
		self.setStrokeStyle = setStrokeStyle = function(strokeStyle) {
			nativeContext.strokeStyle = strokeStyle;
		};
		
		self.fill = fill = function() {
			nativeContext.fill();
		};
		
		self.setFillStyle = setFillStyle = function(fillStyle) {
			nativeContext.fillStyle = fillStyle;
		};
	}
});

/**
 * export img data.
 */
global.EXPORT_IMG_DATA = METHOD(function(m) {
	'use strict';

	var
	// exported img data set.
	exportedImgDataSet = {},

	// exporting callback map
	exportingCallbackMap = {};

	return {

		run : function(img, callback) {
			//REQUIRED: img
			//REQUIRED: callback

			var
			// uri
			uri = img.getSrc(),

			// new img
			newImg,

			// exported img data
			exportedImgData = exportedImgDataSet[uri],

			// exporting callbacks
			exportingCallbacks = exportingCallbackMap[uri];

			// if aleady exported.
			if (exportedImgData !== undefined) {
				callback(exportedImgData);
			}

			// is processed uri.
			else if (exportingCallbacks !== undefined) {
				exportingCallbacks.push(callback);
			}

			// export img data.
			else {

				exportingCallbacks = exportingCallbackMap[uri] = [callback];

				newImg = IMG();
				newImg.getContentEl().crossOrigin = 'anonymous';
				newImg.setSrc(uri);

				EVENT_ONCE({
					node : newImg,
					name : 'load'
				}, function(e, img) {

					var
					// width
					width = img.getWidth(),

					// height
					height = img.getHeight(),

					// canvas
					canvas = CANVAS({
						width : width,
						height : height
					}),

					// context
					context = canvas.getContext(),

					// img data
					imgData;

					// draw img.
					context.drawImg({
						img : img
					});

					// get img data.
					imgData = context.getImageData();

					// cache.
					exportedImgDataSet[uri] = imgData;

					// run callbacks.
					EACH(exportingCallbacks, function(callback) {
						callback(imgData);
					});

					// clear exporting callbacks.
					delete exportingCallbackMap[uri];
				});
			}
		}
	};
});

/**
 * export img type.
 */
global.EXPORT_IMG_TYPE = METHOD(function(m) {
	'use strict';

	var
	// loaded img types
	loadedImgTypes = {},

	// loading callback map
	loadingCallbackMap = {};

	return {

		run : function(img, callback) {
			//REQUIRED: img
			//REQUIRED: callback

			var
			// uri
			uri = img.getSrc(),

			// loaded img type
			loadedImgType = loadedImgTypes[uri],

			// loading callbacks
			loadingCallbacks = loadingCallbackMap[uri],

			// load event
			loadEvent;

			// if aleady loaded.
			if (loadedImgType !== undefined) {
				callback(loadedImgType);
			}

			// is processed uri.
			else if (loadingCallbacks !== undefined) {
				loadingCallbacks.push(callback);
			}

			// load img type.
			else {

				loadingCallbacks = loadingCallbackMap[uri] = [callback];

				ImageInfo.loadInfo(uri, function() {

					var
					// img type
					imgType = ImageInfo.getAllFields(uri).format.toLowerCase();

					// cache.
					loadedImgTypes[uri] = imgType;

					// run callbacks.
					EACH(loadingCallbacks, function(callback) {
						callback(imgType);
					});

					// clear loading callbacks.
					delete loadingCallbackMap[uri];
				});
			}
		}
	};
});

/**
 * For image X2 object
 */
global.X2 = OBJECT({

	init : function(inner, self) {
		'use strict';

		var
		// X2 img data set
		x2ImgDataSet = {},

		// check is cached.
		checkIsCached,

		// export X2 img data.
		exportX2ImgData,

		// switch img.
		switchImg,

		// switch background.
		switchBG;

		self.checkIsCached = checkIsCached = function(uri) {
			return x2ImgDataSet[uri] !== undefined;
		};

		exportX2ImgData = function(img, callback) {

			var
			// uri
			uri = img.getSrc();

			// aleady exported.
			if (checkIsCached(uri) === true) {
				callback(x2ImgDataSet[uri]);
			}

			// export.
			else {

				EXPORT_IMG_DATA(img, function(imgData) {

					var
					// X2 img data
					x2ImgData,

					// width
					width,

					// height
					height,

					// data
					data,

					// X2 canvas
					x2Canvas,

					// X2 context
					x2Context,

					// X2 data
					x2Data,

					// X2 img data url
					x2ImgDataURL,

					// extras
					i, j, k, l;

					width = imgData.width;
					height = imgData.height;
					data = imgData.data;

					x2Canvas = CANVAS();
					x2Canvas.setSize({
						width : width * 2,
						height : height * 2
					});

					x2Context = x2Canvas.getContext();

					x2ImgData = x2Context.createImgData({
						width : width * 2,
						height : height * 2
					});

					x2Data = x2ImgData.data;

					for ( i = 0; i < height; i += 1) {
						for ( j = 0; j < width; j += 1) {

							k = i * width * 4 + j * 4;

							l = (i * 4 * width + j * 2) * 4;
							x2Data[l] = data[k];
							x2Data[l + 1] = data[k + 1];
							x2Data[l + 2] = data[k + 2];
							x2Data[l + 3] = data[k + 3];
							x2Data[l + 4] = data[k];
							x2Data[l + 5] = data[k + 1];
							x2Data[l + 6] = data[k + 2];
							x2Data[l + 7] = data[k + 3];

							l = ((i * 2 + 1) * 2 * width + j * 2) * 4;
							x2Data[l] = data[k];
							x2Data[l + 1] = data[k + 1];
							x2Data[l + 2] = data[k + 2];
							x2Data[l + 3] = data[k + 3];
							x2Data[l + 4] = data[k];
							x2Data[l + 5] = data[k + 1];
							x2Data[l + 6] = data[k + 2];
							x2Data[l + 7] = data[k + 3];
						}
					}

					x2Context.putImgData({
						data : x2ImgData
					});

					callback(x2ImgDataSet[uri] = {
						x2DataURL : x2Canvas.getDataURL(),
						width : width,
						height : height
					});
				});
			}
		};

		self.switchImg = switchImg = function(img) {

			if (img.getEl() !== undefined) {

				exportX2ImgData(img, function(x2ImgData) {

					var
					// X2 data url
					x2DataURL,

					// width
					width,

					// height
					height;

					if (img.getEl() !== undefined) {

						x2DataURL = x2ImgData.x2DataURL;

						width = img.getWidth();
						height = img.getHeight();

						if (width === undefined || width <= 0) {
							width = x2ImgData.width;
						}

						if (height === undefined || height <= 0) {
							height = x2ImgData.height;
						}

						// fix to origin size.
						if (img.getStyle('width') === undefined && img.getStyle('height') === undefined) {
							img.setSize({
								width : width,
								height : height
							});
						}

						// switch X2 image data url.
						img.setX2Src(x2DataURL);
					}
				});
			}
		};

		self.switchBG = switchBG = function(params) {
			//REQUIRED: params
			//REQUIRED: params.node
			//REQUIRED: params.uri

			var
			// node
			node = params.node,

			// img
			img = IMG({
				src : params.uri
			});

			exportX2ImgData(img, function(x2ImgData) {

				var
				// X2 data url
				x2DataURL = x2ImgData.x2DataURL,

				// background size
				backgroundSize = node.getStyle('backgroundSize');

				// fix to origin size.
				if (backgroundSize === undefined || backgroundSize === 'initial') {
					backgroundSize = x2ImgData.width + 'px ' + x2ImgData.height + 'px';
				}

				// switch X2 background.
				ADD_STYLE({
					node : node,
					style : {
						backgroundX2Image : x2DataURL,
						backgroundSize : backgroundSize
					}
				});
			});
		};
	}
});

/**
 * get internationalization message.
 */
global.MSG = METHOD({

	run : function(msgs) {
		'use strict';
		//REQUIRED: msgs

		var
		// msg
		msg = msgs[INFO.getLang()];

		if (msg === undefined) {

			// get first msg.
			EACH(msgs, function(_msg) {
				msg = _msg;
				return false;
			});
		}

		return msg;
	}
});


/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2015
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , chromeBook = /CrOS/.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeBook) {
      result = {
        name: 'Chrome'
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});


/*
 * Binary Ajax 0.1.5
 * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */


var BinaryFile = function(strData, iDataOffset, iDataLength) {
	var data = strData;
	var dataOffset = iDataOffset || 0;
	var dataLength = 0;

	this.getRawData = function() {
		return data;
	}

	if (typeof strData == "string") {
		dataLength = iDataLength || data.length;

		this.getByteAt = function(iOffset) {
			return data.charCodeAt(iOffset + dataOffset) & 0xFF;
		}
	} else if (typeof strData == "unknown") {
		dataLength = iDataLength || IEBinary_getLength(data);

		this.getByteAt = function(iOffset) {
			return IEBinary_getByteAt(data, iOffset + dataOffset);
		}
	}

	this.getLength = function() {
		return dataLength;
	}

	this.getSByteAt = function(iOffset) {
		var iByte = this.getByteAt(iOffset);
		if (iByte > 127)
			return iByte - 256;
		else
			return iByte;
	}

	this.getShortAt = function(iOffset, bBigEndian) {
		var iShort = bBigEndian ? 
			(this.getByteAt(iOffset) << 8) + this.getByteAt(iOffset + 1)
			: (this.getByteAt(iOffset + 1) << 8) + this.getByteAt(iOffset)
		if (iShort < 0) iShort += 65536;
		return iShort;
	}
	this.getSShortAt = function(iOffset, bBigEndian) {
		var iUShort = this.getShortAt(iOffset, bBigEndian);
		if (iUShort > 32767)
			return iUShort - 65536;
		else
			return iUShort;
	}
	this.getLongAt = function(iOffset, bBigEndian) {
		var iByte1 = this.getByteAt(iOffset),
			iByte2 = this.getByteAt(iOffset + 1),
			iByte3 = this.getByteAt(iOffset + 2),
			iByte4 = this.getByteAt(iOffset + 3);

		var iLong = bBigEndian ? 
			(((((iByte1 << 8) + iByte2) << 8) + iByte3) << 8) + iByte4
			: (((((iByte4 << 8) + iByte3) << 8) + iByte2) << 8) + iByte1;
		if (iLong < 0) iLong += 4294967296;
		return iLong;
	}
	this.getSLongAt = function(iOffset, bBigEndian) {
		var iULong = this.getLongAt(iOffset, bBigEndian);
		if (iULong > 2147483647)
			return iULong - 4294967296;
		else
			return iULong;
	}
	this.getStringAt = function(iOffset, iLength) {
		var aStr = [];
		for (var i=iOffset,j=0;i<iOffset+iLength;i++,j++) {
			aStr[j] = String.fromCharCode(this.getByteAt(i));
		}
		return aStr.join("");
	}

	this.getCharAt = function(iOffset) {
		return String.fromCharCode(this.getByteAt(iOffset));
	}
	this.toBase64 = function() {
		return window.btoa(data);
	}
	this.fromBase64 = function(strBase64) {
		data = window.atob(strBase64);
	}
}


var BinaryAjax = (function() {

	function createRequest() {
		var oHTTP = null;
		if (window.XMLHttpRequest) {
			oHTTP = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			oHTTP = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return oHTTP;
	}

	function getHead(strURL, fncCallback, fncError) {
		var oHTTP = createRequest();
		if (oHTTP) {
			if (fncCallback) {
				if (typeof(oHTTP.onload) != "undefined") {
					oHTTP.onload = function() {
						if (oHTTP.status == "200") {
							fncCallback(this);
						} else {
							if (fncError) fncError();
						}
						oHTTP = null;
					};
				} else {
					oHTTP.onreadystatechange = function() {
						if (oHTTP.readyState == 4) {
							if (oHTTP.status == "200") {
								fncCallback(this);
							} else {
								if (fncError) fncError();
							}
							oHTTP = null;
						}
					};
				}
			}
			oHTTP.open("HEAD", strURL, true);
			oHTTP.send(null);
		} else {
			if (fncError) fncError();
		}
	}

	function sendRequest(strURL, fncCallback, fncError, aRange, bAcceptRanges, iFileSize) {
		var oHTTP = createRequest();
		if (oHTTP) {

			var iDataOffset = 0;
			if (aRange && !bAcceptRanges) {
				iDataOffset = aRange[0];
			}
			var iDataLen = 0;
			if (aRange) {
				iDataLen = aRange[1]-aRange[0]+1;
			}

			if (fncCallback) {
				if (typeof(oHTTP.onload) != "undefined") {
					oHTTP.onload = function() {

						if (oHTTP.status == "200" || oHTTP.status == "206") {
							this.binaryResponse = new BinaryFile(this.responseText, iDataOffset, iDataLen);
							//this.fileSize = iFileSize || this.getResponseHeader("Content-Length");
							fncCallback(this);
						} else {
							if (fncError) fncError();
						}
						oHTTP = null;
					};
				} else {
					oHTTP.onreadystatechange = function() {
						if (oHTTP.readyState == 4) {
							if (oHTTP.status == "200" || oHTTP.status == "206") {
								this.binaryResponse = new BinaryFile(oHTTP.responseBody, iDataOffset, iDataLen);
								//this.fileSize = iFileSize || this.getResponseHeader("Content-Length");
								fncCallback(this);
							} else {
								if (fncError) fncError();
							}
							oHTTP = null;
						}
					};
				}
			}
			oHTTP.open("GET", strURL, true);

			if (oHTTP.overrideMimeType) oHTTP.overrideMimeType('text/plain; charset=x-user-defined');

			if (aRange && bAcceptRanges) {
				oHTTP.setRequestHeader("Range", "bytes=" + aRange[0] + "-" + aRange[1]);
			}

			//oHTTP.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1970 00:00:00 GMT");

			oHTTP.send(null);
		} else {
			if (fncError) fncError();
		}
	}

	return function(strURL, fncCallback, fncError, aRange) {

		if (aRange) {
			getHead(
				strURL, 
				function(oHTTP) {
					/*
					var iLength = parseInt(oHTTP.getResponseHeader("Content-Length"),10);
					var strAcceptRanges = oHTTP.getResponseHeader("Accept-Ranges");

					var iStart, iEnd;
					iStart = aRange[0];
					if (aRange[0] < 0) 
						iStart += iLength;
					iEnd = iStart + aRange[1] - 1;

					sendRequest(strURL, fncCallback, fncError, [iStart, iEnd], (strAcceptRanges == "bytes"), iLength);
					*/
				}
			);

		} else {
			sendRequest(strURL, fncCallback, fncError);
		}
	}

}());


document.write(
	"<script type='text/vbscript'>\r\n"
	+ "Function IEBinary_getByteAt(strBinary, iOffset)\r\n"
	+ "	IEBinary_getByteAt = AscB(MidB(strBinary,iOffset+1,1))\r\n"
	+ "End Function\r\n"
	+ "Function IEBinary_getLength(strBinary)\r\n"
	+ "	IEBinary_getLength = LenB(strBinary)\r\n"
	+ "End Function\r\n"
	+ "</script>\r\n"
);

/*
 * Javascript EXIF Reader 0.1.2
 * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */


var EXIF = {};

(function() {

var bDebug = false;

EXIF.Tags = {

	// version tags
	0x9000 : "ExifVersion",			// EXIF version
	0xA000 : "FlashpixVersion",		// Flashpix format version

	// colorspace tags
	0xA001 : "ColorSpace",			// Color space information tag

	// image configuration
	0xA002 : "PixelXDimension",		// Valid width of meaningful image
	0xA003 : "PixelYDimension",		// Valid height of meaningful image
	0x9101 : "ComponentsConfiguration",	// Information about channels
	0x9102 : "CompressedBitsPerPixel",	// Compressed bits per pixel

	// user information
	0x927C : "MakerNote",			// Any desired information written by the manufacturer
	0x9286 : "UserComment",			// Comments by user

	// related file
	0xA004 : "RelatedSoundFile",		// Name of related sound file

	// date and time
	0x9003 : "DateTimeOriginal",		// Date and time when the original image was generated
	0x9004 : "DateTimeDigitized",		// Date and time when the image was stored digitally
	0x9290 : "SubsecTime",			// Fractions of seconds for DateTime
	0x9291 : "SubsecTimeOriginal",		// Fractions of seconds for DateTimeOriginal
	0x9292 : "SubsecTimeDigitized",		// Fractions of seconds for DateTimeDigitized

	// picture-taking conditions
	0x829A : "ExposureTime",		// Exposure time (in seconds)
	0x829D : "FNumber",			// F number
	0x8822 : "ExposureProgram",		// Exposure program
	0x8824 : "SpectralSensitivity",		// Spectral sensitivity
	0x8827 : "ISOSpeedRatings",		// ISO speed rating
	0x8828 : "OECF",			// Optoelectric conversion factor
	0x9201 : "ShutterSpeedValue",		// Shutter speed
	0x9202 : "ApertureValue",		// Lens aperture
	0x9203 : "BrightnessValue",		// Value of brightness
	0x9204 : "ExposureBias",		// Exposure bias
	0x9205 : "MaxApertureValue",		// Smallest F number of lens
	0x9206 : "SubjectDistance",		// Distance to subject in meters
	0x9207 : "MeteringMode", 		// Metering mode
	0x9208 : "LightSource",			// Kind of light source
	0x9209 : "Flash",			// Flash status
	0x9214 : "SubjectArea",			// Location and area of main subject
	0x920A : "FocalLength",			// Focal length of the lens in mm
	0xA20B : "FlashEnergy",			// Strobe energy in BCPS
	0xA20C : "SpatialFrequencyResponse",	// 
	0xA20E : "FocalPlaneXResolution", 	// Number of pixels in width direction per FocalPlaneResolutionUnit
	0xA20F : "FocalPlaneYResolution", 	// Number of pixels in height direction per FocalPlaneResolutionUnit
	0xA210 : "FocalPlaneResolutionUnit", 	// Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
	0xA214 : "SubjectLocation",		// Location of subject in image
	0xA215 : "ExposureIndex",		// Exposure index selected on camera
	0xA217 : "SensingMethod", 		// Image sensor type
	0xA300 : "FileSource", 			// Image source (3 == DSC)
	0xA301 : "SceneType", 			// Scene type (1 == directly photographed)
	0xA302 : "CFAPattern",			// Color filter array geometric pattern
	0xA401 : "CustomRendered",		// Special processing
	0xA402 : "ExposureMode",		// Exposure mode
	0xA403 : "WhiteBalance",		// 1 = auto white balance, 2 = manual
	0xA404 : "DigitalZoomRation",		// Digital zoom ratio
	0xA405 : "FocalLengthIn35mmFilm",	// Equivalent foacl length assuming 35mm film camera (in mm)
	0xA406 : "SceneCaptureType",		// Type of scene
	0xA407 : "GainControl",			// Degree of overall image gain adjustment
	0xA408 : "Contrast",			// Direction of contrast processing applied by camera
	0xA409 : "Saturation", 			// Direction of saturation processing applied by camera
	0xA40A : "Sharpness",			// Direction of sharpness processing applied by camera
	0xA40B : "DeviceSettingDescription",	// 
	0xA40C : "SubjectDistanceRange",	// Distance to subject

	// other tags
	0xA005 : "InteroperabilityIFDPointer",
	0xA420 : "ImageUniqueID"		// Identifier assigned uniquely to each image
};

EXIF.TiffTags = {
	0x0100 : "ImageWidth",
	0x0101 : "ImageHeight",
	0x8769 : "ExifIFDPointer",
	0x8825 : "GPSInfoIFDPointer",
	0xA005 : "InteroperabilityIFDPointer",
	0x0102 : "BitsPerSample",
	0x0103 : "Compression",
	0x0106 : "PhotometricInterpretation",
	0x0112 : "Orientation",
	0x0115 : "SamplesPerPixel",
	0x011C : "PlanarConfiguration",
	0x0212 : "YCbCrSubSampling",
	0x0213 : "YCbCrPositioning",
	0x011A : "XResolution",
	0x011B : "YResolution",
	0x0128 : "ResolutionUnit",
	0x0111 : "StripOffsets",
	0x0116 : "RowsPerStrip",
	0x0117 : "StripByteCounts",
	0x0201 : "JPEGInterchangeFormat",
	0x0202 : "JPEGInterchangeFormatLength",
	0x012D : "TransferFunction",
	0x013E : "WhitePoint",
	0x013F : "PrimaryChromaticities",
	0x0211 : "YCbCrCoefficients",
	0x0214 : "ReferenceBlackWhite",
	0x0132 : "DateTime",
	0x010E : "ImageDescription",
	0x010F : "Make",
	0x0110 : "Model",
	0x0131 : "Software",
	0x013B : "Artist",
	0x8298 : "Copyright"
}

EXIF.GPSTags = {
	0x0000 : "GPSVersionID",
	0x0001 : "GPSLatitudeRef",
	0x0002 : "GPSLatitude",
	0x0003 : "GPSLongitudeRef",
	0x0004 : "GPSLongitude",
	0x0005 : "GPSAltitudeRef",
	0x0006 : "GPSAltitude",
	0x0007 : "GPSTimeStamp",
	0x0008 : "GPSSatellites",
	0x0009 : "GPSStatus",
	0x000A : "GPSMeasureMode",
	0x000B : "GPSDOP",
	0x000C : "GPSSpeedRef",
	0x000D : "GPSSpeed",
	0x000E : "GPSTrackRef",
	0x000F : "GPSTrack",
	0x0010 : "GPSImgDirectionRef",
	0x0011 : "GPSImgDirection",
	0x0012 : "GPSMapDatum",
	0x0013 : "GPSDestLatitudeRef",
	0x0014 : "GPSDestLatitude",
	0x0015 : "GPSDestLongitudeRef",
	0x0016 : "GPSDestLongitude",
	0x0017 : "GPSDestBearingRef",
	0x0018 : "GPSDestBearing",
	0x0019 : "GPSDestDistanceRef",
	0x001A : "GPSDestDistance",
	0x001B : "GPSProcessingMethod",
	0x001C : "GPSAreaInformation",
	0x001D : "GPSDateStamp",
	0x001E : "GPSDifferential"
}

EXIF.StringValues = {
	ExposureProgram : {
		0 : "Not defined",
		1 : "Manual",
		2 : "Normal program",
		3 : "Aperture priority",
		4 : "Shutter priority",
		5 : "Creative program",
		6 : "Action program",
		7 : "Portrait mode",
		8 : "Landscape mode"
	},
	MeteringMode : {
		0 : "Unknown",
		1 : "Average",
		2 : "CenterWeightedAverage",
		3 : "Spot",
		4 : "MultiSpot",
		5 : "Pattern",
		6 : "Partial",
		255 : "Other"
	},
	LightSource : {
		0 : "Unknown",
		1 : "Daylight",
		2 : "Fluorescent",
		3 : "Tungsten (incandescent light)",
		4 : "Flash",
		9 : "Fine weather",
		10 : "Cloudy weather",
		11 : "Shade",
		12 : "Daylight fluorescent (D 5700 - 7100K)",
		13 : "Day white fluorescent (N 4600 - 5400K)",
		14 : "Cool white fluorescent (W 3900 - 4500K)",
		15 : "White fluorescent (WW 3200 - 3700K)",
		17 : "Standard light A",
		18 : "Standard light B",
		19 : "Standard light C",
		20 : "D55",
		21 : "D65",
		22 : "D75",
		23 : "D50",
		24 : "ISO studio tungsten",
		255 : "Other"
	},
	Flash : {
		0x0000 : "Flash did not fire",
		0x0001 : "Flash fired",
		0x0005 : "Strobe return light not detected",
		0x0007 : "Strobe return light detected",
		0x0009 : "Flash fired, compulsory flash mode",
		0x000D : "Flash fired, compulsory flash mode, return light not detected",
		0x000F : "Flash fired, compulsory flash mode, return light detected",
		0x0010 : "Flash did not fire, compulsory flash mode",
		0x0018 : "Flash did not fire, auto mode",
		0x0019 : "Flash fired, auto mode",
		0x001D : "Flash fired, auto mode, return light not detected",
		0x001F : "Flash fired, auto mode, return light detected",
		0x0020 : "No flash function",
		0x0041 : "Flash fired, red-eye reduction mode",
		0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
		0x0047 : "Flash fired, red-eye reduction mode, return light detected",
		0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
		0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
		0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
		0x0059 : "Flash fired, auto mode, red-eye reduction mode",
		0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
		0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
	},
	SensingMethod : {
		1 : "Not defined",
		2 : "One-chip color area sensor",
		3 : "Two-chip color area sensor",
		4 : "Three-chip color area sensor",
		5 : "Color sequential area sensor",
		7 : "Trilinear sensor",
		8 : "Color sequential linear sensor"
	},
	SceneCaptureType : {
		0 : "Standard",
		1 : "Landscape",
		2 : "Portrait",
		3 : "Night scene"
	},
	SceneType : {
		1 : "Directly photographed"
	},
	CustomRendered : {
		0 : "Normal process",
		1 : "Custom process"
	},
	WhiteBalance : {
		0 : "Auto white balance",
		1 : "Manual white balance"
	},
	GainControl : {
		0 : "None",
		1 : "Low gain up",
		2 : "High gain up",
		3 : "Low gain down",
		4 : "High gain down"
	},
	Contrast : {
		0 : "Normal",
		1 : "Soft",
		2 : "Hard"
	},
	Saturation : {
		0 : "Normal",
		1 : "Low saturation",
		2 : "High saturation"
	},
	Sharpness : {
		0 : "Normal",
		1 : "Soft",
		2 : "Hard"
	},
	SubjectDistanceRange : {
		0 : "Unknown",
		1 : "Macro",
		2 : "Close view",
		3 : "Distant view"
	},
	FileSource : {
		3 : "DSC"
	},

	Components : {
		0 : "",
		1 : "Y",
		2 : "Cb",
		3 : "Cr",
		4 : "R",
		5 : "G",
		6 : "B"
	}
}

function addEvent(oElement, strEvent, fncHandler) 
{
	if (oElement.addEventListener) { 
		oElement.addEventListener(strEvent, fncHandler, false); 
	} else if (oElement.attachEvent) { 
		oElement.attachEvent("on" + strEvent, fncHandler); 
	}
}


function imageHasData(oImg) 
{
	return !!(oImg.exifdata);
}

function getImageData(oImg, fncCallback) 
{
	BinaryAjax(
		oImg.src,
		function(oHTTP) {
			var oEXIF = findEXIFinJPEG(oHTTP.binaryResponse);
			oImg.exifdata = oEXIF || {};
			if (fncCallback) fncCallback();
		}
	)
}

function findEXIFinJPEG(oFile) {
	var aMarkers = [];

	if (oFile.getByteAt(0) != 0xFF || oFile.getByteAt(1) != 0xD8) {
		return false; // not a valid jpeg
	}

	var iOffset = 2;
	var iLength = oFile.getLength();
	while (iOffset < iLength) {
		if (oFile.getByteAt(iOffset) != 0xFF) {
			if (bDebug) console.log("Not a valid marker at offset " + iOffset + ", found: " + oFile.getByteAt(iOffset));
			return false; // not a valid marker, something is wrong
		}

		var iMarker = oFile.getByteAt(iOffset+1);

		// we could implement handling for other markers here, 
		// but we're only looking for 0xFFE1 for EXIF data

		if (iMarker == 22400) {
			if (bDebug) console.log("Found 0xFFE1 marker");
			return readEXIFData(oFile, iOffset + 4, oFile.getShortAt(iOffset+2, true)-2);
			iOffset += 2 + oFile.getShortAt(iOffset+2, true);

		} else if (iMarker == 225) {
			// 0xE1 = Application-specific 1 (for EXIF)
			if (bDebug) console.log("Found 0xFFE1 marker");
			return readEXIFData(oFile, iOffset + 4, oFile.getShortAt(iOffset+2, true)-2);

		} else {
			iOffset += 2 + oFile.getShortAt(iOffset+2, true);
		}

	}

}


function readTags(oFile, iTIFFStart, iDirStart, oStrings, bBigEnd) 
{
	var iEntries = oFile.getShortAt(iDirStart, bBigEnd);
	var oTags = {};
	for (var i=0;i<iEntries;i++) {
		var iEntryOffset = iDirStart + i*12 + 2;
		var strTag = oStrings[oFile.getShortAt(iEntryOffset, bBigEnd)];
		if (!strTag && bDebug) console.log("Unknown tag: " + oFile.getShortAt(iEntryOffset, bBigEnd));
		oTags[strTag] = readTagValue(oFile, iEntryOffset, iTIFFStart, iDirStart, bBigEnd);
	}
	return oTags;
}


function readTagValue(oFile, iEntryOffset, iTIFFStart, iDirStart, bBigEnd)
{
	var iType = oFile.getShortAt(iEntryOffset+2, bBigEnd);
	var iNumValues = oFile.getLongAt(iEntryOffset+4, bBigEnd);
	var iValueOffset = oFile.getLongAt(iEntryOffset+8, bBigEnd) + iTIFFStart;

	switch (iType) {
		case 1: // byte, 8-bit unsigned int
		case 7: // undefined, 8-bit byte, value depending on field
			if (iNumValues == 1) {
				return oFile.getByteAt(iEntryOffset + 8, bBigEnd);
			} else {
				var iValOffset = iNumValues > 4 ? iValueOffset : (iEntryOffset + 8);
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getByteAt(iValOffset + n);
				}
				return aVals;
			}
			break;

		case 2: // ascii, 8-bit byte
			var iStringOffset = iNumValues > 4 ? iValueOffset : (iEntryOffset + 8);
			return oFile.getStringAt(iStringOffset, iNumValues-1);
			break;

		case 3: // short, 16 bit int
			if (iNumValues == 1) {
				return oFile.getShortAt(iEntryOffset + 8, bBigEnd);
			} else {
				var iValOffset = iNumValues > 2 ? iValueOffset : (iEntryOffset + 8);
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getShortAt(iValOffset + 2*n, bBigEnd);
				}
				return aVals;
			}
			break;

		case 4: // long, 32 bit int
			if (iNumValues == 1) {
				return oFile.getLongAt(iEntryOffset + 8, bBigEnd);
			} else {
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getLongAt(iValueOffset + 4*n, bBigEnd);
				}
				return aVals;
			}
			break;
		case 5:	// rational = two long values, first is numerator, second is denominator
			if (iNumValues == 1) {
				return oFile.getLongAt(iValueOffset, bBigEnd) / oFile.getLongAt(iValueOffset+4, bBigEnd);
			} else {
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getLongAt(iValueOffset + 8*n, bBigEnd) / oFile.getLongAt(iValueOffset+4 + 8*n, bBigEnd);
				}
				return aVals;
			}
			break;
		case 9: // slong, 32 bit signed int
			if (iNumValues == 1) {
				return oFile.getSLongAt(iEntryOffset + 8, bBigEnd);
			} else {
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getSLongAt(iValueOffset + 4*n, bBigEnd);
				}
				return aVals;
			}
			break;
		case 10: // signed rational, two slongs, first is numerator, second is denominator
			if (iNumValues == 1) {
				return oFile.getSLongAt(iValueOffset, bBigEnd) / oFile.getSLongAt(iValueOffset+4, bBigEnd);
			} else {
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getSLongAt(iValueOffset + 8*n, bBigEnd) / oFile.getSLongAt(iValueOffset+4 + 8*n, bBigEnd);
				}
				return aVals;
			}
			break;
	}
}


function readEXIFData(oFile, iStart, iLength) 
{
	if (oFile.getStringAt(iStart, 4) != "Exif") {
		if (bDebug) console.log("Not valid EXIF data! " + oFile.getStringAt(iStart, 4));
		return false;
	}

	var bBigEnd;

	var iTIFFOffset = iStart + 6;

	// test for TIFF validity and endianness
	if (oFile.getShortAt(iTIFFOffset) == 0x4949) {
		bBigEnd = false;
	} else if (oFile.getShortAt(iTIFFOffset) == 0x4D4D) {
		bBigEnd = true;
	} else {
		if (bDebug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
		return false;
	}

	if (oFile.getShortAt(iTIFFOffset+2, bBigEnd) != 0x002A) {
		if (bDebug) console.log("Not valid TIFF data! (no 0x002A)");
		return false;
	}

	if (oFile.getLongAt(iTIFFOffset+4, bBigEnd) != 0x00000008) {
		if (bDebug) console.log("Not valid TIFF data! (First offset not 8)", oFile.getShortAt(iTIFFOffset+4, bBigEnd));
		return false;
	}

	var oTags = readTags(oFile, iTIFFOffset, iTIFFOffset+8, EXIF.TiffTags, bBigEnd);

	if (oTags.ExifIFDPointer) {
		var oEXIFTags = readTags(oFile, iTIFFOffset, iTIFFOffset + oTags.ExifIFDPointer, EXIF.Tags, bBigEnd);
		for (var strTag in oEXIFTags) {
			switch (strTag) {
				case "LightSource" :
				case "Flash" :
				case "MeteringMode" :
				case "ExposureProgram" :
				case "SensingMethod" :
				case "SceneCaptureType" :
				case "SceneType" :
				case "CustomRendered" :
				case "WhiteBalance" : 
				case "GainControl" : 
				case "Contrast" :
				case "Saturation" :
				case "Sharpness" : 
				case "SubjectDistanceRange" :
				case "FileSource" :
					oEXIFTags[strTag] = EXIF.StringValues[strTag][oEXIFTags[strTag]];
					break;
	
				case "ExifVersion" :
				case "FlashpixVersion" :
					oEXIFTags[strTag] = String.fromCharCode(oEXIFTags[strTag][0], oEXIFTags[strTag][1], oEXIFTags[strTag][2], oEXIFTags[strTag][3]);
					break;
	
				case "ComponentsConfiguration" : 
					oEXIFTags[strTag] = 
						EXIF.StringValues.Components[oEXIFTags[strTag][0]]
						+ EXIF.StringValues.Components[oEXIFTags[strTag][1]]
						+ EXIF.StringValues.Components[oEXIFTags[strTag][2]]
						+ EXIF.StringValues.Components[oEXIFTags[strTag][3]];
					break;
			}
			oTags[strTag] = oEXIFTags[strTag];
		}
	}

	if (oTags.GPSInfoIFDPointer) {
		var oGPSTags = readTags(oFile, iTIFFOffset, iTIFFOffset + oTags.GPSInfoIFDPointer, EXIF.GPSTags, bBigEnd);
		for (var strTag in oGPSTags) {
			switch (strTag) {
				case "GPSVersionID" : 
					oGPSTags[strTag] = oGPSTags[strTag][0] 
						+ "." + oGPSTags[strTag][1] 
						+ "." + oGPSTags[strTag][2] 
						+ "." + oGPSTags[strTag][3];
					break;
			}
			oTags[strTag] = oGPSTags[strTag];
		}
	}

	return oTags;
}


EXIF.getData = function(oImg, fncCallback) 
{
	if (!oImg.complete) return false;
	if (!imageHasData(oImg)) {
		getImageData(oImg, fncCallback);
	} else {
		if (fncCallback) fncCallback();
	}
	return true;
}

EXIF.getTag = function(oImg, strTag) 
{
	if (!imageHasData(oImg)) return;
	return oImg.exifdata[strTag];
}

EXIF.pretty = function(oImg) 
{
	if (!imageHasData(oImg)) return "";
	var oData = oImg.exifdata;
	var strPretty = "";
	for (var a in oData) {
		if (oData.hasOwnProperty(a)) {
			if (typeof oData[a] == "object") {
				strPretty += a + " : [" + oData[a].length + " values]\r\n";
			} else {
				strPretty += a + " : " + oData[a] + "\r\n";
			}
		}
	}
	return strPretty;
}

EXIF.readFromBinaryFile = function(oFile) {
	return findEXIFinJPEG(oFile);
}

function loadAllImages() 
{
	var aImages = document.getElementsByTagName("img");
	for (var i=0;i<aImages.length;i++) {
		if (aImages[i].getAttribute("exif") == "true") {
			if (!aImages[i].complete) {
				addEvent(aImages[i], "load", 
					function() {
						EXIF.getData(this);
					}
				); 
			} else {
				EXIF.getData(aImages[i]);
			}
		}
	}
}

addEvent(window, "load", loadAllImages); 

})();


/*
 * ImageInfo 0.1.2 - A JavaScript library for reading image metadata.
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
 */


var ImageInfo = {};

ImageInfo.useRange = false;
ImageInfo.range = 10240;

(function() {

	var files = [];

	function readFileData(url, callback) {
		BinaryAjax(
			url,
			function(http) {
				var tags = readInfoFromData(http.binaryResponse);
				var mime = http.getResponseHeader("Content-Type");

				tags["mimeType"] = mime;
				tags["byteSize"] = http.fileSize;

				files[url] = tags;
				if (callback) callback();
			},
			null,
			ImageInfo.useRange ? [0, ImageInfo.range] : null
		)
	}

	function readInfoFromData(data) {
	
		var offset = 0;

		if (data.getByteAt(0) == 0xFF && data.getByteAt(1) == 0xD8) {
			return readJPEGInfo(data);
		}
		// IE11 -> 0x30
		if ((data.getByteAt(0) == 0x89 || data.getByteAt(0) == 0x30) && data.getStringAt(1, 3) == "PNG") {
			return readPNGInfo(data);
		}
		if (data.getStringAt(0,3) == "GIF") {
			return readGIFInfo(data);
		}
		if (data.getByteAt(0) == 0x42 && data.getByteAt(1) == 0x4D) {
			return readBMPInfo(data);
		}
		if (data.getByteAt(0) == 0x00 && data.getByteAt(1) == 0x00) {
			return readICOInfo(data);
		}

		return {
			format : "UNKNOWN"
		};
	}


	function readPNGInfo(data) {
		var w = data.getLongAt(16,true);
		var h = data.getLongAt(20,true);

		var bpc = data.getByteAt(24);
		var ct = data.getByteAt(25);

		var bpp = bpc;
		if (ct == 4) bpp *= 2;
		if (ct == 2) bpp *= 3;
		if (ct == 6) bpp *= 4;

		var alpha = data.getByteAt(25) >= 4;

		return {
			format : "PNG",
			version : "",
			width : w,
			height : h,
			bpp : bpp,
			alpha : alpha,
			exif : {}
		}
	}

	function readGIFInfo(data) {
		var version = data.getStringAt(3,3);
		var w = data.getShortAt(6);
		var h = data.getShortAt(8);

		var bpp = ((data.getByteAt(10) >> 4) & 7) + 1;

		return {
			format : "GIF",
			version : version,
			width : w,
			height : h,
			bpp : bpp,
			alpha : false,
			exif : {}
		}
	}

	function readJPEGInfo(data) {

		var w = 0;
		var h = 0;
		var comps = 0;
		var len = data.getLength();
		var offset = 2;
		while (offset < len) {
			var marker = data.getShortAt(offset, true);
			offset += 2;
			if (marker == 0xFFC0) {
				h = data.getShortAt(offset + 3, true);
				w = data.getShortAt(offset + 5, true);
				comps = data.getByteAt(offset + 7, true)
				break;
			} else {
				offset += data.getShortAt(offset, true)
			}
		}

		var exif = {};

		if (typeof EXIF != "undefined" && EXIF.readFromBinaryFile) {
			exif = EXIF.readFromBinaryFile(data);
		}

		return {
			format : "JPEG",
			version : "",
			width : w,
			height : h,
			bpp : comps * 8,
			alpha : false,
			exif : exif
		}
	}

	function readBMPInfo(data) {
		var w = data.getLongAt(18);
		var h = data.getLongAt(22);
		var bpp = data.getShortAt(28);
		return {
			format : "BMP",
			version : "",
			width : w,
			height : h,
			bpp : bpp,
			alpha : false,
			exif : {}
		}
	}

	ImageInfo.loadInfo = function(url, cb) {
		if (!files[url]) {
			readFileData(url, cb);
		} else {
			if (cb) cb();
		}
	}

	ImageInfo.getAllFields = function(url) {
		if (!files[url]) return null;

		var tags = {};
		for (var a in files[url]) {
			if (files[url].hasOwnProperty(a))
				tags[a] = files[url][a];
		}
		return tags;
	}

	ImageInfo.getField = function(url, field) {
		if (!files[url]) return null;
		return files[url][field];
	}


})();


/**
 * AJAX DELETE request.
 */
global.DELETE = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: uriOrParams
		//OPTIONAL: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.isSecure
		//REQUIRED: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
			uri : uriOrParams
		}, {
			method : 'DELETE'
		}]), responseListenerOrListeners);
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.DELETE = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: uriOrParams
			//OPTIONAL: uriOrParams.host
			//OPTIONAL: uriOrParams.port
			//OPTIONAL: uriOrParams.isSecure
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.paramStr
			//OPTIONAL: uriOrParams.data
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE([params, {
				method : 'DELETE'
			}]), responseListenerOrListeners);
		}
	});
});

/**
 * AJAX GET request.
 */
global.GET = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: uriOrParams
		//OPTIONAL: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.isSecure
		//REQUIRED: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
			uri : uriOrParams
		}, {
			method : 'GET'
		}]), responseListenerOrListeners);
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.GET = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: uriOrParams
			//OPTIONAL: uriOrParams.host
			//OPTIONAL: uriOrParams.port
			//OPTIONAL: uriOrParams.isSecure
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.paramStr
			//OPTIONAL: uriOrParams.data
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE([params, {
				method : 'GET'
			}]), responseListenerOrListeners);
		}
	});
});

/**
 * AJAX POST request.
 */
global.POST = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: uriOrParams
		//OPTIONAL: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.isSecure
		//REQUIRED: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
			uri : uriOrParams
		}, {
			method : 'POST'
		}]), responseListenerOrListeners);
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.POST = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: uriOrParams
			//OPTIONAL: uriOrParams.host
			//OPTIONAL: uriOrParams.port
			//OPTIONAL: uriOrParams.isSecure
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.paramStr
			//OPTIONAL: uriOrParams.data
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE([params, {
				method : 'POST'
			}]), responseListenerOrListeners);
		}
	});
});

/**
 * AJAX PUT request.
 */
global.PUT = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: uriOrParams
		//OPTIONAL: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.isSecure
		//REQUIRED: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
			uri : uriOrParams
		}, {
			method : 'PUT'
		}]), responseListenerOrListeners);
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.PUT = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: uriOrParams
			//OPTIONAL: uriOrParams.host
			//OPTIONAL: uriOrParams.port
			//OPTIONAL: uriOrParams.isSecure
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.paramStr
			//OPTIONAL: uriOrParams.data
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE([params, {
				method : 'PUT'
			}]), responseListenerOrListeners);
		}
	});
});

/**
 * AJAX request.
 */
global.REQUEST = METHOD({

	run : function(params, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.isSecure
		//REQUIRED: params.method
		//OPTIONAL: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data
		//REQUIRED: responseListenerOrListeners

		var
		// host
		host = params.host === undefined ? BROWSER_CONFIG.host : params.host,

		// port
		port = params.port === undefined ? (params.host === undefined ? BROWSER_CONFIG.port : 80) : params.port,

		// is secure
		isSecure = params.isSecure,

		// method
		method = params.method,

		// uri
		uri = params.uri,

		// param str
		paramStr = params.paramStr,

		// data
		data = params.data,

		// response listener
		responseListener,

		// error listener
		errorListener,

		// url
		url,

		// http request
		req;

		method = method.toUpperCase();

		if (uri !== undefined && uri.indexOf('?') !== -1) {
			paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
			uri = uri.substring(0, uri.indexOf('?'));
		}

		if (data !== undefined) {
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();

		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}

		url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + (uri === undefined ? '' : (uri[0] === '/' ? uri.substring(1) : uri));

		req = new XMLHttpRequest();

		req.onreadystatechange = function() {

			var
			// error
			error;

			// when request completed
			if (req.readyState === 4) {

				if (req.status === 200) {
					responseListener(req.responseText);
				} else {

					error = {
						code : req.status
					};

					if (errorListener !== undefined) {
						errorListener(error);
					} else {
						console.log('[UJS-REQUEST] REQUEST FAILED:', params, error);
					}
				}
			}
		};

		// GET request.
		if (method === 'GET') {
			req.open(method, url + '?' + paramStr);
			req.send();
		}

		// other request.
		else {
			req.open(method, url);
			req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			req.send(paramStr);
		}
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.REQUEST = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.isSecure
			//REQUIRED: params.method
			//REQUIRED: params.uri
			//OPTIONAL: params.paramStr
			//OPTIONAL: params.data
			//REQUIRED: responseListenerOrListeners

			REQUEST(COMBINE([params, {
				uri : box.boxName + '/' + params.uri
			}]), responseListenerOrListeners);
		}
	});
});

/**
 * go another view.
 */
global.GO = METHOD(function(m) {
	'use strict';
	
	var
	// is ctrl key down
	isCTRLKeyDown;

	return {
		
		run : function(uri) {
			//REQUIRED: uri
			
			if (isCTRLKeyDown === undefined) {
				isCTRLKeyDown = false;
							
				EVENT('keydown', function(e) {
					if (e.getKeyCode() === 17) {
						isCTRLKeyDown = true;
					}
				});
				
				EVENT('keyup', function(e) {
					if (e.getKeyCode() === 17) {
						isCTRLKeyDown = false;
					}
				});
			}
			
			if (isCTRLKeyDown === true) {
				
				GO_NEW_WIN(uri);
				
				isCTRLKeyDown = false;
			}
			
			else {
				
				history.pushState(undefined, undefined, HREF(uri));
				
				MATCH_VIEW.checkAll();
			}
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.GO = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});

/**
 * go another view on new window.
 */
global.GO_NEW_WIN = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		global.open(HREF(uri));
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.GO_NEW_WIN = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO_NEW_WIN((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});

/**
 * get href.
 */
global.HREF = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		return '/' + uri;
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.HREF = METHOD({

		run : function(uri) {
			//OPTIONAL: uri

			return HREF((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});

/**
 * match view.
 */
global.MATCH_VIEW = METHOD(function(m) {
	'use strict';
	
	var
	// change uri handlers
	changeURIHandlers = [],
	
	// check all.
	checkAll;
	
	m.checkAll = checkAll = function() {
		EACH(changeURIHandlers, function(changeURIHandler) {
			changeURIHandler();
		});
	};
	
	return {

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.uri
			//OPTIONAL: params.excludeURI
			//REQUIRED: params.target
	
			var
			// uri
			uri = params.uri,
			
			// exclude uri
			excludeURI = params.excludeURI,
	
			// target
			target = params.target,
	
			// uri matcher
			uriMatcher = URI_MATCHER(uri),
	
			// exclude uri matcher
			excludeURIMatcher = excludeURI === undefined ? undefined : URI_MATCHER(excludeURI),
	
			// view
			view,
	
			// pre params
			preParams,
			
			// change uri handler.
			changeURIHandler = function() {
	
				var
				// uri
				uri = URI(),
	
				// result
				result,
	
				// uri parmas
				uriParams;
	
				// when view founded
				if (uri !== REFRESH.getRefreshingURI() && ( result = uriMatcher.check(uri)).checkIsMatched() === true && (excludeURI === undefined || excludeURIMatcher.check(uri).checkIsMatched() !== true)) {
	
					uriParams = result.getURIParams();
	
					// when before view not exists, create view.
					if (view === undefined) {
	
						view = target();
						view.changeParams(uriParams);
						target.lastView = view;
	
						preParams = uriParams;
					}
	
					// when before view exists, change params.
					else if (CHECK_ARE_SAME([preParams, uriParams]) !== true) {
	
						view.changeParams(uriParams);
						preParams = uriParams;
					}
					
					view.runURIChangeHandlers(uri);
				}
	
				// when view not founded, close before view
				else if (view !== undefined) {
	
					view.close();
	
					view = undefined;
					target.lastView = undefined;
				}
			};
			
			changeURIHandlers.push(changeURIHandler);
	
			EVENT('popstate', function() {
				changeURIHandler();
			});
			
			changeURIHandler();
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.MATCH_VIEW = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.uri
			//OPTIONAL: params.excludeURI
			//REQUIRED: params.target

			var
			// uri
			uri = params.uri,
			
			// exclude uri
			excludeURI = params.excludeURI,

			// target
			target = params.target,

			// new uris
			newURIs = [],
			
			// new exclude uris
			newExcludeURIs = [],

			// push uri.
			pushURI = function(uri) {

				if (box.boxName === CONFIG.defaultBoxName) {
					newURIs.push(uri);
				}

				newURIs.push(box.boxName + '/' + uri);
			},

			// push exclude uri.
			pushExcludeURI = function(uri) {

				if (box.boxName === CONFIG.defaultBoxName) {
					newExcludeURIs.push(uri);
				}

				newExcludeURIs.push(box.boxName + '/' + uri);
			};

			if (CHECK_IS_ARRAY(uri) === true) {
				EACH(uri, pushURI);
			} else {
				pushURI(uri);
			}
			
			if (excludeURI !== undefined) {
				if (CHECK_IS_ARRAY(excludeURI) === true) {
					EACH(excludeURI, pushExcludeURI);
				} else {
					pushExcludeURI(excludeURI);
				}
			}

			MATCH_VIEW({
				uri : newURIs,
				excludeURI : newExcludeURIs,
				target : target
			});
		}
	});
});

/**
 * refresh view.
 */
global.REFRESH = METHOD(function(m) {
	'use strict';
	
	var
	// refreshing uri
	refreshingURI = '__REFRESHING',
	
	// get refreshing uri.
	getRefreshingURI;
	
	m.getRefreshingURI = getRefreshingURI = function() {
		return refreshingURI;
	};
	
	return {

		run : function(uri) {
			//OPTIONAL: uri
	
			var
			// saved uri
			savedURI = uri !== undefined ? uri : location.pathname.substring(1);
	
			history.pushState(undefined, undefined, '/' + refreshingURI);
			MATCH_VIEW.checkAll();
			
			history.replaceState(undefined, undefined, '/' + savedURI);
			MATCH_VIEW.checkAll();
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.REFRESH = METHOD({

		run : function(uri) {
			//OPTIONAL: uri
			
			REFRESH((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});

/**
 * get now page's URI.
 */
global.URI = METHOD({

	run : function() {
		'use strict';
		
		return decodeURIComponent(location.pathname.substring(1));
	}
});

/**
 * View interface
 */
global.VIEW = CLASS({

	init : function(inner, self) {
		'use strict';

		var
		// is closed
		isClosed = false,

		// params change handlers
		paramsChangeHandlers = [],
		
		// uri change handlers
		uriChangeHandlers = [],

		// close handlers
		closeHandlers = [],
		
		// now params
		nowParams,
		
		// now uri
		nowURI,

		// on.
		on,

		// change params.
		changeParams,
		
		// run uri change handlers.
		runURIChangeHandlers,

		// close.
		close,

		// check is closed.
		checkIsClosed;

		inner.on = on = function(methodName, handler) {
			//REQUIRED: methodName

			// when change params
			if (methodName === 'paramsChange') {
				paramsChangeHandlers.push(handler);
				if (nowParams !== undefined) {
					handler(nowParams);
				}
			}
			
			// when change uri
			if (methodName === 'uriChange') {
				uriChangeHandlers.push(handler);
				if (nowURI !== undefined) {
					handler(nowURI);
				}
			}

			// when close
			else if (methodName === 'close') {
				closeHandlers.push(handler);
			}
		};

		self.changeParams = changeParams = function(params) {
			
			nowParams = params;

			EACH(paramsChangeHandlers, function(handler) {
				handler(params);
			});
		};
		
		self.runURIChangeHandlers = runURIChangeHandlers = function(uri) {
			
			nowURI = uri;
			
			EACH(uriChangeHandlers, function(handler) {
				handler(uri);
			});
		};

		self.close = close = function() {

			EACH(closeHandlers, function(handler) {
				handler();
			});

			isClosed = true;
		};

		inner.checkIsClosed = checkIsClosed = function() {
			return isClosed;
		};
		
		scrollTo(0, 0);
	}
});

/**
 * check is document hidden.
 */
global.HIDDEN = METHOD(function(m) {
	'use strict';

	var
	// vendors
	vendors = ['webkit', 'moz', 'o', 'ms'],
	
	// hidden attr name
	hiddenAttrName = 'hidden';
	
	if (document['hidden'] === undefined) {
		
		EACH(vendors, function(vendor) {
			
			if (document[vendor + 'Hidden'] !== undefined) {
				
				hiddenAttrName = vendor + 'Hidden';
				
				return false;
			}
		});
	}

	return {

		run : function() {
			
			var
			// is hidden
			isHidden = document[hiddenAttrName];
			
			return isHidden === undefined ? true : isHidden;
		}
	};
});
/**
 * get scroll left. (px)
 */
global.SCROLL_LEFT = METHOD({

	run : function() {
		'use strict';

		return global.pageXOffset;
	}
});

/**
 * get scroll top. (px)
 */
global.SCROLL_TOP = METHOD({

	run : function() {
		'use strict';

		return global.pageYOffset;
	}
});

/**
 * change document title.
 */
global.TITLE = METHOD({

	run : function(title) {
		'use strict';
		//OPTIONAL: title

		if (title === undefined) {
			return document.title;
		} else {
			document.title = title;
		}
	}
});

/**
 * get window height. (px)
 */
global.WIN_HEIGHT = METHOD({

	run : function() {
		'use strict';

		return document.documentElement.clientHeight;
	}
});

/**
 * get window width. (px)
 */
global.WIN_WIDTH = METHOD({

	run : function() {
		'use strict';

		return document.documentElement.clientWidth;
	}
});
