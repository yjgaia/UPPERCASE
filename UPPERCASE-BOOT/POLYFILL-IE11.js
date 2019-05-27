/*
 * POLYFILL-IE11.js
 *
 * UPPERCASE 기반 프로젝트에서 Internet Explorer 11을 지원해야할 때 사용하는 Polyfill 스크립트
 *
 * TODO: 사운드 지원하기
 */

/* Polyfill service v3.34.0
 * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
 * 
 * Features requested: Math.log10,default,fetch
 * 
 * - _DOMTokenList, License: ISC (required by "DOMTokenList", "default")
 * - _ESAbstract.ArrayCreate, License: CC0 (required by "Array.from", "default", "Array.of", "_ESAbstract.ArraySpeciesCreate", "Array.prototype.filter", "Symbol", "Map", "Set", "Symbol.iterator", "Array.prototype.map")
 * - _ESAbstract.Call, License: CC0 (required by "Array.from", "default", "Array.prototype.forEach", "fetch", "URL", "_ESAbstract.GetIterator", "Map", "Set", "_ESAbstract.IteratorClose", "_ESAbstract.IteratorNext", "_ESAbstract.IteratorStep", "_ESAbstract.ToPrimitive", "_ESAbstract.ToString", "Array.of", "Array.prototype.fill", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Array.prototype.filter", "Symbol", "Symbol.iterator", "Array.prototype.map", "_ESAbstract.OrdinaryToPrimitive")
 * - _ESAbstract.CreateDataProperty, License: CC0 (required by "_ESAbstract.CreateDataPropertyOrThrow", "Array.from", "default", "Array.of", "_ESAbstract.CreateIterResultObject", "Map", "Set")
 * - _ESAbstract.CreateDataPropertyOrThrow, License: CC0 (required by "Array.from", "default", "Array.of", "Array.prototype.filter", "Symbol", "Map", "Set", "Symbol.iterator", "Array.prototype.map")
 * - _ESAbstract.CreateMethodProperty, License: CC0 (required by "Math.log10", "Array.from", "default", "Array.of", "Array.prototype.fill", "Map", "Number.isNaN", "Object.assign", "Set", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Array.prototype.forEach", "fetch", "URL", "Object.getOwnPropertyNames", "Array.prototype.indexOf", "Element.prototype.after", "Element.prototype.before", "Array.isArray", "Object.create", "_ESAbstract.GetIterator", "_ESAbstract.OrdinaryCreateFromConstructor", "_ESAbstract.Construct", "Symbol", "Symbol.iterator", "Object.getOwnPropertyDescriptor", "Object.keys", "Object.defineProperties", "Function.prototype.bind", "Object.getPrototypeOf", "Array.prototype.filter", "Array.prototype.map", "Object.freeze")
 * - _ESAbstract.Get, License: CC0 (required by "Array.from", "default", "Array.prototype.fill", "Object.assign", "Array.prototype.forEach", "fetch", "URL", "_ESAbstract.IteratorValue", "Map", "Set", "Array.prototype.indexOf", "Element.prototype.after", "Element.prototype.before", "_ESAbstract.IteratorComplete", "_ESAbstract.IteratorStep", "_ESAbstract.IsRegExp", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Object.defineProperties", "Object.create", "_ESAbstract.GetIterator", "_ESAbstract.OrdinaryCreateFromConstructor", "_ESAbstract.Construct", "Array.of", "Symbol", "Symbol.iterator", "_ESAbstract.GetPrototypeFromConstructor", "Array.prototype.filter", "Array.prototype.map", "_ESAbstract.OrdinaryToPrimitive", "_ESAbstract.ToPrimitive", "_ESAbstract.ToString", "_ESAbstract.ArraySpeciesCreate")
 * - _ESAbstract.IsCallable, License: CC0 (required by "Array.from", "default", "Map", "Set", "Array.prototype.forEach", "fetch", "URL", "_ESAbstract.GetMethod", "Function.prototype.bind", "_ESAbstract.Construct", "Array.of", "Object.getOwnPropertyDescriptor", "Object.assign", "Symbol", "Symbol.iterator", "Array.prototype.filter", "Array.prototype.map", "_ESAbstract.OrdinaryToPrimitive", "_ESAbstract.ToPrimitive", "_ESAbstract.ToString", "Array.prototype.fill", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith")
 * - _ESAbstract.RequireObjectCoercible, License: CC0 (required by "String.prototype.endsWith", "default", "String.prototype.includes", "String.prototype.startsWith")
 * - _ESAbstract.SameValueNonNumber, License: CC0 (required by "_ESAbstract.SameValueZero", "Map", "default", "Array.from", "Set")
 * - _ESAbstract.ToBoolean, License: CC0 (required by "_ESAbstract.IteratorComplete", "Map", "default", "Array.from", "Set", "_ESAbstract.IteratorStep", "_ESAbstract.IsRegExp", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Array.prototype.filter", "Symbol", "Symbol.iterator")
 * - _ESAbstract.ToInteger, License: CC0 (required by "Array.prototype.fill", "default", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "_ESAbstract.ToLength", "Array.from", "Array.prototype.forEach", "fetch", "URL", "Array.prototype.indexOf", "Element.prototype.after", "Element.prototype.before")
 * - _ESAbstract.ToLength, License: CC0 (required by "Array.from", "default", "Array.prototype.fill", "Array.prototype.forEach", "fetch", "URL", "Array.prototype.indexOf", "Element.prototype.after", "Element.prototype.before", "Array.prototype.filter", "Symbol", "Map", "Set", "Symbol.iterator", "Array.prototype.map")
 * - _ESAbstract.ToObject, License: CC0 (required by "Array.from", "default", "Array.prototype.fill", "Object.assign", "Array.prototype.forEach", "fetch", "URL", "Array.prototype.indexOf", "Element.prototype.after", "Element.prototype.before", "Object.defineProperties", "Object.create", "Map", "Set", "_ESAbstract.GetIterator", "_ESAbstract.OrdinaryCreateFromConstructor", "_ESAbstract.Construct", "Array.of", "Symbol", "Symbol.iterator", "_ESAbstract.GetV", "_ESAbstract.GetMethod", "Array.prototype.filter", "Array.prototype.map")
 * - _ESAbstract.GetV, License: CC0 (required by "_ESAbstract.GetMethod", "Array.from", "default", "Map", "Set", "_ESAbstract.GetIterator")
 * - _ESAbstract.GetMethod, License: CC0 (required by "Array.from", "default", "Map", "Set", "_ESAbstract.IsConstructor", "Array.of", "_ESAbstract.GetIterator", "_ESAbstract.IteratorClose", "_ESAbstract.ToPrimitive", "_ESAbstract.ToString", "Array.prototype.fill", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Array.prototype.forEach", "fetch", "URL")
 * - _ESAbstract.Type, License: CC0 (required by "Map", "default", "Array.from", "Number.isNaN", "_ESAbstract.IsConstructor", "Array.of", "_ESAbstract.GetIterator", "Set", "_ESAbstract.IteratorClose", "_ESAbstract.ToString", "Array.prototype.fill", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Array.prototype.forEach", "fetch", "URL", "_ESAbstract.IteratorValue", "_ESAbstract.CreateIterResultObject", "_ESAbstract.IteratorComplete", "_ESAbstract.IteratorStep", "_ESAbstract.IteratorNext", "_ESAbstract.SameValueZero", "Object.create", "_ESAbstract.OrdinaryCreateFromConstructor", "_ESAbstract.Construct", "Symbol", "Symbol.iterator", "_ESAbstract.IsRegExp", "Object.defineProperties", "_ESAbstract.ToPrimitive", "_ESAbstract.GetPrototypeFromConstructor", "_ESAbstract.OrdinaryToPrimitive", "_ESAbstract.ArraySpeciesCreate", "Array.prototype.filter", "Array.prototype.map")
 * - _ESAbstract.CreateIterResultObject, License: CC0 (required by "Map", "default", "Array.from", "Set")
 * - _ESAbstract.GetIterator, License: CC0 (required by "Array.from", "default", "Map", "Set")
 * - _ESAbstract.GetPrototypeFromConstructor, License: CC0 (required by "_ESAbstract.OrdinaryCreateFromConstructor", "Map", "default", "Array.from", "Set", "_ESAbstract.Construct", "Array.of")
 * - _ESAbstract.OrdinaryCreateFromConstructor, License: CC0 (required by "Map", "default", "Array.from", "Set", "_ESAbstract.Construct", "Array.of")
 * - _ESAbstract.IsConstructor, License: CC0 (required by "Array.from", "default", "Array.of", "_ESAbstract.Construct", "_ESAbstract.ArraySpeciesCreate", "Array.prototype.filter", "Symbol", "Map", "Set", "Symbol.iterator", "Array.prototype.map")
 * - _ESAbstract.Construct, License: CC0 (required by "Array.from", "default", "Array.of", "_ESAbstract.ArraySpeciesCreate", "Array.prototype.filter", "Symbol", "Map", "Set", "Symbol.iterator", "Array.prototype.map")
 * - _ESAbstract.IsRegExp, License: CC0 (required by "String.prototype.endsWith", "default", "String.prototype.includes", "String.prototype.startsWith")
 * - _ESAbstract.IteratorClose, License: CC0 (required by "Array.from", "default", "Map", "Set")
 * - _ESAbstract.IteratorComplete, License: CC0 (required by "Map", "default", "Array.from", "Set", "_ESAbstract.IteratorStep")
 * - _ESAbstract.IteratorNext, License: CC0 (required by "Map", "default", "Array.from", "Set", "_ESAbstract.IteratorStep")
 * - _ESAbstract.IteratorStep, License: CC0 (required by "Array.from", "default", "Map", "Set")
 * - _ESAbstract.IteratorValue, License: CC0 (required by "Array.from", "default", "Map", "Set")
 * - _ESAbstract.OrdinaryToPrimitive, License: CC0 (required by "_ESAbstract.ToPrimitive", "_ESAbstract.ToString", "Array.from", "default", "Array.of", "Array.prototype.fill", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Array.prototype.forEach", "fetch", "URL")
 * - _ESAbstract.SameValueZero, License: CC0 (required by "Map", "default", "Array.from", "Set")
 * - _ESAbstract.ToPrimitive, License: CC0 (required by "_ESAbstract.ToString", "Array.from", "default", "Array.of", "Array.prototype.fill", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Array.prototype.forEach", "fetch", "URL")
 * - _ESAbstract.ToString, License: CC0 (required by "Array.from", "default", "Array.of", "Array.prototype.fill", "String.prototype.endsWith", "String.prototype.includes", "String.prototype.startsWith", "Array.prototype.forEach", "fetch", "URL", "Array.prototype.indexOf", "Element.prototype.after", "Element.prototype.before", "Array.prototype.filter", "Symbol", "Map", "Set", "Symbol.iterator", "Array.prototype.map")
 * - _mutation, License: CC0 (required by "DocumentFragment.prototype.append", "default", "DocumentFragment.prototype.prepend", "Element.prototype.after", "Element.prototype.append", "Element.prototype.before", "Element.prototype.prepend", "Element.prototype.remove", "Element.prototype.replaceWith")
 * - Array.of, License: CC0 (required by "default")
 * - Array.prototype.fill, License: CC0 (required by "default")
 * - DocumentFragment.prototype.append, License: CC0 (required by "default")
 * - DocumentFragment.prototype.prepend, License: CC0 (required by "default")
 * - DOMTokenList, License: CC0 (required by "default", "Element.prototype.classList")
 * - Element.prototype.after, License: CC0 (required by "default")
 * - Element.prototype.append, License: CC0 (required by "default")
 * - Element.prototype.before, License: CC0 (required by "default")
 * - Element.prototype.classList, License: ISC (required by "default")
 * - Element.prototype.matches, License: CC0 (required by "default", "Element.prototype.closest")
 * - Element.prototype.closest, License: CC0 (required by "default")
 * - Element.prototype.prepend, License: CC0 (required by "default")
 * - Element.prototype.remove, License: CC0 (required by "default")
 * - Element.prototype.replaceWith, License: CC0 (required by "default")
 * - Event, License: CC0 (required by "default", "CustomEvent", "XMLHttpRequest", "fetch")
 * - CustomEvent, License: CC0 (required by "default")
 * - Math.log10, License: CC0
 * - Node.prototype.contains, License: CC0 (required by "default")
 * - Number.isNaN, License: MIT (required by "default")
 * - Object.assign, License: CC0 (required by "default")
 * - Promise, License: MIT (required by "default", "fetch")
 * - fetch, License: MIT
 * - String.prototype.endsWith, License: CC0 (required by "default")
 * - String.prototype.includes, License: CC0 (required by "default")
 * - String.prototype.startsWith, License: CC0 (required by "default")
 * - Symbol, License: MIT (required by "Map", "default", "Array.from", "Set", "Symbol.iterator", "Symbol.species")
 * - Symbol.iterator, License: MIT (required by "Array.from", "default", "Map", "Set")
 * - Symbol.species, License: MIT (required by "Map", "default", "Array.from", "Set")
 * - Map, License: CC0 (required by "default", "Array.from")
 * - Set, License: CC0 (required by "default", "Array.from")
 * - Array.from, License: CC0 (required by "default")
 * - URL, License: CC0-1.0 (required by "default") */

(function(undefined) {

// _DOMTokenList
/*
Copyright (c) 2016, John Gardner

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
var _DOMTokenList = (function() { // eslint-disable-line no-unused-vars
	var dpSupport = true;
	var defineGetter = function (object, name, fn, configurable) {
		if (Object.defineProperty)
			Object.defineProperty(object, name, {
				configurable: false === dpSupport ? true : !!configurable,
				get: fn
			});

		else object.__defineGetter__(name, fn);
	};

	/** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
	try {
		defineGetter({}, "support");
	}
	catch (e) {
		dpSupport = false;
	}


	var _DOMTokenList = function (el, prop) {
		var that = this;
		var tokens = [];
		var tokenMap = {};
		var length = 0;
		var maxLength = 0;
		var addIndexGetter = function (i) {
			defineGetter(that, i, function () {
				preop();
				return tokens[i];
			}, false);

		};
		var reindex = function () {

			/** Define getter functions for array-like access to the tokenList's contents. */
			if (length >= maxLength)
				for (; maxLength < length; ++maxLength) {
					addIndexGetter(maxLength);
				}
		};

		/** Helper function called at the start of each class method. Internal use only. */
		var preop = function () {
			var error;
			var i;
			var args = arguments;
			var rSpace = /\s+/;

			/** Validate the token/s passed to an instance method, if any. */
			if (args.length)
				for (i = 0; i < args.length; ++i)
					if (rSpace.test(args[i])) {
						error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
						error.code = 5;
						error.name = "InvalidCharacterError";
						throw error;
					}


			/** Split the new value apart by whitespace*/
			if (typeof el[prop] === "object") {
				tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
			} else {
				tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
			}

			/** Avoid treating blank strings as single-item token lists */
			if ("" === tokens[0]) tokens = [];

			/** Repopulate the internal token lists */
			tokenMap = {};
			for (i = 0; i < tokens.length; ++i)
				tokenMap[tokens[i]] = true;
			length = tokens.length;
			reindex();
		};

		/** Populate our internal token list if the targeted attribute of the subject element isn't empty. */
		preop();

		/** Return the number of tokens in the underlying string. Read-only. */
		defineGetter(that, "length", function () {
			preop();
			return length;
		});

		/** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */
		that.toLocaleString =
			that.toString = function () {
				preop();
				return tokens.join(" ");
			};

		that.item = function (idx) {
			preop();
			return tokens[idx];
		};

		that.contains = function (token) {
			preop();
			return !!tokenMap[token];
		};

		that.add = function () {
			preop.apply(that, args = arguments);

			for (var args, token, i = 0, l = args.length; i < l; ++i) {
				token = args[i];
				if (!tokenMap[token]) {
					tokens.push(token);
					tokenMap[token] = true;
				}
			}

			/** Update the targeted attribute of the attached element if the token list's changed. */
			if (length !== tokens.length) {
				length = tokens.length >>> 0;
				if (typeof el[prop] === "object") {
					el[prop].baseVal = tokens.join(" ");
				} else {
					el[prop] = tokens.join(" ");
				}
				reindex();
			}
		};

		that.remove = function () {
			preop.apply(that, args = arguments);

			/** Build a hash of token names to compare against when recollecting our token list. */
			for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
				ignore[args[i]] = true;
				delete tokenMap[args[i]];
			}

			/** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */
			for (i = 0; i < tokens.length; ++i)
				if (!ignore[tokens[i]]) t.push(tokens[i]);

			tokens = t;
			length = t.length >>> 0;

			/** Update the targeted attribute of the attached element. */
			if (typeof el[prop] === "object") {
				el[prop].baseVal = tokens.join(" ");
			} else {
				el[prop] = tokens.join(" ");
			}
			reindex();
		};

		that.toggle = function (token, force) {
			preop.apply(that, [token]);

			/** Token state's being forced. */
			if (undefined !== force) {
				if (force) {
					that.add(token);
					return true;
				} else {
					that.remove(token);
					return false;
				}
			}

			/** Token already exists in tokenList. Remove it, and return FALSE. */
			if (tokenMap[token]) {
				that.remove(token);
				return false;
			}

			/** Otherwise, add the token and return TRUE. */
			that.add(token);
			return true;
		};

		return that;
	};

	return _DOMTokenList;
}());

// _ESAbstract.ArrayCreate
// 9.4.2.2. ArrayCreate ( length [ , proto ] )
function ArrayCreate(length /* [, proto] */) { // eslint-disable-line no-unused-vars
	// 1. Assert: length is an integer Number ≥ 0.
	// 2. If length is -0, set length to +0.
	if (1 / length === -Infinity) {
		length = 0;
	}
	// 3. If length>2^32-1, throw a RangeError exception.
	if (length > (Math.pow(2, 32) - 1)) {
		throw new RangeError('Invalid array length');
	}
	// 4. If proto is not present, set proto to the intrinsic object %ArrayPrototype%.
	// 5. Let A be a newly created Array exotic object.
	var A = [];
	// 6. Set A's essential internal methods except for [[DefineOwnProperty]] to the default ordinary object definitions specified in 9.1.
	// 7. Set A.[[DefineOwnProperty]] as specified in 9.4.2.1.
	// 8. Set A.[[Prototype]] to proto.
	// 9. Set A.[[Extensible]] to true.
	// 10. Perform ! OrdinaryDefineOwnProperty(A, "length", PropertyDescriptor{[[Value]]: length, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false}).
	A.length = length;
	// 11. Return A.
	return A;
}

// _ESAbstract.Call
/* global IsCallable */
// 7.3.12. Call ( F, V [ , argumentsList ] )
function Call(F, V /* [, argumentsList] */) { // eslint-disable-line no-unused-vars
	// 1. If argumentsList is not present, set argumentsList to a new empty List.
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	// 2. If IsCallable(F) is false, throw a TypeError exception.
	if (IsCallable(F) === false) {
		throw new TypeError(Object.prototype.toString.call(F) + 'is not a function.');
	}
	// 3. Return ? F.[[Call]](V, argumentsList).
	return F.apply(V, argumentsList);
}

// _ESAbstract.CreateDataProperty
// 7.3.4. CreateDataProperty ( O, P, V )
// NOTE
// This abstract operation creates a property whose attributes are set to the same defaults used for properties created by the ECMAScript language assignment operator.
// Normally, the property will not already exist. If it does exist and is not configurable or if O is not extensible, [[DefineOwnProperty]] will return false.
function CreateDataProperty(O, P, V) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Let newDesc be the PropertyDescriptor{ [[Value]]: V, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }.
	var newDesc = {
		value: V,
		writable: true,
		enumerable: true,
		configurable: true
	};
	// 4. Return ? O.[[DefineOwnProperty]](P, newDesc).
	try {
		Object.defineProperty(O, P, newDesc);
		return true;
	} catch (e) {
		return false;
	}
}

// _ESAbstract.CreateDataPropertyOrThrow
/* global CreateDataProperty */
// 7.3.6. CreateDataPropertyOrThrow ( O, P, V )
function CreateDataPropertyOrThrow(O, P, V) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Let success be ? CreateDataProperty(O, P, V).
	var success = CreateDataProperty(O, P, V);
	// 4. If success is false, throw a TypeError exception.
	if (!success) {
		throw new TypeError('Cannot assign value `' + Object.prototype.toString.call(V) + '` to property `' + Object.prototype.toString.call(P) + '` on object `' + Object.prototype.toString.call(O) + '`');
	}
	// 5. Return success.
	return success;
}

// _ESAbstract.CreateMethodProperty
// 7.3.5. CreateMethodProperty ( O, P, V )
function CreateMethodProperty(O, P, V) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Let newDesc be the PropertyDescriptor{[[Value]]: V, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true}.
	var newDesc = {
		value: V,
		writable: true,
		enumerable: false,
		configurable: true
	};
	// 4. Return ? O.[[DefineOwnProperty]](P, newDesc).
	Object.defineProperty(O, P, newDesc);
}

// _ESAbstract.Get
// 7.3.1. Get ( O, P )
function Get(O, P) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Return ? O.[[Get]](P, O).
	return O[P];
}

// _ESAbstract.IsCallable
// 7.2.3. IsCallable ( argument )
function IsCallable(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is not Object, return false.
	// 2. If argument has a [[Call]] internal method, return true.
	// 3. Return false.

	// Polyfill.io - Only function objects have a [[Call]] internal method. This means we can simplify this function to check that the argument has a type of function.
	return typeof argument === 'function';
}

// _ESAbstract.RequireObjectCoercible
// 7.2.1. RequireObjectCoercible ( argument )
// The abstract operation ToObject converts argument to a value of type Object according to Table 12:
// Table 12: ToObject Conversions
/*
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Argument Type | Result                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Undefined     | Throw a TypeError exception.                                                                                                       |
| Null          | Throw a TypeError exception.                                                                                                       |
| Boolean       | Return argument.                                                                                                                   |
| Number        | Return argument.                                                                                                                   |
| String        | Return argument.                                                                                                                   |
| Symbol        | Return argument.                                                                                                                   |
| Object        | Return argument.                                                                                                                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
*/
function RequireObjectCoercible(argument) { // eslint-disable-line no-unused-vars
	if (argument === null || argument === undefined) {
		throw TypeError();
	}
  return argument;
}

// _ESAbstract.SameValueNonNumber
// 7.2.12. SameValueNonNumber ( x, y )
function SameValueNonNumber(x, y) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(x) is not Number.
	// 2. Assert: Type(x) is the same as Type(y).
	// 3. If Type(x) is Undefined, return true.
	// 4. If Type(x) is Null, return true.
	// 5. If Type(x) is String, then
		// a. If x and y are exactly the same sequence of code units (same length and same code units at corresponding indices), return true; otherwise, return false.
	// 6. If Type(x) is Boolean, then
		// a. If x and y are both true or both false, return true; otherwise, return false.
	// 7. If Type(x) is Symbol, then
		// a. If x and y are both the same Symbol value, return true; otherwise, return false.
	// 8. If x and y are the same Object value, return true. Otherwise, return false.

	// Polyfill.io - We can skip all above steps because the === operator does it all for us.
	return x === y;
}

// _ESAbstract.ToBoolean
// 7.1.2. ToBoolean ( argument )
// The abstract operation ToBoolean converts argument to a value of type Boolean according to Table 9:
/*
--------------------------------------------------------------------------------------------------------------
| Argument Type | Result                                                                                     |
--------------------------------------------------------------------------------------------------------------
| Undefined     | Return false.                                                                              |
| Null          | Return false.                                                                              |
| Boolean       | Return argument.                                                                           |
| Number        | If argument is +0, -0, or NaN, return false; otherwise return true.                        |
| String        | If argument is the empty String (its length is zero), return false; otherwise return true. |
| Symbol        | Return true.                                                                               |
| Object        | Return true.                                                                               |
--------------------------------------------------------------------------------------------------------------
*/
function ToBoolean(argument) { // eslint-disable-line no-unused-vars
	return Boolean(argument);
}

// _ESAbstract.ToInteger
// 7.1.4. ToInteger ( argument )
function ToInteger(argument) { // eslint-disable-line no-unused-vars
	// 1. Let number be ? ToNumber(argument).
	var number = Number(argument);
	// 2. If number is NaN, return +0.
	if (isNaN(number)) {
		return 0;
	}
	// 3. If number is +0, -0, +∞, or -∞, return number.
	if (1/number === Infinity || 1/number === -Infinity || number === Infinity || number === -Infinity) {
		return number;
	}
	// 4. Return the number value that is the same sign as number and whose magnitude is floor(abs(number)).
	return ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
}

// _ESAbstract.ToLength
/* global ToInteger */
// 7.1.15. ToLength ( argument )
function ToLength(argument) { // eslint-disable-line no-unused-vars
	// 1. Let len be ? ToInteger(argument).
	var len = ToInteger(argument);
	// 2. If len ≤ +0, return +0.
	if (len <= 0) {
		return 0;
	}
	// 3. Return min(len, 253-1).
	return Math.min(len, Math.pow(2, 53) -1);
}

// _ESAbstract.ToObject
// 7.1.13 ToObject ( argument )
// The abstract operation ToObject converts argument to a value of type Object according to Table 12:
// Table 12: ToObject Conversions
/*
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Argument Type | Result                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Undefined     | Throw a TypeError exception.                                                                                                       |
| Null          | Throw a TypeError exception.                                                                                                       |
| Boolean       | Return a new Boolean object whose [[BooleanData]] internal slot is set to argument. See 19.3 for a description of Boolean objects. |
| Number        | Return a new Number object whose [[NumberData]] internal slot is set to argument. See 20.1 for a description of Number objects.    |
| String        | Return a new String object whose [[StringData]] internal slot is set to argument. See 21.1 for a description of String objects.    |
| Symbol        | Return a new Symbol object whose [[SymbolData]] internal slot is set to argument. See 19.4 for a description of Symbol objects.    |
| Object        | Return argument.                                                                                                                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
*/
function ToObject(argument) { // eslint-disable-line no-unused-vars
	if (argument === null || argument === undefined) {
		throw TypeError();
	}
  return Object(argument);
}

// _ESAbstract.GetV
/* global ToObject */
// 7.3.2 GetV (V, P)
function GetV(v, p) { // eslint-disable-line no-unused-vars
	// 1. Assert: IsPropertyKey(P) is true.
	// 2. Let O be ? ToObject(V).
	var o = ToObject(v);
	// 3. Return ? O.[[Get]](P, V).
	return o[p];
}

// _ESAbstract.GetMethod
/* global GetV, IsCallable */
// 7.3.9. GetMethod ( V, P )
function GetMethod(V, P) { // eslint-disable-line no-unused-vars
	// 1. Assert: IsPropertyKey(P) is true.
	// 2. Let func be ? GetV(V, P).
	var func = GetV(V, P);
	// 3. If func is either undefined or null, return undefined.
	if (func === null || func === undefined) {
		return undefined;
	}
	// 4. If IsCallable(func) is false, throw a TypeError exception.
	if (IsCallable(func) === false) {
		throw new TypeError('Method not callable: ' + P);
	}
	// 5. Return func.
	return func;
}

// _ESAbstract.Type
// "Type(x)" is used as shorthand for "the type of x"...
function Type(x) { // eslint-disable-line no-unused-vars
	switch (typeof x) {
		case 'undefined':
			return 'undefined';
		case 'boolean':
			return 'boolean';
		case 'number':
			return 'number';
		case 'string':
			return 'string';
		case 'symbol':
			return 'symbol';
		default:
			// typeof null is 'object'
			if (x === null) return 'null';
			// Polyfill.io - This is here because a Symbol polyfill will have a typeof `object`.
			if ('Symbol' in global && x instanceof global.Symbol) return 'symbol';
			return 'object';
	}
}

// _ESAbstract.CreateIterResultObject
/* global Type, CreateDataProperty */
// 7.4.7. CreateIterResultObject ( value, done )
function CreateIterResultObject(value, done) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(done) is Boolean.
	if (Type(done) !== 'boolean') {
		throw new Error();
	}
	// 2. Let obj be ObjectCreate(%ObjectPrototype%).
	var obj = {};
	// 3. Perform CreateDataProperty(obj, "value", value).
	CreateDataProperty(obj, "value", value);
	// 4. Perform CreateDataProperty(obj, "done", done).
	CreateDataProperty(obj, "done", done);
	// 5. Return obj.
	return obj;
}

// _ESAbstract.GetIterator
/* global GetMethod, Symbol, Call, Type, GetV */
// 7.4.1. GetIterator ( obj [ , method ] )
// The abstract operation GetIterator with argument obj and optional argument method performs the following steps:
function GetIterator(obj /*, method */) { // eslint-disable-line no-unused-vars
	// 1. If method is not present, then
		// a. Set method to ? GetMethod(obj, @@iterator).
	var method = arguments.length > 1 ? arguments[1] : GetMethod(obj, Symbol.iterator);
	// 2. Let iterator be ? Call(method, obj).
	var iterator = Call(method, obj);
	// 3. If Type(iterator) is not Object, throw a TypeError exception.
	if (Type(iterator) !== 'object') {
		throw new TypeError('bad iterator');
	}
	// 4. Let nextMethod be ? GetV(iterator, "next").
	var nextMethod = GetV(iterator, "next");
	// 5. Let iteratorRecord be Record {[[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false}.
	var iteratorRecord = Object.create(null);
	iteratorRecord['[[Iterator]]'] = iterator;
	iteratorRecord['[[NextMethod]]'] = nextMethod;
	iteratorRecord['[[Done]]'] = false;
	// 6. Return iteratorRecord.
	return iteratorRecord;
}

// _ESAbstract.GetPrototypeFromConstructor
/* global Get, Type */
// 9.1.14. GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto )
function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) { // eslint-disable-line no-unused-vars
	// 1. Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object. The corresponding object must be an intrinsic that is intended to be used as the [[Prototype]] value of an object.
	// 2. Assert: IsCallable(constructor) is true.
	// 3. Let proto be ? Get(constructor, "prototype").
	var proto = Get(constructor, "prototype");
	// 4. If Type(proto) is not Object, then
	if (Type(proto) !== 'object') {
		// a. Let realm be ? GetFunctionRealm(constructor).
		// b. Set proto to realm's intrinsic object named intrinsicDefaultProto.
		proto = intrinsicDefaultProto;
	}
	// 5. Return proto.
	return proto;
}

// _ESAbstract.OrdinaryCreateFromConstructor
/* global GetPrototypeFromConstructor */
// 9.1.13. OrdinaryCreateFromConstructor ( constructor, intrinsicDefaultProto [ , internalSlotsList ] )
function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) { // eslint-disable-line no-unused-vars
	var internalSlotsList = arguments[2] || {};
	// 1. Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object.
	// The corresponding object must be an intrinsic that is intended to be used as the[[Prototype]] value of an object.

	// 2. Let proto be ? GetPrototypeFromConstructor(constructor, intrinsicDefaultProto).
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);

	// 3. Return ObjectCreate(proto, internalSlotsList).
	// Polyfill.io - We do not pass internalSlotsList to Object.create because Object.create does not use the default ordinary object definitions specified in 9.1.
	var obj = Object.create(proto);
	for (var name in internalSlotsList) {
		if (Object.prototype.hasOwnProperty.call(internalSlotsList, name)) {
			Object.defineProperty(obj, name, {
				configurable: true,
				enumerable: false,
				writable: true,
				value: internalSlotsList[name]
			});
		}
	}
	return obj;
}

// _ESAbstract.IsConstructor
/* global Type */
// 7.2.4. IsConstructor ( argument )
function IsConstructor(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is not Object, return false.
	if (Type(argument) !== 'object') {
		return false;
	}
	// 2. If argument has a [[Construct]] internal method, return true.
	// 3. Return false.

	// Polyfill.io - `new argument` is the only way  to truly test if a function is a constructor.
	// We choose to not use`new argument` because the argument could have side effects when called.
	// Instead we check to see if the argument is a function and if it has a prototype.
	// Arrow functions do not have a [[Construct]] internal method, nor do they have a prototype.
	return typeof argument === 'function' && !!argument.prototype;
}

// _ESAbstract.Construct
/* global IsConstructor, OrdinaryCreateFromConstructor, Call */
// 7.3.13. Construct ( F [ , argumentsList [ , newTarget ]] )
function Construct(F /* [ , argumentsList [ , newTarget ]] */) { // eslint-disable-line no-unused-vars
	// 1. If newTarget is not present, set newTarget to F.
	var newTarget = arguments.length > 2 ? arguments[2] : F;

	// 2. If argumentsList is not present, set argumentsList to a new empty List.
	var argumentsList = arguments.length > 1 ? arguments[1] : [];

	// 3. Assert: IsConstructor(F) is true.
	if (!IsConstructor(F)) {
		throw new TypeError('F must be a constructor.');
	}

	// 4. Assert: IsConstructor(newTarget) is true.
	if (!IsConstructor(newTarget)) {
		throw new TypeError('newTarget must be a constructor.');
	}

	// 5. Return ? F.[[Construct]](argumentsList, newTarget).
	// Polyfill.io - If newTarget is the same as F, it is equivalent to new F(...argumentsList).
	if (newTarget === F) {
		return new (Function.prototype.bind.apply(F, [null].concat(argumentsList)))();
	} else {
		// Polyfill.io - This is mimicking section 9.2.2 step 5.a.
		var obj = OrdinaryCreateFromConstructor(newTarget, Object.prototype);
		return Call(F, obj, argumentsList);
	}
}

// _ESAbstract.IsRegExp
/* global Type, Get, ToBoolean */
// 7.2.8. IsRegExp ( argument )
function IsRegExp(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is not Object, return false.
	if (Type(argument) !== 'object') {
		return false;
	}
	// 2. Let matcher be ? Get(argument, @@match).
	var matcher = 'Symbol' in global && 'match' in global.Symbol ? Get(argument, global.Symbol.match) : undefined;
	// 3. If matcher is not undefined, return ToBoolean(matcher).
	if (matcher !== undefined) {
		return ToBoolean(matcher);
	}
	// 4. If argument has a [[RegExpMatcher]] internal slot, return true.
	try {
		var lastIndex = argument.lastIndex;
		argument.lastIndex = 0;
		RegExp.prototype.exec.call(argument);
		return true;
	} catch (e) {} finally {
		argument.lastIndex = lastIndex;
	}
	// 5. Return false.
	return false;
}

// _ESAbstract.IteratorClose
/* global GetMethod, Type, Call */
// 7.4.6. IteratorClose ( iteratorRecord, completion )
function IteratorClose(iteratorRecord, completion) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(iteratorRecord.[[Iterator]]) is Object.
	if (Type(iteratorRecord['[[Iterator]]']) !== 'object') {
		throw new Error(Object.prototype.toString.call(iteratorRecord['[[Iterator]]']) + 'is not an Object.');
	}
	// 2. Assert: completion is a Completion Record.
	// Polyfill.io - Ignoring this step as there is no way to check if something is a Completion Record in userland JavaScript.

	// 3. Let iterator be iteratorRecord.[[Iterator]].
	var iterator = iteratorRecord['[[Iterator]]'];
	// 4. Let return be ? GetMethod(iterator, "return").
	// Polyfill.io - We name it  returnMethod because return is a keyword and can not be used as an identifier (E.G. variable name, function name etc).
	var returnMethod = GetMethod(iterator, "return");
	// 5. If return is undefined, return Completion(completion).
	if (returnMethod === undefined) {
		return completion;
	}
	// 6. Let innerResult be Call(return, iterator, « »).
	try {
		var innerResult = Call(returnMethod, iterator);
	} catch (error) {
		var innerException = error;
	}
	// 7. If completion.[[Type]] is throw, return Completion(completion).
	if (completion) {
		return completion;
	}
	// 8. If innerResult.[[Type]] is throw, return Completion(innerResult).
	if (innerException) {
		throw innerException;
	}
	// 9. If Type(innerResult.[[Value]]) is not Object, throw a TypeError exception.
	if (Type(innerResult) !== 'object') {
		throw new TypeError("Iterator's return method returned a non-object.");
	}
	// 10. Return Completion(completion).
	return completion;
}

// _ESAbstract.IteratorComplete
/* global Type, ToBoolean, Get */
// 7.4.3 IteratorComplete ( iterResult )
function IteratorComplete(iterResult) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(iterResult) is Object.
	if (Type(iterResult) !== 'object') {
		throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
	}
	// 2. Return ToBoolean(? Get(iterResult, "done")).
	return ToBoolean(Get(iterResult, "done"));
}

// _ESAbstract.IteratorNext
/* global Call, Type */
// 7.4.2. IteratorNext ( iteratorRecord [ , value ] )
function IteratorNext(iteratorRecord /* [, value] */) { // eslint-disable-line no-unused-vars
	// 1. If value is not present, then
	if (arguments.length < 2) {
		// a. Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « »).
		var result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]']);
	// 2. Else,
	} else {
		// a. Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « value »).
		result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]'], [arguments[1]]);
	}
	// 3. If Type(result) is not Object, throw a TypeError exception.
	if (Type(result) !== 'object') {
		throw new TypeError('bad iterator');
	}
	// 4. Return result.
	return result;
}

// _ESAbstract.IteratorStep
/* global IteratorNext, IteratorComplete */
// 7.4.5. IteratorStep ( iteratorRecord )
function IteratorStep(iteratorRecord) { // eslint-disable-line no-unused-vars
	// 1. Let result be ? IteratorNext(iteratorRecord).
	var result = IteratorNext(iteratorRecord);
	// 2. Let done be ? IteratorComplete(result).
	var done = IteratorComplete(result);
	// 3. If done is true, return false.
	if (done === true) {
		return false;
	}
	// 4. Return result.
	return result;
}

// _ESAbstract.IteratorValue
/* global Type, Get */
// 7.4.4 IteratorValue ( iterResult )
function IteratorValue(iterResult) { // eslint-disable-line no-unused-vars
	// Assert: Type(iterResult) is Object.
	if (Type(iterResult) !== 'object') {
		throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
	}
	// Return ? Get(iterResult, "value").
	return Get(iterResult, "value");
}

// _ESAbstract.OrdinaryToPrimitive
/* global Get, IsCallable, Call, Type */
// 7.1.1.1. OrdinaryToPrimitive ( O, hint )
function OrdinaryToPrimitive(O, hint) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: Type(hint) is String and its value is either "string" or "number".
	// 3. If hint is "string", then
	if (hint === 'string') {
		// a. Let methodNames be « "toString", "valueOf" ».
		var methodNames = ['toString', 'valueOf'];
		// 4. Else,
	} else {
		// a. Let methodNames be « "valueOf", "toString" ».
		methodNames = ['valueOf', 'toString'];
	}
	// 5. For each name in methodNames in List order, do
	for (var i = 0; i < methodNames.length; ++i) {
		var name = methodNames[i];
		// a. Let method be ? Get(O, name).
		var method = Get(O, name);
		// b. If IsCallable(method) is true, then
		if (IsCallable(method)) {
			// i. Let result be ? Call(method, O).
			var result = Call(method, O);
			// ii. If Type(result) is not Object, return result.
			if (Type(result) !== 'object') {
				return result;
			}
		}
	}
	// 6. Throw a TypeError exception.
	throw new TypeError('Cannot convert to primitive.');
}

// _ESAbstract.SameValueZero
/* global Type, SameValueNonNumber */
// 7.2.11. SameValueZero ( x, y )
function SameValueZero (x, y) { // eslint-disable-line no-unused-vars
	// 1. If Type(x) is different from Type(y), return false.
	if (Type(x) !== Type(y)) {
		return false;
	}
	// 2. If Type(x) is Number, then
	if (Type(x) === 'number') {
		// a. If x is NaN and y is NaN, return true.
		if (isNaN(x) && isNaN(y)) {
			return true;
		}
		// b. If x is +0 and y is -0, return true.
		if (1/x === Infinity && 1/y === -Infinity) {
			return true;
		}
		// c. If x is -0 and y is +0, return true.
		if (1/x === -Infinity && 1/y === Infinity) {
			return true;
		}
		// d. If x is the same Number value as y, return true.
		if (x === y) {
			return true;
		}
		// e. Return false.
		return false;
	}
	// 3. Return SameValueNonNumber(x, y).
	return SameValueNonNumber(x, y);
}

// _ESAbstract.ToPrimitive
/* global Type, GetMethod, Call, OrdinaryToPrimitive */
// 7.1.1. ToPrimitive ( input [ , PreferredType ] )
function ToPrimitive(input /* [, PreferredType] */) { // eslint-disable-line no-unused-vars
	var PreferredType = arguments.length > 1 ? arguments[1] : undefined;
	// 1. Assert: input is an ECMAScript language value.
	// 2. If Type(input) is Object, then
	if (Type(input) === 'object') {
		// a. If PreferredType is not present, let hint be "default".
		if (arguments.length < 2) {
			var hint = 'default';
			// b. Else if PreferredType is hint String, let hint be "string".
		} else if (PreferredType === String) {
			hint = 'string';
			// c. Else PreferredType is hint Number, let hint be "number".
		} else if (PreferredType === Number) {
			hint = 'number';
		}
		// d. Let exoticToPrim be ? GetMethod(input, @@toPrimitive).
		var exoticToPrim = typeof global.Symbol === 'function' && typeof global.Symbol.toPrimitive === 'symbol' ? GetMethod(input, global.Symbol.toPrimitive) : undefined;
		// e. If exoticToPrim is not undefined, then
		if (exoticToPrim !== undefined) {
			// i. Let result be ? Call(exoticToPrim, input, « hint »).
			var result = Call(exoticToPrim, input, [hint]);
			// ii. If Type(result) is not Object, return result.
			if (Type(result) !== 'object') {
				return result;
			}
			// iii. Throw a TypeError exception.
			throw new TypeError('Cannot convert exotic object to primitive.');
		}
		// f. If hint is "default", set hint to "number".
		if (hint === 'default') {
			hint = 'number';
		}
		// g. Return ? OrdinaryToPrimitive(input, hint).
		return OrdinaryToPrimitive(input, hint);
	}
	// 3. Return input
	return input;
}

// _ESAbstract.ToString
/* global Type, ToPrimitive */
// 7.1.12. ToString ( argument )
// The abstract operation ToString converts argument to a value of type String according to Table 11:
// Table 11: ToString Conversions
/*
|---------------|--------------------------------------------------------|
| Argument Type | Result                                                 |
|---------------|--------------------------------------------------------|
| Undefined     | Return "undefined".                                    |
|---------------|--------------------------------------------------------|
| Null	        | Return "null".                                         |
|---------------|--------------------------------------------------------|
| Boolean       | If argument is true, return "true".                    |
|               | If argument is false, return "false".                  |
|---------------|--------------------------------------------------------|
| Number        | Return NumberToString(argument).                       |
|---------------|--------------------------------------------------------|
| String        | Return argument.                                       |
|---------------|--------------------------------------------------------|
| Symbol        | Throw a TypeError exception.                           |
|---------------|--------------------------------------------------------|
| Object        | Apply the following steps:                             |
|               | Let primValue be ? ToPrimitive(argument, hint String). |
|               | Return ? ToString(primValue).                          |
|---------------|--------------------------------------------------------|
*/
function ToString(argument) { // eslint-disable-line no-unused-vars
	switch(Type(argument)) {
		case 'symbol':
			throw new TypeError('Cannot convert a Symbol value to a string');
			break;
		case 'object':
			var primValue = ToPrimitive(argument, 'string');
			return ToString(primValue);
		default:
			return String(argument);
	}
}

// _mutation
var _mutation = (function () { // eslint-disable-line no-unused-vars

	function isNode(object) {
		// DOM, Level2
		if (typeof Node === 'function') {
			return object instanceof Node;
		}
		// Older browsers, check if it looks like a Node instance)
		return object &&
			typeof object === "object" && 
			object.nodeName && 
			object.nodeType >= 1 &&
			object.nodeType <= 12;
	}

	// http://dom.spec.whatwg.org/#mutation-method-macro
	return function mutation(nodes) {
		if (nodes.length === 1) {
			return isNode(nodes[0]) ? nodes[0] : document.createTextNode(nodes[0] + '');
		}

		var fragment = document.createDocumentFragment();
		for (var i = 0; i < nodes.length; i++) {
			fragment.appendChild(isNode(nodes[i]) ? nodes[i] : document.createTextNode(nodes[i] + ''));

		}
		return fragment;
	};
}());

// Array.of
/* global ArrayCreate, Construct, CreateDataPropertyOrThrow, CreateMethodProperty, IsConstructor, ToString */
// 22.1.2.3. Array.of ( ...items )
CreateMethodProperty(Array, 'of', function of() {
	// 1. Let len be the actual number of arguments passed to this function.
	var len = arguments.length;
	// 2. Let items be the List of arguments passed to this function.
	var items = arguments;
	// 3. Let C be the this value.
	var C = this;
	// 4. If IsConstructor(C) is true, then
	if (IsConstructor(C)) {
		// a. Let A be ? Construct(C, « len »).
		var A = Construct(C, [len]);
		// 5. Else,
	} else {
		// a. Let A be ? ArrayCreate(len).
		var A = ArrayCreate(len);
	}
	// 6. Let k be 0.
	var k = 0;
	// 7. Repeat, while k < len
	while (k < len) {
		// a. Let kValue be items[k].
		var kValue = items[k];
		// b. Let Pk be ! ToString(k).
		var Pk = ToString(k);
		// c. Perform ? CreateDataPropertyOrThrow(A, Pk, kValue).
		CreateDataPropertyOrThrow(A, Pk, kValue);
		// d. Increase k by 1.
		var k = k + 1;

	}
	// 8. Perform ? Set(A, "length", len, true)
	A["length"] = len;
	// 9. Return A.
	return A;
});

// Array.prototype.fill
/* global CreateMethodProperty, Get, ToInteger, ToLength, ToObject, ToString */
// 22.1.3.6. Array.prototype.fill ( value [ , start [ , end ] ] )
CreateMethodProperty(Array.prototype, 'fill', function fill(value /* [ , start [ , end ] ] */) {
	var start = arguments[1];
	var end = arguments[2];
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. Let relativeStart be ? ToInteger(start).
	var relativeStart = ToInteger(start);
	// 4. If relativeStart < 0, let k be max((len + relativeStart), 0); else let k be min(relativeStart, len)
	var k = relativeStart < 0 ? Math.max((len + relativeStart), 0) : Math.min(relativeStart, len);
	// 5. If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
	var relativeEnd = end === undefined ? len : ToInteger(end);
	// 6. If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
	var final = relativeEnd < 0 ? Math.max((len + relativeEnd), 0) : Math.min(relativeEnd, len);
	// 7. Repeat, while k < final
	while (k < final) {
		// a. Let Pk be ! ToString(k).
		var Pk = ToString(k);
		// b. Perform ? Set(O, Pk, value, true).
		O[Pk] = value;
		// c. Increase k by 1.
		k = k + 1;
	}
	// 8. Return O.
	return O;
});

// DocumentFragment.prototype.append
DocumentFragment.prototype.append = function append() {
	this.appendChild(_mutation(arguments));
};

// DocumentFragment.prototype.prepend
DocumentFragment.prototype.prepend = function prepend() {
	this.insertBefore(_mutation(arguments), this.firstChild);
};

// DOMTokenList
(function (global) {
	var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

	if (
			!nativeImpl ||
			(
				!!document.createElementNS &&
				!!document.createElementNS('http://www.w3.org/2000/svg', 'svg') &&
				!(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)
			)
		) {
		global.DOMTokenList = _DOMTokenList;
	}

	// Add second argument to native DOMTokenList.toggle() if necessary
	(function () {
		var e = document.createElement('span');
		if (!('classList' in e)) return;
		e.classList.toggle('x', false);
		if (!e.classList.contains('x')) return;
		e.classList.constructor.prototype.toggle = function toggle(token /*, force*/) {
			var force = arguments[1];
			if (force === undefined) {
				var add = !this.contains(token);
				this[add ? 'add' : 'remove'](token);
				return add;
			}
			force = !!force;
			this[force ? 'add' : 'remove'](token);
			return force;
		};
	}());

	// Add multiple arguments to native DOMTokenList.add() if necessary
	(function () {
		var e = document.createElement('span');
		if (!('classList' in e)) return;
		e.classList.add('a', 'b');
		if (e.classList.contains('b')) return;
		var native = e.classList.constructor.prototype.add;
		e.classList.constructor.prototype.add = function () {
			var args = arguments;
			var l = arguments.length;
			for (var i = 0; i < l; i++) {
				native.call(this, args[i]);
			}
		};
	}());

	// Add multiple arguments to native DOMTokenList.remove() if necessary
	(function () {
		var e = document.createElement('span');
		if (!('classList' in e)) return;
		e.classList.add('a');
		e.classList.add('b');
		e.classList.remove('a', 'b');
		if (!e.classList.contains('b')) return;
		var native = e.classList.constructor.prototype.remove;
		e.classList.constructor.prototype.remove = function () {
			var args = arguments;
			var l = arguments.length;
			for (var i = 0; i < l; i++) {
				native.call(this, args[i]);
			}
		};
	}());

}(this));

// Element.prototype.after
Document.prototype.after = Element.prototype.after = function after() {
	if (this.parentNode) {
		var args = Array.prototype.slice.call(arguments),
				viableNextSibling = this.nextSibling,
				idx = viableNextSibling ? args.indexOf(viableNextSibling) : -1;

		while (idx !== -1) {
			viableNextSibling = viableNextSibling.nextSibling;
			if (!viableNextSibling) {
				break;
			}
			idx = args.indexOf(viableNextSibling);
		}
		
		this.parentNode.insertBefore(_mutation(arguments), viableNextSibling);
	}
};

// Not all UAs support the Text constructor.  Polyfill on the Text constructor only where it exists
// TODO: Add a polyfill for the Text constructor, and make it a dependency of this polyfill.
if ("Text" in global) {
	Text.prototype.after = Element.prototype.after;
}

// Element.prototype.append
Document.prototype.append = Element.prototype.append = function append() {
	this.appendChild(_mutation(arguments));
};

// Element.prototype.before
Document.prototype.before = Element.prototype.before = function before() {
	if (this.parentNode) {
		var args = Array.prototype.slice.call(arguments),
			viablePreviousSibling = this.previousSibling,
			idx = viablePreviousSibling ? args.indexOf(viablePreviousSibling) : -1;

		while (idx !== -1) {
			viablePreviousSibling = viablePreviousSibling.previousSibling;
			if (!viablePreviousSibling) {
				break;
			}
			idx = args.indexOf(viablePreviousSibling);
		}

		this.parentNode.insertBefore(
			_mutation(arguments),
			viablePreviousSibling ? viablePreviousSibling.nextSibling : this.parentNode.firstChild
		);
	}
};

// Not all UAs support the Text constructor.  Polyfill on the Text constructor only where it exists
// TODO: Add a polyfill for the Text constructor, and make it a dependency of this polyfill.
if ("Text" in global) {
	Text.prototype.before = Element.prototype.before;
}

// Element.prototype.classList
/*
Copyright (c) 2016, John Gardner

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
(function (global) {
	var dpSupport = true;
	var defineGetter = function (object, name, fn, configurable) {
		if (Object.defineProperty)
			Object.defineProperty(object, name, {
				configurable: false === dpSupport ? true : !!configurable,
				get: fn
			});

		else object.__defineGetter__(name, fn);
	};
	/** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
	try {
		defineGetter({}, "support");
	}
	catch (e) {
		dpSupport = false;
	}
	/** Polyfills a property with a DOMTokenList */
	var addProp = function (o, name, attr) {

		defineGetter(o.prototype, name, function () {
			var tokenList;

			var THIS = this,

			/** Prevent this from firing twice for some reason. What the hell, IE. */
			gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
			if(THIS[gibberishProperty]) return tokenList;
			THIS[gibberishProperty] = true;

			/**
			 * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
			 *
			 * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
			 * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
			 * element instead, this would conflict with element types which use indexed properties (such as forms and
			 * select lists).
			 */
			if (false === dpSupport) {

				var visage;
				var mirror = addProp.mirror || document.createElement("div");
				var reflections = mirror.childNodes;
				var l = reflections.length;

				for (var i = 0; i < l; ++i)
					if (reflections[i]._R === THIS) {
						visage = reflections[i];
						break;
					}

				/** Couldn't find an element's reflection inside the mirror. Materialise one. */
				visage || (visage = mirror.appendChild(document.createElement("div")));

				tokenList = DOMTokenList.call(visage, THIS, attr);
			} else tokenList = new DOMTokenList(THIS, attr);

			defineGetter(THIS, name, function () {
				return tokenList;
			});
			delete THIS[gibberishProperty];

			return tokenList;
		}, true);
	};

	addProp(global.Element, "classList", "className");
	addProp(global.HTMLElement, "classList", "className");
	addProp(global.HTMLLinkElement, "relList", "rel");
	addProp(global.HTMLAnchorElement, "relList", "rel");
	addProp(global.HTMLAreaElement, "relList", "rel");
}(this));

// Element.prototype.matches
Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {

	var element = this;
	var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
	var index = 0;

	while (elements[index] && elements[index] !== element) {
		++index;
	}

	return !!elements[index];
};

// Element.prototype.closest
Element.prototype.closest = function closest(selector) {
	var node = this;

	while (node) {
		if (node.matches(selector)) return node;
		else node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
	}

	return null;
};

// Element.prototype.prepend
Document.prototype.prepend = Element.prototype.prepend = function prepend() {
	this.insertBefore(_mutation(arguments), this.firstChild);
};

// Element.prototype.remove
Document.prototype.remove = Element.prototype.remove = function remove() {
	if (this.parentNode) {
		this.parentNode.removeChild(this);
	}
};

// Not all UAs support the Text constructor.  Polyfill on the Text constructor only where it exists
// TODO: Add a polyfill for the Text constructor, and make it a dependency of this polyfill.
if ("Text" in global) {
	Text.prototype.remove = Element.prototype.remove;
}

// Element.prototype.replaceWith
Document.prototype.replaceWith = Element.prototype.replaceWith = function replaceWith() {
	if (this.parentNode) {
		this.parentNode.replaceChild(_mutation(arguments), this);
	}
};

// Not all UAs support the Text constructor.  Polyfill on the Text constructor only where it exists
// TODO: Add a polyfill for the Text constructor, and make it a dependency of this polyfill.
if ('Text' in global) {
	Text.prototype.replaceWith = Element.prototype.replaceWith;
}

// Event
(function () {
	var unlistenableWindowEvents = {
		click: 1,
		dblclick: 1,
		keyup: 1,
		keypress: 1,
		keydown: 1,
		mousedown: 1,
		mouseup: 1,
		mousemove: 1,
		mouseover: 1,
		mouseenter: 1,
		mouseleave: 1,
		mouseout: 1,
		storage: 1,
		storagecommit: 1,
		textinput: 1
	};

	// This polyfill depends on availability of `document` so will not run in a worker
	// However, we asssume there are no browsers with worker support that lack proper
	// support for `Event` within the worker
	if (typeof document === 'undefined' || typeof window === 'undefined') return;

	function indexOf(array, element) {
		var
		index = -1,
		length = array.length;

		while (++index < length) {
			if (index in array && array[index] === element) {
				return index;
			}
		}

		return -1;
	}

	var existingProto = (window.Event && window.Event.prototype) || null;
	function Event(type, eventInitDict) {
		if (!type) {
			throw new Error('Not enough arguments');
		}

		var event;
		// Shortcut if browser supports createEvent
		if ('createEvent' in document) {
			event = document.createEvent('Event');
			var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
			var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;

			event.initEvent(type, bubbles, cancelable);

			return event;
		}

		event = document.createEventObject();

		event.type = type;
		event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
		event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;

		return event;
	};
	Event.NONE = 0;
	Event.CAPTURING_PHASE = 1;
	Event.AT_TARGET = 2;
	Event.BUBBLING_PHASE = 3;
	window.Event = Window.prototype.Event = Event;
	if (existingProto) {
		Object.defineProperty(window.Event, 'prototype', {
			configurable: false,
			enumerable: false,
			writable: true,
			value: existingProto
		});
	}

	if (!('createEvent' in document)) {
		window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
			var
			element = this,
			type = arguments[0],
			listener = arguments[1];

			if (element === window && type in unlistenableWindowEvents) {
				throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
			}

			if (!element._events) {
				element._events = {};
			}

			if (!element._events[type]) {
				element._events[type] = function (event) {
					var
					list = element._events[event.type].list,
					events = list.slice(),
					index = -1,
					length = events.length,
					eventElement;

					event.preventDefault = function preventDefault() {
						if (event.cancelable !== false) {
							event.returnValue = false;
						}
					};

					event.stopPropagation = function stopPropagation() {
						event.cancelBubble = true;
					};

					event.stopImmediatePropagation = function stopImmediatePropagation() {
						event.cancelBubble = true;
						event.cancelImmediate = true;
					};

					event.currentTarget = element;
					event.relatedTarget = event.fromElement || null;
					event.target = event.target || event.srcElement || element;
					event.timeStamp = new Date().getTime();

					if (event.clientX) {
						event.pageX = event.clientX + document.documentElement.scrollLeft;
						event.pageY = event.clientY + document.documentElement.scrollTop;
					}

					while (++index < length && !event.cancelImmediate) {
						if (index in events) {
							eventElement = events[index];

							if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
								eventElement.call(element, event);
							}
						}
					}
				};

				element._events[type].list = [];

				if (element.attachEvent) {
					element.attachEvent('on' + type, element._events[type]);
				}
			}

			element._events[type].list.push(listener);
		};

		window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
			var
			element = this,
			type = arguments[0],
			listener = arguments[1],
			index;

			if (element._events && element._events[type] && element._events[type].list) {
				index = indexOf(element._events[type].list, listener);

				if (index !== -1) {
					element._events[type].list.splice(index, 1);

					if (!element._events[type].list.length) {
						if (element.detachEvent) {
							element.detachEvent('on' + type, element._events[type]);
						}
						delete element._events[type];
					}
				}
			}
		};

		window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
			if (!arguments.length) {
				throw new Error('Not enough arguments');
			}

			if (!event || typeof event.type !== 'string') {
				throw new Error('DOM Events Exception 0');
			}

			var element = this, type = event.type;

			try {
				if (!event.bubbles) {
					event.cancelBubble = true;

					var cancelBubbleEvent = function (event) {
						event.cancelBubble = true;

						(element || window).detachEvent('on' + type, cancelBubbleEvent);
					};

					this.attachEvent('on' + type, cancelBubbleEvent);
				}

				this.fireEvent('on' + type, event);
			} catch (error) {
				event.target = element;

				do {
					event.currentTarget = element;

					if ('_events' in element && typeof element._events[type] === 'function') {
						element._events[type].call(element, event);
					}

					if (typeof element['on' + type] === 'function') {
						element['on' + type].call(element, event);
					}

					element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
				} while (element && !event.cancelBubble);
			}

			return true;
		};

		// Add the DOMContentLoaded Event
		document.attachEvent('onreadystatechange', function() {
			if (document.readyState === 'complete') {
				document.dispatchEvent(new Event('DOMContentLoaded', {
					bubbles: true
				}));
			}
		});
	}
}());

// CustomEvent
global.CustomEvent = function CustomEvent(type, eventInitDict) {
	if (!type) {
		throw Error('TypeError: Failed to construct "CustomEvent": An event name must be provided.');
	}

	var event;
	eventInitDict = eventInitDict || {bubbles: false, cancelable: false, detail: null};

	if ('createEvent' in document) {
		try {
			event = document.createEvent('CustomEvent');
			event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
		} catch (error) {
			// for browsers which don't support CustomEvent at all, we use a regular event instead
			event = document.createEvent('Event');
			event.initEvent(type, eventInitDict.bubbles, eventInitDict.cancelable);
			event.detail = eventInitDict.detail;
		}
	} else {

		// IE8
		event = new Event(type, eventInitDict);
		event.detail = eventInitDict && eventInitDict.detail || null;
	}
	return event;
};

CustomEvent.prototype = Event.prototype;

// Math.log10
/* global CreateMethodProperty */
// 20.2.2.22. Math.log10 ( x )
CreateMethodProperty(Math, 'log10', function log10(x) {
	return Math.log(x) / Math.LN10;
});

// Node.prototype.contains
(function() {

	function contains(node) {
		if (!(0 in arguments)) {
			throw new TypeError('1 argument is required');
		}

		do {
			if (this === node) {
				return true;
			}
		} while (node = node && node.parentNode);

		return false;
	}

	// IE
	if ('HTMLElement' in global && 'contains' in HTMLElement.prototype) {
		try {
			delete HTMLElement.prototype.contains;
		} catch (e) {}
	}

	if ('Node' in global) {
		Node.prototype.contains = contains;
	} else {
		document.contains = Element.prototype.contains = contains;
	}

}());

// Number.isNaN
/* global CreateMethodProperty, Type */
(function () {
	var that = global;
	// 20.1.2.4. Number.isNaN ( number )
	CreateMethodProperty(Number, 'isNaN', function isNaN(number) {
		// 1. If Type(number) is not Number, return false.
		if (Type(number) !== 'number') {
			return false;
		}
		// 2. If number is NaN, return true.
		if (that.isNaN(number)) {
			return true;
		}
		// 3. Otherwise, return false.
		return false;
	});
}());

// Object.assign
/* global CreateMethodProperty, Get, ToObject */
// 19.1.2.1 Object.assign ( target, ...sources )
CreateMethodProperty(Object, 'assign', function assign(target, source) { // eslint-disable-line no-unused-vars
	// 1. Let to be ? ToObject(target).
	var to = ToObject(target);

	// 2. If only one argument was passed, return to.
	if (arguments.length === 1) {
		return to;
	}

	// 3. Let sources be the List of argument values starting with the second argument
	var sources = Array.prototype.slice.call(arguments, 1);

	// 4. For each element nextSource of sources, in ascending index order, do
	var index1;
	var index2;
	var keys;
	var from;
	for (index1 = 0; index1 < sources.length; index1++) {
		var nextSource = sources[index1];
		// a. If nextSource is undefined or null, let keys be a new empty List.
		if (nextSource === undefined || nextSource === null) {
			keys = [];
			// b. Else,
		} else {
			// i. Let from be ! ToObject(nextSource).
			from = ToObject(nextSource);
			// ii. Let keys be ? from.[[OwnPropertyKeys]]().
			/*
				This step in our polyfill is not complying with the specification.
				[[OwnPropertyKeys]] is meant to return ALL keys, including non-enumerable and symbols.
				TODO: When we have Reflect.ownKeys, use that instead as it is the userland equivalent of [[OwnPropertyKeys]].
			*/
			keys = Object.keys(from);
		}

		// c. For each element nextKey of keys in List order, do
		for (index2 = 0; index2 < keys.length; index2++) {
			var nextKey = keys[index2];
			var enumerable;
			try {
				// i. Let desc be ? from.[[GetOwnProperty]](nextKey).
				var desc = Object.getOwnPropertyDescriptor(from, nextKey);
				// ii. If desc is not undefined and desc.[[Enumerable]] is true, then
				enumerable = desc !== undefined && desc.enumerable === true;
			} catch (e) {
				// Polyfill.io - We use Object.prototype.propertyIsEnumerable as a fallback
				// because `Object.getOwnPropertyDescriptor(window.location, 'hash')` causes Internet Explorer 11 to crash.
				enumerable = Object.prototype.propertyIsEnumerable.call(from, nextKey);
			}
			if (enumerable) {
				// 1. Let propValue be ? Get(from, nextKey).
				var propValue = Get(from, nextKey);
				// 2. Perform ? Set(to, nextKey, propValue, true).
				to[nextKey] = propValue;
			}
		}
	}
	// 5. Return to.
	return to;
});

// Promise
!function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var e={};t.m=n,t.c=e,t.i=function(n){return n},t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=100)}({100:/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
function(n,t,e){(function(n){var t=e(/*! ./yaku */5);try{n.Promise=t,window.Promise=t}catch(r){}}).call(t,e(/*! ./../~/webpack/buildin/global.js */2))},2:/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
function(n,t){var e;e=function(){return this}();try{e=e||Function("return this")()||(0,eval)("this")}catch(r){"object"==typeof window&&(e=window)}n.exports=e},5:/*!*********************!*\
  !*** ./src/yaku.js ***!
  \*********************/
function(n,t,e){(function(t){!function(){"use strict";function e(){return rn[q][B]||D}function r(n){return n&&"object"==typeof n}function o(n){return"function"==typeof n}function i(n,t){return n instanceof t}function u(n){return i(n,M)}function c(n,t,e){if(!t(n))throw h(e)}function f(){try{return R.apply(S,arguments)}catch(n){return nn.e=n,nn}}function s(n,t){return R=n,S=t,f}function a(n,t){function e(){for(var e=0;e<o;)t(r[e],r[e+1]),r[e++]=P,r[e++]=P;o=0,r.length>n&&(r.length=n)}var r=A(n),o=0;return function(n,t){r[o++]=n,r[o++]=t,2===o&&rn.nextTick(e)}}function l(n,t){var e,r,u,c,f=0;if(!n)throw h(Q);var a=n[rn[q][z]];if(o(a))r=a.call(n);else{if(!o(n.next)){if(i(n,A)){for(e=n.length;f<e;)t(n[f],f++);return f}throw h(Q)}r=n}for(;!(u=r.next()).done;)if((c=s(t)(u.value,f++))===nn)throw o(r[G])&&r[G](),c.e;return f}function h(n){return new TypeError(n)}function v(n){return(n?"":V)+(new M).stack}function _(n,t){var e="on"+n.toLowerCase(),r=O[e];H&&H.listeners(n).length?n===Z?H.emit(n,t._v,t):H.emit(n,t):r?r({reason:t._v,promise:t}):rn[n](t._v,t)}function p(n){return n&&n._s}function d(n){if(p(n))return new n(tn);var t,e,r;return t=new n(function(n,o){if(t)throw h();e=n,r=o}),c(e,o),c(r,o),t}function w(n,t){var e=!1;return function(r){e||(e=!0,L&&(n[N]=v(!0)),t===Y?k(n,r):x(n,t,r))}}function y(n,t,e,r){return o(e)&&(t._onFulfilled=e),o(r)&&(n[J]&&_(X,n),t._onRejected=r),L&&(t._p=n),n[n._c++]=t,n._s!==$&&on(n,t),t}function m(n){if(n._umark)return!0;n._umark=!0;for(var t,e=0,r=n._c;e<r;)if(t=n[e++],t._onRejected||m(t))return!0}function j(n,t){function e(n){return r.push(n.replace(/^\s+|\s+$/g,""))}var r=[];return L&&(t[N]&&e(t[N]),function o(n){n&&K in n&&(o(n._next),e(n[K]+""),o(n._p))}(t)),(n&&n.stack?n.stack:n)+("\n"+r.join("\n")).replace(en,"")}function g(n,t){return n(t)}function x(n,t,e){var r=0,o=n._c;if(n._s===$)for(n._s=t,n._v=e,t===U&&(L&&u(e)&&(e.longStack=j(e,n)),un(n));r<o;)on(n,n[r++]);return n}function k(n,t){if(t===n&&t)return x(n,U,h(W)),n;if(t!==C&&(o(t)||r(t))){var e=s(b)(t);if(e===nn)return x(n,U,e.e),n;o(e)?(L&&p(t)&&(n._next=t),p(t)?T(n,t,e):rn.nextTick(function(){T(n,t,e)})):x(n,Y,t)}else x(n,Y,t);return n}function b(n){return n.then}function T(n,t,e){var r=s(e,t)(function(e){t&&(t=C,k(n,e))},function(e){t&&(t=C,x(n,U,e))});r===nn&&t&&(x(n,U,r.e),t=C)}var P,R,S,C=null,F="object"==typeof self,O=F?self:t,E=O.Promise,H=O.process,I=O.console,L=!1,A=Array,M=Error,U=1,Y=2,$=3,q="Symbol",z="iterator",B="species",D=q+"("+B+")",G="return",J="_uh",K="_pt",N="_st",Q="Invalid argument",V="\nFrom previous ",W="Chaining cycle detected for promise",X="rejectionHandled",Z="unhandledRejection",nn={e:C},tn=function(){},en=/^.+\/node_modules\/yaku\/.+\n?/gm,rn=function(n){var t,e=this;if(!r(e)||e._s!==P)throw h("Invalid this");if(e._s=$,L&&(e[K]=v()),n!==tn){if(!o(n))throw h(Q);t=s(n)(w(e,Y),w(e,U)),t===nn&&x(e,U,t.e)}};rn["default"]=rn,function(n,t){for(var e in t)n[e]=t[e]}(rn.prototype,{then:function(n,t){if(this._s===undefined)throw h();return y(this,d(rn.speciesConstructor(this,rn)),n,t)},"catch":function(n){return this.then(P,n)},"finally":function(n){return this.then(function(t){return rn.resolve(n()).then(function(){return t})},function(t){return rn.resolve(n()).then(function(){throw t})})},_c:0,_p:C}),rn.resolve=function(n){return p(n)?n:k(d(this),n)},rn.reject=function(n){return x(d(this),U,n)},rn.race=function(n){var t=this,e=d(t),r=function(n){x(e,Y,n)},o=function(n){x(e,U,n)},i=s(l)(n,function(n){t.resolve(n).then(r,o)});return i===nn?t.reject(i.e):e},rn.all=function(n){function t(n){x(o,U,n)}var e,r=this,o=d(r),i=[];return(e=s(l)(n,function(n,u){r.resolve(n).then(function(n){i[u]=n,--e||x(o,Y,i)},t)}))===nn?r.reject(e.e):(e||x(o,Y,[]),o)},rn.Symbol=O[q]||{},s(function(){Object.defineProperty(rn,e(),{get:function(){return this}})})(),rn.speciesConstructor=function(n,t){var r=n.constructor;return r?r[e()]||t:t},rn.unhandledRejection=function(n,t){I&&I.error("Uncaught (in promise)",L?t.longStack:j(n,t))},rn.rejectionHandled=tn,rn.enableLongStackTrace=function(){L=!0},rn.nextTick=F?function(n){E?new E(function(n){n()}).then(n):setTimeout(n)}:H.nextTick,rn._s=1;var on=a(999,function(n,t){var e,r;return(r=n._s!==U?t._onFulfilled:t._onRejected)===P?void x(t,n._s,n._v):(e=s(g)(r,n._v))===nn?void x(t,U,e.e):void k(t,e)}),un=a(9,function(n){m(n)||(n[J]=1,_(Z,n))});try{n.exports=rn}catch(cn){O.Yaku=rn}}()}).call(t,e(/*! ./../~/webpack/buildin/global.js */2))}});
// fetch
(function(self) {
  'use strict';

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

// String.prototype.endsWith
/* global CreateMethodProperty, IsRegExp, RequireObjectCoercible, ToInteger, ToString */
// 21.1.3.6. String.prototype.endsWith ( searchString [ , endPosition ] )
CreateMethodProperty(String.prototype, 'endsWith', function endsWith(searchString /* [ , endPosition ] */) {
	'use strict';
	var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	// 3. Let isRegExp be ? IsRegExp(searchString).
	var isRegExp = IsRegExp(searchString);
	// 4. If isRegExp is true, throw a TypeError exception.
	if (isRegExp) {
		throw new TypeError('First argument to String.prototype.endsWith must not be a regular expression');
	}
	// 5. Let searchStr be ? ToString(searchString).
	var searchStr = ToString(searchString);
	// 6. Let len be the length of S.
	var len = S.length;
	// 7. If endPosition is undefined, let pos be len, else let pos be ? ToInteger(endPosition).
	var pos = endPosition === undefined ? len : ToInteger(endPosition);
	// 8. Let end be min(max(pos, 0), len).
	var end = Math.min(Math.max(pos, 0), len);
	// 9. Let searchLength be the length of searchStr.
	var searchLength = searchStr.length;
	// 10. Let start be end - searchLength.
	var start = end - searchLength;
	// 11. If start is less than 0, return false.
	if (start < 0) {
		return false;
	}
	// 12. If the sequence of elements of S starting at start of length searchLength is the same as the full element sequence of searchStr, return true.
	if (S.substr(start, searchLength) === searchStr) {
		return true;
	 }
	// 13. Otherwise, return false.
	return false;
});

// String.prototype.includes
/* global CreateMethodProperty, IsRegExp, RequireObjectCoercible, ToInteger, ToString */
// 21.1.3.7. String.prototype.includes ( searchString [ , position ] )
CreateMethodProperty(String.prototype, 'includes', function includes(searchString /* [ , position ] */) {
	'use strict';
	var position = arguments.length > 1 ? arguments[1] : undefined;
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	// 3. Let isRegExp be ? IsRegExp(searchString).
	var isRegExp = IsRegExp(searchString);
	// 4. If isRegExp is true, throw a TypeError exception.
	if (isRegExp) {
		throw new TypeError('First argument to String.prototype.includes must not be a regular expression');
	}
	// 5. Let searchStr be ? ToString(searchString).
	var searchStr = ToString(searchString);
	// 6. Let pos be ? ToInteger(position). (If position is undefined, this step produces the value 0.)
	var pos = ToInteger(position);
	// 7. Let len be the length of S.
	var len = S.length;
	// 8. Let start be min(max(pos, 0), len).
	var start = Math.min(Math.max(pos, 0), len);
	// 9. Let searchLen be the length of searchStr.
	// var searchLength = searchStr.length;
	// 10. If there exists any integer k not smaller than start such that k + searchLen is not greater than len, and for all nonnegative integers j less than searchLen, the code unit at index k+j within S is the same as the code unit at index j within searchStr, return true; but if there is no such integer k, return false.
	return String.prototype.indexOf.call(S, searchStr, start) !== -1;
});

// String.prototype.startsWith
/* global CreateMethodProperty, IsRegExp, RequireObjectCoercible, ToInteger, ToString */
// 21.1.3.20. String.prototype.startsWith ( searchString [ , position ] )
CreateMethodProperty(String.prototype, 'startsWith', function startsWith(searchString /* [ , position ] */) {
	'use strict';
	var position = arguments.length > 1 ? arguments[1] : undefined;
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	// 3. Let isRegExp be ? IsRegExp(searchString).
	var isRegExp = IsRegExp(searchString);
	// 4. If isRegExp is true, throw a TypeError exception.
	if (isRegExp) {
		throw new TypeError('First argument to String.prototype.startsWith must not be a regular expression');
	}
	// 5. Let searchStr be ? ToString(searchString).
	var searchStr = ToString(searchString);
	// 6. Let pos be ? ToInteger(position). (If position is undefined, this step produces the value 0.)
	var pos = ToInteger(position);
	// 7. Let len be the length of S.
	var len = S.length;
	// 8. Let start be min(max(pos, 0), len).
	var start = Math.min(Math.max(pos, 0), len);
	// 9. Let searchLength be the length of searchStr.
	var searchLength = searchStr.length;
	// 10. If searchLength+start is greater than len, return false.
	if (searchLength + start > len) {
		return false;
	}
	// 11. If the sequence of elements of S starting at start of length searchLength is the same as the full element sequence of searchStr, return true.
	if (S.substr(start).indexOf(searchString) === 0) {
		return true;
	}
	// 12. Otherwise, return false.
	return false;
});

// Symbol
// A modification of https://github.com/WebReflection/get-own-property-symbols
// (C) Andrea Giammarchi - MIT Licensed

(function (Object, GOPS, global) {

	var	setDescriptor;
	var id = 0;
	var random = '' + Math.random();
	var prefix = '__\x01symbol:';
	var prefixLength = prefix.length;
	var internalSymbol = '__\x01symbol@@' + random;
	var DP = 'defineProperty';
	var DPies = 'defineProperties';
	var GOPN = 'getOwnPropertyNames';
	var GOPD = 'getOwnPropertyDescriptor';
	var PIE = 'propertyIsEnumerable';
	var ObjectProto = Object.prototype;
	var hOP = ObjectProto.hasOwnProperty;
	var pIE = ObjectProto[PIE];
	var toString = ObjectProto.toString;
	var concat = Array.prototype.concat;
	var cachedWindowNames = typeof window === 'object' ? Object.getOwnPropertyNames(window) : [];
	var nGOPN = Object[GOPN];
	var gOPN = function getOwnPropertyNames (obj) {
		if (toString.call(obj) === '[object Window]') {
			try {
				return nGOPN(obj);
			} catch (e) {
				// IE bug where layout engine calls userland gOPN for cross-domain `window` objects
				return concat.call([], cachedWindowNames);
			}
		}
		return nGOPN(obj);
	};
	var gOPD = Object[GOPD];
	var create = Object.create;
	var keys = Object.keys;
	var freeze = Object.freeze || Object;
	var defineProperty = Object[DP];
	var $defineProperties = Object[DPies];
	var descriptor = gOPD(Object, GOPN);
	var addInternalIfNeeded = function (o, uid, enumerable) {
		if (!hOP.call(o, internalSymbol)) {
			try {
				defineProperty(o, internalSymbol, {
					enumerable: false,
					configurable: false,
					writable: false,
					value: {}
				});
			} catch (e) {
				o[internalSymbol] = {};
			}
		}
		o[internalSymbol]['@@' + uid] = enumerable;
	};
	var createWithSymbols = function (proto, descriptors) {
		var self = create(proto);
		gOPN(descriptors).forEach(function (key) {
			if (propertyIsEnumerable.call(descriptors, key)) {
				$defineProperty(self, key, descriptors[key]);
			}
		});
		return self;
	};
	var copyAsNonEnumerable = function (descriptor) {
		var newDescriptor = create(descriptor);
		newDescriptor.enumerable = false;
		return newDescriptor;
	};
	var get = function get(){};
	var onlyNonSymbols = function (name) {
		return name != internalSymbol &&
			!hOP.call(source, name);
	};
	var onlySymbols = function (name) {
		return name != internalSymbol &&
			hOP.call(source, name);
	};
	var propertyIsEnumerable = function propertyIsEnumerable(key) {
		var uid = '' + key;
		return onlySymbols(uid) ? (
			hOP.call(this, uid) &&
			this[internalSymbol]['@@' + uid]
		) : pIE.call(this, key);
	};
	var setAndGetSymbol = function (uid) {
		var descriptor = {
			enumerable: false,
			configurable: true,
			get: get,
			set: function (value) {
			setDescriptor(this, uid, {
				enumerable: false,
				configurable: true,
				writable: true,
				value: value
			});
			addInternalIfNeeded(this, uid, true);
			}
		};
		try {
			defineProperty(ObjectProto, uid, descriptor);
		} catch (e) {
			ObjectProto[uid] = descriptor.value;
		}
		return freeze(source[uid] = defineProperty(
			Object(uid),
			'constructor',
			sourceConstructor
		));
	};
	var Symbol = function Symbol() {
		var description = arguments[0];
		if (this instanceof Symbol) {
			throw new TypeError('Symbol is not a constructor');
		}
		return setAndGetSymbol(
			prefix.concat(description || '', random, ++id)
		);
		};
	var source = create(null);
	var sourceConstructor = {value: Symbol};
	var sourceMap = function (uid) {
		return source[uid];
		};
	var $defineProperty = function defineProp(o, key, descriptor) {
		var uid = '' + key;
		if (onlySymbols(uid)) {
			setDescriptor(o, uid, descriptor.enumerable ?
				copyAsNonEnumerable(descriptor) : descriptor);
			addInternalIfNeeded(o, uid, !!descriptor.enumerable);
		} else {
			defineProperty(o, key, descriptor);
		}
		return o;
	};

	var onlyInternalSymbols = function (obj) {
		return function (name) {
			return hOP.call(obj, internalSymbol) && hOP.call(obj[internalSymbol], '@@' + name);
		};
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
		return gOPN(o).filter(o === ObjectProto ? onlyInternalSymbols(o) : onlySymbols).map(sourceMap);
		}
	;

	descriptor.value = $defineProperty;
	defineProperty(Object, DP, descriptor);

	descriptor.value = $getOwnPropertySymbols;
	defineProperty(Object, GOPS, descriptor);

	descriptor.value = function getOwnPropertyNames(o) {
		return gOPN(o).filter(onlyNonSymbols);
	};
	defineProperty(Object, GOPN, descriptor);

	descriptor.value = function defineProperties(o, descriptors) {
		var symbols = $getOwnPropertySymbols(descriptors);
		if (symbols.length) {
		keys(descriptors).concat(symbols).forEach(function (uid) {
			if (propertyIsEnumerable.call(descriptors, uid)) {
			$defineProperty(o, uid, descriptors[uid]);
			}
		});
		} else {
		$defineProperties(o, descriptors);
		}
		return o;
	};
	defineProperty(Object, DPies, descriptor);

	descriptor.value = propertyIsEnumerable;
	defineProperty(ObjectProto, PIE, descriptor);

	descriptor.value = Symbol;
	defineProperty(global, 'Symbol', descriptor);

	// defining `Symbol.for(key)`
	descriptor.value = function (key) {
		var uid = prefix.concat(prefix, key, random);
		return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
	};
	defineProperty(Symbol, 'for', descriptor);

	// defining `Symbol.keyFor(symbol)`
	descriptor.value = function (symbol) {
		if (onlyNonSymbols(symbol))
		throw new TypeError(symbol + ' is not a symbol');
		return hOP.call(source, symbol) ?
		symbol.slice(prefixLength * 2, -random.length) :
		void 0
		;
	};
	defineProperty(Symbol, 'keyFor', descriptor);

	descriptor.value = function getOwnPropertyDescriptor(o, key) {
		var descriptor = gOPD(o, key);
		if (descriptor && onlySymbols(key)) {
		descriptor.enumerable = propertyIsEnumerable.call(o, key);
		}
		return descriptor;
	};
	defineProperty(Object, GOPD, descriptor);

	descriptor.value = function (proto, descriptors) {
		return arguments.length === 1 || typeof descriptors === "undefined" ?
		create(proto) :
		createWithSymbols(proto, descriptors);
	};
	defineProperty(Object, 'create', descriptor);

	descriptor.value = function () {
		var str = toString.call(this);
		return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
	};
	defineProperty(ObjectProto, 'toString', descriptor);


	setDescriptor = function (o, key, descriptor) {
		var protoDescriptor = gOPD(ObjectProto, key);
		delete ObjectProto[key];
		defineProperty(o, key, descriptor);
		if (o !== ObjectProto) {
			defineProperty(ObjectProto, key, protoDescriptor);
		}
	};

}(Object, 'getOwnPropertySymbols', this));

// Symbol.iterator
/* global Symbol */
Object.defineProperty(Symbol, 'iterator', { value: Symbol('iterator') });

// Symbol.species
/* global Symbol */
Object.defineProperty(Symbol, 'species', { value: Symbol('species') });

// Map
/* global CreateIterResultObject, CreateMethodProperty, GetIterator, IsCallable, IteratorClose, IteratorStep, IteratorValue, OrdinaryCreateFromConstructor, SameValueZero, Type, Symbol */
(function (global) {
	var supportsGetters = (function () {
		try {
			var a = {};
			Object.defineProperty(a, 't', {
				configurable: true,
				enumerable: false,
				get: function () {
					return true;
				},
				set: undefined
			});
			return !!a.t;
		} catch (e) {
			return false;
		}
	}());

	// Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
	var undefMarker = Symbol('undef');
	// 23.1.1.1 Map ( [ iterable ] )
	var Map = function Map(/* iterable */) {
		// 1. If NewTarget is undefined, throw a TypeError exception.
		if (!(this instanceof Map)) {
			throw new TypeError('Constructor Map requires "new"');
		}
		// 2. Let map be ? OrdinaryCreateFromConstructor(NewTarget, "%MapPrototype%", « [[MapData]] »).
		var map = OrdinaryCreateFromConstructor(this, Map.prototype, {
			_keys: [],
			_values: [],
			_size: 0,
			_es6Map: true
		});

		// 3. Set map.[[MapData]] to a new empty List.
		// Polyfill.io - This step was done as part of step two.

		// Some old engines do not support ES5 getters/setters.  Since Map only requires these for the size property, we can fall back to setting the size property statically each time the size of the map changes.
		if (!supportsGetters) {
			Object.defineProperty(map, 'size', {
				configurable: true,
				enumerable: false,
				writable: true,
				value: 0
			});
		}

		// 4. If iterable is not present, let iterable be undefined.
		var iterable = arguments.length > 0 ? arguments[0] : undefined;

		// 5. If iterable is either undefined or null, return map.
		if (iterable === null || iterable === undefined) {
			return map;
		}

		// 6. Let adder be ? Get(map, "set").
		var adder = map.set;

		// 7. If IsCallable(adder) is false, throw a TypeError exception.
		if (!IsCallable(adder)) {
			throw new TypeError("Map.prototype.set is not a function");
		}

		// 8. Let iteratorRecord be ? GetIterator(iterable).
		try {
			var iteratorRecord = GetIterator(iterable);
			// 9. Repeat,
			while (true) {
				// a. Let next be ? IteratorStep(iteratorRecord).
				var next = IteratorStep(iteratorRecord);
				// b. If next is false, return map.
				if (next === false) {
					return map;
				}
				// c. Let nextItem be ? IteratorValue(next).
				var nextItem = IteratorValue(next);
				// d. If Type(nextItem) is not Object, then
				if (Type(nextItem) !== 'object') {
					// i. Let error be Completion{[[Type]]: throw, [[Value]]: a newly created TypeError object, [[Target]]: empty}.
					try {
						throw new TypeError('Iterator value ' + nextItem + ' is not an entry object');
					} catch (error) {
						// ii. Return ? IteratorClose(iteratorRecord, error).
						return IteratorClose(iteratorRecord, error);
					}
				}
				try {
					// Polyfill.io - The try catch accounts for steps: f, h, and j.

					// e. Let k be Get(nextItem, "0").
					var k = nextItem[0];
					// f. If k is an abrupt completion, return ? IteratorClose(iteratorRecord, k).
					// g. Let v be Get(nextItem, "1").
					var v = nextItem[1];
					// h. If v is an abrupt completion, return ? IteratorClose(iteratorRecord, v).
					// i. Let status be Call(adder, map, « k.[[Value]], v.[[Value]] »).
					adder.call(map, k, v);
				} catch (e) {
					// j. If status is an abrupt completion, return ? IteratorClose(iteratorRecord, status).
					return IteratorClose(iteratorRecord, e);
				}
			}
		} catch (e) {
			// Polyfill.io - For user agents which do not have iteration methods on argument objects or arrays, we can special case those.
			if (Array.isArray(iterable) ||
				Object.prototype.toString.call(iterable) === '[object Arguments]' ||
				// IE 7 & IE 8 return '[object Object]' for the arguments object, we can detect by checking for the existence of the callee property
				(!!iterable.callee)) {
				var index;
				var length = iterable.length;
				for (index = 0; index < length; index++) {
					adder.call(map, iterable[index][0], iterable[index][1]);
				}
			}
		}
		return map;
	};

	// 23.1.2.1. Map.prototype
	// The initial value of Map.prototype is the intrinsic object %MapPrototype%.
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
	Object.defineProperty(Map, 'prototype', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {}
	});

	// 23.1.2.2 get Map [ @@species ]
	if (supportsGetters) {
		Object.defineProperty(Map, Symbol.species, {
			configurable: true,
			enumerable: false,
			get: function () {
				// 1. Return the this value.
				return this;
			},
			set: undefined
		});
	} else {
		CreateMethodProperty(Map, Symbol.species, Map);
	}

	// 23.1.3.1 Map.prototype.clear ( )
	CreateMethodProperty(Map.prototype, 'clear', function clear() {
			// 1. Let M be the this value.
			var M = this;
			// 2. If Type(M) is not Object, throw a TypeError exception.
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 4. Let entries be the List that is M.[[MapData]].
			var entries = M._keys;
			// 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				// 5.a. Set p.[[Key]] to empty.
				M._keys[i] = undefMarker;
				// 5.b. Set p.[[Value]] to empty.
				M._values[i] = undefMarker;
			}
			this._size = 0;
			if (!supportsGetters) {
				this.size = this._size;
			}
			// 6. Return undefined.
			return undefined;
		}
	);

	// 23.1.3.2. Map.prototype.constructor
	CreateMethodProperty(Map.prototype, 'constructor', Map);

	// 23.1.3.3. Map.prototype.delete ( key )
	CreateMethodProperty(Map.prototype, 'delete', function (key) {
			// 1. Let M be the this value.
			var M = this;
			// 2. If Type(M) is not Object, throw a TypeError exception.
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 4. Let entries be the List that is M.[[MapData]].
			var entries = M._keys;
			// 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				// a. If p.[[Key]] is not empty and SameValueZero(p.[[Key]], key) is true, then
				if (M._keys[i] !== undefMarker && SameValueZero(M._keys[i], key)) {
					// i. Set p.[[Key]] to empty.
					this._keys[i] = undefMarker;
					// ii. Set p.[[Value]] to empty.
					this._values[i] = undefMarker;
					this._size = --this._size;
					if (!supportsGetters) {
						this.size = this._size;
					}
					// iii. Return true.
					return true;
				}
			}
			// 6. Return false.
			return false;
		}
	);

	// 23.1.3.4. Map.prototype.entries ( )
	CreateMethodProperty(Map.prototype, 'entries', function entries () {
			// 1. Let M be the this value.
			var M = this;
			// 2. Return ? CreateMapIterator(M, "key+value").
			return CreateMapIterator(M, 'key+value');
		}
	);

	// 23.1.3.5. Map.prototype.forEach ( callbackfn [ , thisArg ] )
	CreateMethodProperty(Map.prototype, 'forEach', function (callbackFn) {
			// 1. Let M be the this value.
			var M = this;
			// 2. If Type(M) is not Object, throw a TypeError exception.
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
			if (!IsCallable(callbackFn)) {
				throw new TypeError(Object.prototype.toString.call(callbackFn) + ' is not a function.');
			}
			// 5. If thisArg is present, let T be thisArg; else let T be undefined.
			if (arguments[1]) {
				var T = arguments[1];
			}
			// 6. Let entries be the List that is M.[[MapData]].
			var entries = M._keys;
			// 7. For each Record {[[Key]], [[Value]]} e that is an element of entries, in original key insertion order, do
			for (var i = 0; i < entries.length; i++) {
				// a. If e.[[Key]] is not empty, then
				if (M._keys[i] !== undefMarker && M._values[i] !== undefMarker ) {
					// i. Perform ? Call(callbackfn, T, « e.[[Value]], e.[[Key]], M »).
					callbackFn.call(T, M._values[i], M._keys[i], M);
				}
			}
			// 8. Return undefined.
			return undefined;
		}
	);

	// 23.1.3.6. Map.prototype.get ( key )
	CreateMethodProperty(Map.prototype, 'get', function get(key) {
			// 1. Let M be the this value.
			var M = this;
			// 2. If Type(M) is not Object, throw a TypeError exception.
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.get called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.get called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 4. Let entries be the List that is M.[[MapData]].
			var entries = M._keys;
			// 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				// a. If p.[[Key]] is not empty and SameValueZero(p.[[Key]], key) is true, return p.[[Value]].
				if (M._keys[i] !== undefMarker && SameValueZero(M._keys[i], key)) {
					return M._values[i];
				}
			}
			// 6. Return undefined.
			return undefined;
		});

	// 23.1.3.7. Map.prototype.has ( key )
	CreateMethodProperty(Map.prototype, 'has', function has (key) {
			// 1. Let M be the this value.
			var M = this;
			// 2. If Type(M) is not Object, throw a TypeError exception.
			if (typeof M !== 'object') {
				throw new TypeError('Method Map.prototype.has called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.has called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 4. Let entries be the List that is M.[[MapData]].
			var entries = M._keys;
			// 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				// a. If p.[[Key]] is not empty and SameValueZero(p.[[Key]], key) is true, return true.
				if (M._keys[i] !== undefMarker && SameValueZero(M._keys[i], key)) {
					return true;
				}
			}
			// 6. Return false.
			return false;
		});

	// 23.1.3.8. Map.prototype.keys ( )
	CreateMethodProperty(Map.prototype, 'keys', function keys () {
			// 1. Let M be the this value.
			var M = this;
			// 2. Return ? CreateMapIterator(M, "key").
			return CreateMapIterator(M, "key");
		});

	// 23.1.3.9. Map.prototype.set ( key, value )
	CreateMethodProperty(Map.prototype, 'set', function set(key, value) {
			// 1. Let M be the this value.
			var M = this;
			// 2. If Type(M) is not Object, throw a TypeError exception.
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.set called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.set called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			// 4. Let entries be the List that is M.[[MapData]].
			var entries = M._keys;
			// 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				// a. If p.[[Key]] is not empty and SameValueZero(p.[[Key]], key) is true, then
				if (M._keys[i] !== undefMarker && SameValueZero(M._keys[i], key)) {
					// i. Set p.[[Value]] to value.
					M._values[i] = value;
					// Return M.
					return M;
				}
			}
			// 6. If key is -0, let key be +0.
			if (key === -0) {
				key = 0;
			}
			// 7. Let p be the Record {[[Key]]: key, [[Value]]: value}.
			var p = {};
			p['[[Key]]'] = key;
			p['[[Value]]'] = value;
			// 8. Append p as the last element of entries.
			M._keys.push(p['[[Key]]']);
			M._values.push(p['[[Value]]']);
			++M._size;
			if (!supportsGetters) {
				M.size = M._size;
			}
			// 9. Return M.
			return M;
		});

	// 23.1.3.10. get Map.prototype.size
	if (supportsGetters) {
		Object.defineProperty(Map.prototype, 'size', {
			configurable: true,
			enumerable: false,
			get: function () {
				// 1. Let M be the this value.
				var M = this;
				// 2. If Type(M) is not Object, throw a TypeError exception.
				if (Type(M) !== 'object') {
					throw new TypeError('Method Map.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(M));
				}
				// 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
				if (M._es6Map !== true) {
					throw new TypeError('Method Map.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(M));
				}
				// 4. Let entries be the List that is M.[[MapData]].
				var entries = M._keys;
				// 5. Let count be 0.
				var count = 0;
				// 6. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
				for (var i = 0; i < entries.length; i++) {
					// a. If p.[[Key]] is not empty, set count to count+1.
					if (M._keys[i] !== undefMarker) {
						count = count + 1;
					}
				}
				// 7. Return count.
				return count;
			},
			set: undefined
		});
	}

	// 23.1.3.11. Map.prototype.values ( )
	CreateMethodProperty(Map.prototype, 'values', function values () {
			// 1. Let M be the this value.
			var M = this;
			// 2. Return ? CreateMapIterator(M, "value").
			return CreateMapIterator(M, 'value');
		}
	);

	// 23.1.3.12. Map.prototype [ @@iterator ] ( )
	// The initial value of the @@iterator property is the same function object as the initial value of the entries property.
	CreateMethodProperty(Map.prototype, Symbol.iterator, Map.prototype.entries);

	// 23.1.3.13. Map.prototype [ @@toStringTag ]
	// The initial value of the @@toStringTag property is the String value "Map".
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.

	// Polyfill.io - Safari 8 implements Map.name but as a non-configurable property, which means it would throw an error if we try and configure it here.
	if (!('name' in Map)) {
		// 19.2.4.2 name
		Object.defineProperty(Map, 'name', {
			configurable: true,
			enumerable: false,
			writable: false,
			value: 'Map'
		});
	}

	// 23.1.5.1. CreateMapIterator ( map, kind )
	function CreateMapIterator(map, kind) {
		// 1. If Type(map) is not Object, throw a TypeError exception.
		if (Type(map) !== 'object') {
			throw new TypeError('createMapIterator called on incompatible receiver ' + Object.prototype.toString.call(map));
		}
		// 2. If map does not have a [[MapData]] internal slot, throw a TypeError exception.
		if (map._es6Map !== true) {
			throw new TypeError('createMapIterator called on incompatible receiver ' + Object.prototype.toString.call(map));
		}
		// 3. Let iterator be ObjectCreate(%MapIteratorPrototype%, « [[Map]], [[MapNextIndex]], [[MapIterationKind]] »).
		var iterator = Object.create(MapIteratorPrototype);
		// 4. Set iterator.[[Map]] to map.
		Object.defineProperty(iterator, '[[Map]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: map
		});
		// 5. Set iterator.[[MapNextIndex]] to 0.
		Object.defineProperty(iterator, '[[MapNextIndex]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: 0
		});
		// 6. Set iterator.[[MapIterationKind]] to kind.
		Object.defineProperty(iterator, '[[MapIterationKind]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: kind
		});
		// 7. Return iterator.
		return iterator;
	}

	// 23.1.5.2. The %MapIteratorPrototype% Object
	var MapIteratorPrototype = {};
	// Polyfill.io - We use this as a quick way to check if an object is a Map Iterator instance.
	Object.defineProperty(MapIteratorPrototype, 'isMapIterator', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: true
	});

	// 23.1.5.2.1. %MapIteratorPrototype%.next ( )
	CreateMethodProperty(MapIteratorPrototype, 'next', function next() {
			// 1. Let O be the this value.
			var O = this;
			// 2. If Type(O) is not Object, throw a TypeError exception.
			if (Type(O) !== 'object') {
				throw new TypeError('Method %MapIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
			}
			// 3. If O does not have all of the internal slots of a Map Iterator Instance (23.1.5.3), throw a TypeError exception.
			if (!O.isMapIterator) {
				throw new TypeError('Method %MapIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
			}
			// 4. Let m be O.[[Map]].
			var m = O['[[Map]]'];
			// 5. Let index be O.[[MapNextIndex]].
			var index = O['[[MapNextIndex]]'];
			// 6. Let itemKind be O.[[MapIterationKind]].
			var itemKind = O['[[MapIterationKind]]'];
			// 7. If m is undefined, return CreateIterResultObject(undefined, true).
			if (m === undefined) {
				return CreateIterResultObject(undefined, true);
			}
			// 8. Assert: m has a [[MapData]] internal slot.
			if (!m._es6Map) {
				throw new Error(Object.prototype.toString.call(m) + ' has a [[MapData]] internal slot.');
			}
			// 9. Let entries be the List that is m.[[MapData]].
			var entries = m._keys;
			// 10. Let numEntries be the number of elements of entries.
			var numEntries = entries.length;
			// 11. NOTE: numEntries must be redetermined each time this method is evaluated.
			// 12. Repeat, while index is less than numEntries,
			while (index < numEntries) {
				// a. Let e be the Record {[[Key]], [[Value]]} that is the value of entries[index].
				var e = Object.create(null);
				e['[[Key]]'] = m._keys[index];
				e['[[Value]]'] = m._values[index];
				// b. Set index to index+1.
				index = index + 1;
				// c. Set O.[[MapNextIndex]] to index.
				O['[[MapNextIndex]]'] = index;
				// d. If e.[[Key]] is not empty, then
				if (e['[[Key]]'] !== undefMarker) {
					// i. If itemKind is "key", let result be e.[[Key]].
					if (itemKind === 'key') {
						var result = e['[[Key]]'];
						// ii. Else if itemKind is "value", let result be e.[[Value]].
					} else if (itemKind === 'value') {
						result = e['[[Value]]'];
						// iii. Else,
					} else {
						// 1. Assert: itemKind is "key+value".
						if (itemKind !== 'key+value') {
							throw new Error();
						}
						// 2. Let result be CreateArrayFromList(« e.[[Key]], e.[[Value]] »).
						result = [
							e['[[Key]]'],
							e['[[Value]]']
						];
					}
					// iv. Return CreateIterResultObject(result, false).
					return CreateIterResultObject(result, false);
				}
			}
			// 13. Set O.[[Map]] to undefined.
			O['[[Map]]'] = undefined;
			// 14. Return CreateIterResultObject(undefined, true).
			return CreateIterResultObject(undefined, true);
		}
	);

	// 23.1.5.2.2 %MapIteratorPrototype% [ @@toStringTag ]
	// The initial value of the @@toStringTag property is the String value "Map Iterator".
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.

	CreateMethodProperty(MapIteratorPrototype, Symbol.iterator, function iterator() {
			return this;
		}
	);

	// Export the object
	try {
		CreateMethodProperty(global, 'Map', Map);
	} catch (e) {
		// IE8 throws an error here if we set enumerable to false.
		// More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
		global['Map'] = Map;
	}
}(this));

// Set
/* global CreateIterResultObject, CreateMethodProperty, GetIterator, IsCallable, IteratorClose, IteratorStep, IteratorValue, OrdinaryCreateFromConstructor, SameValueZero, Symbol */
(function (global) {
	var supportsGetters = (function () {
		try {
			var a = {};
			Object.defineProperty(a, 't', {
				configurable: true,
				enumerable: false,
				get: function () {
					return true;
				},
				set: undefined
			});
			return !!a.t;
		} catch (e) {
			return false;
		}
	}());

	// Deleted set items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
	var undefMarker = Symbol('undef');
	// 23.2.1.1. Set ( [ iterable ] )
	var Set = function Set(/* iterable */) {
		// 1. If NewTarget is undefined, throw a TypeError exception.
		if (!(this instanceof Set)) {
			throw new TypeError('Constructor Set requires "new"');
		}
		// 2. Let set be ? OrdinaryCreateFromConstructor(NewTarget, "%SetPrototype%", « [[SetData]] »).
		var set = OrdinaryCreateFromConstructor(this, Set.prototype, {
			_values: [],
			_size: 0,
			_es6Set: true
		});

		// 3. Set set.[[SetData]] to a new empty List.
		// Polyfill.io - This step was done as part of step two.

		// Some old engines do not support ES5 getters/setters.  Since Set only requires these for the size property, we can fall back to setting the size property statically each time the size of the set changes.
		if (!supportsGetters) {
			Object.defineProperty(set, 'size', {
				configurable: true,
				enumerable: false,
				writable: true,
				value: 0
			});
		}

		// 4. If iterable is not present, let iterable be undefined.
		var iterable = arguments.length > 0 ? arguments[0] : undefined;

		// 5. If iterable is either undefined or null, return set.
		if (iterable === null || iterable === undefined) {
			return set;
		}

		// 6. Let adder be ? Get(set, "add").
		var adder = set.add;
		// 7. If IsCallable(adder) is false, throw a TypeError exception.
		if (!IsCallable(adder)) {
			throw new TypeError("Set.prototype.add is not a function");
		}

		try {
			// 8. Let iteratorRecord be ? GetIterator(iterable).
			var iteratorRecord = GetIterator(iterable);
			// 9. Repeat,
			while (true) {
				// a. Let next be ? IteratorStep(iteratorRecord).
				var next = IteratorStep(iteratorRecord);
				// b. If next is false, return set.
				if (next === false) {
					return set;
				}
				// c. Let nextValue be ? IteratorValue(next).
				var nextValue = IteratorValue(next);
				// d. Let status be Call(adder, set, « nextValue.[[Value]] »).
				try {
					adder.call(set, nextValue);
				} catch (e) {
					// e. If status is an abrupt completion, return ? IteratorClose(iteratorRecord, status).
					return IteratorClose(iteratorRecord, e);
				}
			}
		} catch (e) {
			// Polyfill.io - For user agents which do not have iteration methods on argument objects or arrays, we can special case those.
			if (Array.isArray(iterable) ||
				Object.prototype.toString.call(iterable) === '[object Arguments]' ||
				// IE 7 & IE 8 return '[object Object]' for the arguments object, we can detect by checking for the existence of the callee property
				(!!iterable.callee)) {
				var index;
				var length = iterable.length;
				for (index = 0; index < length; index++) {
					adder.call(set, iterable[index]);
				}
			} else {
				throw (e);
			}
		}
		return set;
	};

	// 23.2.2.1. Set.prototype
	// The initial value of Set.prototype is the intrinsic %SetPrototype% object.
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
	Object.defineProperty(Set, 'prototype', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {}
	});

	// 23.2.2.2 get Set [ @@species ]
	if (supportsGetters) {
		Object.defineProperty(Set, Symbol.species, {
			configurable: true,
			enumerable: false,
			get: function () {
				// 1. Return the this value.
				return this;
			},
			set: undefined
		});
	} else {
		CreateMethodProperty(Set, Symbol.species, Set);
	}

	// 23.2.3.1. Set.prototype.add ( value )
	CreateMethodProperty(Set.prototype, 'add', function add(value) {
			// 1. Let S be the this value.
			var S = this;
			// 2. If Type(S) is not Object, throw a TypeError exception.
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.add called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.add called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 4. Let entries be the List that is S.[[SetData]].
			var entries = S._values;
			// 5. For each e that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				var e = entries[i];
				// a. If e is not empty and SameValueZero(e, value) is true, then
				if (e !== undefMarker && SameValueZero(e, value)) {
					// i. Return S.
					return S;
				}
			}
			// 6. If value is -0, let value be +0.
			if (1/value === -Infinity) {
				value = 0;
			}
			// 7. Append value as the last element of entries.
			S._values.push(value);

			this._size = ++this._size;
			if (!supportsGetters) {
				this.size = this._size;
			}
			// 8. Return S.
			return S;
		});

	// 23.2.3.2. Set.prototype.clear ( )
	CreateMethodProperty(Set.prototype, 'clear', function clear() {
			// 1. Let S be the this value.
			var S = this;
			// 2. If Type(S) is not Object, throw a TypeError exception.
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 4. Let entries be the List that is S.[[SetData]].
			var entries = S._values;
			// 5. For each e that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				// a. Replace the element of entries whose value is e with an element whose value is empty.
				entries[i] = undefMarker;
			}
			this._size = 0;
			if (!supportsGetters) {
				this.size = this._size;
			}
			// 6. Return undefined.
			return undefined;
		});

	// 23.2.3.3. Set.prototype.constructor
	CreateMethodProperty(Set.prototype, 'constructor', Set);

	// 23.2.3.4. Set.prototype.delete ( value )
	CreateMethodProperty(Set.prototype, 'delete', function (value) {
			// 1. Let S be the this value.
			var S = this;
			// 2. If Type(S) is not Object, throw a TypeError exception.
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.delete called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.delete called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 4. Let entries be the List that is S.[[SetData]].
			var entries = S._values;
			// 5. For each e that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				var e = entries[i];
				// a. If e is not empty and SameValueZero(e, value) is true, then
				if (e !== undefMarker && SameValueZero(e, value)) {
					// i. Replace the element of entries whose value is e with an element whose value is empty.
					entries[i] = undefMarker;

					this._size = --this._size;
					if (!supportsGetters) {
						this.size = this._size;
					}
					// ii. Return true.
					return true;
				}
			}
			// 6. Return false.
			return false;
		}
	);

	// 23.2.3.5. Set.prototype.entries ( )
	CreateMethodProperty(Set.prototype, 'entries', function entries() {
			// 1. Let S be the this value.
			var S = this;
			// 2. Return ? CreateSetIterator(S, "key+value").
			return CreateSetIterator(S, 'key+value');
		}
	);

	// 23.2.3.6. Set.prototype.forEach ( callbackfn [ , thisArg ] )
	CreateMethodProperty(Set.prototype, 'forEach', function forEach(callbackFn /*[ , thisArg ]*/) {
			// 1. Let S be the this value.
			var S = this;
			// 2. If Type(S) is not Object, throw a TypeError exception.
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
			if (!IsCallable(callbackFn)) {
				throw new TypeError(Object.prototype.toString.call(callbackFn) + ' is not a function.');
			}
			// 5. If thisArg is present, let T be thisArg; else let T be undefined.
			if (arguments[1]) {
				var T = arguments[1];
			}
			// 6. Let entries be the List that is S.[[SetData]].
			var entries = S._values;
			// 7. For each e that is an element of entries, in original insertion order, do
			for (var i = 0; i < entries.length; i++) {
				var e = entries[i];
				// a. If e is not empty, then
				if (e !== undefMarker) {
					// i. Perform ? Call(callbackfn, T, « e, e, S »).
					callbackFn.call(T, e, e, S);
				}
			}
			// 8. Return undefined.
			return undefined;
		}
	);

	// 23.2.3.7. Set.prototype.has ( value )
	CreateMethodProperty(Set.prototype, 'has', function has(value) {
			// 1. Let S be the this value.
			var S = this;
			// 2. If Type(S) is not Object, throw a TypeError exception.
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			// 4. Let entries be the List that is S.[[SetData]].
			var entries = S._values;
			// 5. For each e that is an element of entries, do
			for (var i = 0; i < entries.length; i++) {
				var e = entries[i];
				// a. If e is not empty and SameValueZero(e, value) is true, return true.
				if (e !== undefMarker && SameValueZero(e, value)) {
					return true;
				}
			}
			// 6. Return false.
			return false;
		}
	);

	// Polyfill.io - We need to define Set.prototype.values before Set.prototype.keys because keys is a reference to values.
	// 23.2.3.10. Set.prototype.values()
	var values = function values() {
		// 1. Let S be the this value.
		var S = this;
		// 2. Return ? CreateSetIterator(S, "value").
		return CreateSetIterator(S, "value");
	};
	CreateMethodProperty(Set.prototype, 'values', values);

	// 23.2.3.8 Set.prototype.keys ( )
	// The initial value of the keys property is the same function object as the initial value of the values property.
	CreateMethodProperty(Set.prototype, 'keys', values);

	// 23.2.3.9. get Set.prototype.size
	if (supportsGetters) {
		Object.defineProperty(Set.prototype, 'size', {
			configurable: true,
			enumerable: false,
			get: function () {
				// 1. Let S be the this value.
				var S = this;
				// 2. If Type(S) is not Object, throw a TypeError exception.
				if (typeof S !== 'object') {
					throw new TypeError('Method Set.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(S));
				}
				// 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
				if (S._es6Set !== true) {
					throw new TypeError('Method Set.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(S));
				}
				// 4. Let entries be the List that is S.[[SetData]].
				var entries = S._values;
				// 5. Let count be 0.
				var count = 0;
				// 6. For each e that is an element of entries, do
				for (var i = 0; i < entries.length; i++) {
					var e = entries[i];
					// a. If e is not empty, set count to count+1.
					if (e !== undefMarker) {
						count = count + 1;
					}
				}
				// 7. Return count.
				return count;
			},
			set: undefined
		});
	}

	// 23.2.3.11. Set.prototype [ @@iterator ] ( )
	// The initial value of the @@iterator property is the same function object as the initial value of the values property.
	CreateMethodProperty(Set.prototype, Symbol.iterator, values);

	// 23.2.3.12. Set.prototype [ @@toStringTag ]
	// The initial value of the @@toStringTag property is the String value "Set".
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.

	// Polyfill.io - Safari 8 implements Set.name but as a non-configurable property, which means it would throw an error if we try and configure it here.
	if (!('name' in Set)) {
		// 19.2.4.2 name
		Object.defineProperty(Set, 'name', {
			configurable: true,
			enumerable: false,
			writable: false,
			value: 'Set'
		});
	}

	// 23.2.5.1. CreateSetIterator ( set, kind )
	function CreateSetIterator(set, kind) {
		// 1. If Type(set) is not Object, throw a TypeError exception.
		if (typeof set !== 'object') {
			throw new TypeError('createSetIterator called on incompatible receiver ' + Object.prototype.toString.call(set));
		}
		// 2. If set does not have a [[SetData]] internal slot, throw a TypeError exception.
		if (set._es6Set !== true) {
			throw new TypeError('createSetIterator called on incompatible receiver ' + Object.prototype.toString.call(set));
		}
		// 3. Let iterator be ObjectCreate(%SetIteratorPrototype%, « [[IteratedSet]], [[SetNextIndex]], [[SetIterationKind]] »).
		var iterator = Object.create(SetIteratorPrototype);
		// 4. Set iterator.[[IteratedSet]] to set.
		Object.defineProperty(iterator, '[[IteratedSet]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: set
		});
		// 5. Set iterator.[[SetNextIndex]] to 0.
		Object.defineProperty(iterator, '[[SetNextIndex]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: 0
		});
		// 6. Set iterator.[[SetIterationKind]] to kind.
		Object.defineProperty(iterator, '[[SetIterationKind]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: kind
		});
		// 7. Return iterator.
		return iterator;
	}

	// 23.2.5.2. The %SetIteratorPrototype% Object
	var SetIteratorPrototype = {};
	//Polyfill.io - We add this property to help us identify what is a set iterator.
	Object.defineProperty(SetIteratorPrototype, 'isSetIterator', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: true
	});

	// 23.2.5.2.1. %SetIteratorPrototype%.next ( )
	CreateMethodProperty(SetIteratorPrototype, 'next', function next() {
		// 1. Let O be the this value.
		var O = this;
		// 2. If Type(O) is not Object, throw a TypeError exception.
		if (typeof O !== 'object') {
			throw new TypeError('Method %SetIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
		}
		// 3. If O does not have all of the internal slots of a Set Iterator Instance (23.2.5.3), throw a TypeError exception.
		if (!O.isSetIterator) {
			throw new TypeError('Method %SetIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
		}
		// 4. Let s be O.[[IteratedSet]].
		var s = O['[[IteratedSet]]'];
		// 5. Let index be O.[[SetNextIndex]].
		var index = O['[[SetNextIndex]]'];
		// 6. Let itemKind be O.[[SetIterationKind]].
		var itemKind = O['[[SetIterationKind]]'];
		// 7. If s is undefined, return CreateIterResultObject(undefined, true).
		if (s === undefined) {
			return CreateIterResultObject(undefined, true);
		}
		// 8. Assert: s has a [[SetData]] internal slot.
		if (!s._es6Set) {
			throw new Error(Object.prototype.toString.call(s) + ' does not have [[SetData]] internal slot.');
		}
		// 9. Let entries be the List that is s.[[SetData]].
		var entries = s._values;
		// 10. Let numEntries be the number of elements of entries.
		var numEntries = entries.length;
		// 11. NOTE: numEntries must be redetermined each time this method is evaluated.
		// 12. Repeat, while index is less than numEntries,
		while (index < numEntries) {
			// a. Let e be entries[index].
			var e = entries[index];
			// b. Set index to index+1.
			index = index + 1;
			// c. Set O.[[SetNextIndex]] to index.
			O['[[SetNextIndex]]'] = index;
			// d. If e is not empty, then
			if (e !== undefMarker) {
				// i. If itemKind is "key+value", then
				if (itemKind === 'key+value') {
					// 1. Return CreateIterResultObject(CreateArrayFromList(« e, e »), false).
					return CreateIterResultObject([e, e], false);
				}
				// ii. Return CreateIterResultObject(e, false).
				return CreateIterResultObject(e, false);
			}
		}
		// 13. Set O.[[IteratedSet]] to undefined.
		O['[[IteratedSet]]'] = undefined;
		// 14. Return CreateIterResultObject(undefined, true).
		return CreateIterResultObject(undefined, true);
	});

	// 23.2.5.2.2. %SetIteratorPrototype% [ @@toStringTag ]
	// The initial value of the @@toStringTag property is the String value "Set Iterator".
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.

	CreateMethodProperty(SetIteratorPrototype, Symbol.iterator, function iterator() {
			return this;
		}
	);

	// Export the object
	try {
		CreateMethodProperty(global, 'Set', Set);
	} catch (e) {
		// IE8 throws an error here if we set enumerable to false.
		// More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
		global['Set'] = Set;
	}

}(this));

// Array.from
/* globals
	IsCallable, GetMethod, Symbol, IsConstructor, Construct, ArrayCreate, GetIterator, IteratorClose,
	ToString, IteratorStep, IteratorValue, Call, CreateDataPropertyOrThrow, ToObject, ToLength, Get, CreateMethodProperty
*/
(function () {
	var toString = Object.prototype.toString;
	var stringMatch = String.prototype.match;
	// A cross-realm friendly way to detect if a value is a String object or literal.
	function isString(value) {
		if (typeof value === 'string') { return true; }
		if (typeof value !== 'object') { return false; }
		return toString.call(value) === '[object String]';
	}

	// 22.1.2.1. Array.from ( items [ , mapfn [ , thisArg ] ] )
	CreateMethodProperty(Array, 'from', function from(items /* [ , mapfn [ , thisArg ] ] */) { // eslint-disable-line no-undef
		// 1. Let C be the this value.
		var C = this;
		// 2. If mapfn is undefined, let mapping be false.
		var mapfn = arguments.length > 1 ? arguments[1] : undefined;
		if (mapfn === undefined) {
			var mapping = false;
			// 3. Else,
		} else {
			// a. If IsCallable(mapfn) is false, throw a TypeError exception.
			if (IsCallable(mapfn) === false) {
				throw new TypeError(Object.prototype.toString.call(mapfn) + ' is not a function.');
			}
			// b. If thisArg is present, let T be thisArg; else let T be undefined.
			var thisArg = arguments.length > 2 ? arguments[2] : undefined;
			if (thisArg !== undefined) {
				var T = thisArg;
			} else {
				T = undefined;
			}
			// c. Let mapping be true.
			mapping = true;

		}
		// 4. Let usingIterator be ? GetMethod(items, @@iterator).
		var usingIterator = GetMethod(items, Symbol.iterator);
		// 5. If usingIterator is not undefined, then
		if (usingIterator !== undefined) {
			// a. If IsConstructor(C) is true, then
			if (IsConstructor(C)) {
				// i. Let A be ? Construct(C).
				var A = Construct(C);
				// b. Else,
			} else {
				// i. Let A be ! ArrayCreate(0).
				A = ArrayCreate(0);
			}
			// c. Let iteratorRecord be ? GetIterator(items, usingIterator).
			var iteratorRecord = GetIterator(items, usingIterator);
			// d. Let k be 0.
			var k = 0;
			// e. Repeat,
			while (true) {
				// i. If k ≥ 2^53-1, then
				if (k >= (Math.pow(2, 53) - 1)) {
					// 1. Let error be Completion{[[Type]]: throw, [[Value]]: a newly created TypeError object, [[Target]]: empty}.
					var error = new TypeError('Iteration count can not be greater than or equal 9007199254740991.');
					// 2. Return ? IteratorClose(iteratorRecord, error).
					return IteratorClose(iteratorRecord, error);
				}
				// ii. Let Pk be ! ToString(k).
				var Pk = ToString(k);
				// iii. Let next be ? IteratorStep(iteratorRecord).
				var next = IteratorStep(iteratorRecord);
				// iv. If next is false, then
				if (next === false) {
					// 1. Perform ? Set(A, "length", k, true).
					A["length"] = k;
					// 2. Return A.
					return A;
				}
				// v. Let nextValue be ? IteratorValue(next).
				var nextValue = IteratorValue(next);
				// vi. If mapping is true, then
				if (mapping) {
					try {
						// Polyfill.io - The try catch accounts for step 2.
						// 1. Let mappedValue be Call(mapfn, T, « nextValue, k »).
						var mappedValue = Call(mapfn, T, [nextValue, k]);
						// 2. If mappedValue is an abrupt completion, return ? IteratorClose(iteratorRecord, mappedValue).
						// 3. Let mappedValue be mappedValue.[[Value]].
					} catch (e) {
						return IteratorClose(iteratorRecord, e);
					}

					// vii. Else, let mappedValue be nextValue.
				} else {
					mappedValue = nextValue;
				}
				try {
					// Polyfill.io - The try catch accounts for step ix.
					// viii. Let defineStatus be CreateDataPropertyOrThrow(A, Pk, mappedValue).
					CreateDataPropertyOrThrow(A, Pk, mappedValue);
					// ix. If defineStatus is an abrupt completion, return ? IteratorClose(iteratorRecord, defineStatus).
				} catch (e) {
					return IteratorClose(iteratorRecord, e);
				}
				// x. Increase k by 1.
				k = k + 1;
			}
		}
		// 6. NOTE: items is not an Iterable so assume it is an array-like object.
		// 7. Let arrayLike be ! ToObject(items).
		// Polyfill.io - For Strings we need to split astral symbols into surrogate pairs.
		if (isString(items)) {
			var arrayLike = stringMatch.call(items, /[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g) || [];
		} else {
			arrayLike = ToObject(items);
		}
		// 8. Let len be ? ToLength(? Get(arrayLike, "length")).
		var len = ToLength(Get(arrayLike, "length"));
		// 9. If IsConstructor(C) is true, then
		if (IsConstructor(C)) {
			// a. Let A be ? Construct(C, « len »).
			A = Construct(C, [len]);
			// 10. Else,
		} else {
			// a. Let A be ? ArrayCreate(len).
			A = ArrayCreate(len);
		}
		// 11. Let k be 0.
		k = 0;
		// 12. Repeat, while k < len
		while (k < len) {
			// a. Let Pk be ! ToString(k).
			Pk = ToString(k);
			// b. Let kValue be ? Get(arrayLike, Pk).
			var kValue = Get(arrayLike, Pk);
			// c. If mapping is true, then
			if (mapping === true) {
				// i. Let mappedValue be ? Call(mapfn, T, « kValue, k »).
				mappedValue = Call(mapfn, T, [kValue, k]);
				// d. Else, let mappedValue be kValue.
			} else {
				mappedValue = kValue;
			}
			// e. Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
			CreateDataPropertyOrThrow(A, Pk, mappedValue);
			// f. Increase k by 1.
			k = k + 1;
		}
		// 13. Perform ? Set(A, "length", len, true).
		A["length"] = len;
		// 14. Return A.
		return A;
	});
}());

// URL
/* global Symbol */
// URL Polyfill
// Draft specification: https://url.spec.whatwg.org

// Notes:
// - Primarily useful for parsing URLs and modifying query parameters
// - Should work in IE8+ and everything more modern, with es5.js polyfills

(function (global) {
  'use strict';

  function isSequence(o) {
    if (!o) return false;
    if ('Symbol' in global && 'iterator' in global.Symbol &&
        typeof o[Symbol.iterator] === 'function') return true;
    if (Array.isArray(o)) return true;
    return false;
  }

  function toArray(iter) {
    return ('from' in Array) ? Array.from(iter) : Array.prototype.slice.call(iter);
  }

  (function() {

    // Browsers may have:
    // * No global URL object
    // * URL with static methods only - may have a dummy constructor
    // * URL with members except searchParams
    // * Full URL API support
    var origURL = global.URL;
    var nativeURL;
    try {
      if (origURL) {
        nativeURL = new global.URL('http://example.com');
        if ('searchParams' in nativeURL) {
					var url = new URL('http://example.com');
					url.search = 'a=1&b=2';
					if (url.href === 'http://example.com/?a=1&b=2') {
						url.search = '';
						if (url.href === 'http://example.com/') {
							return;
						}
					}
				}
        if (!('href' in nativeURL)) {
					nativeURL = undefined;
				}
				nativeURL = undefined;
      }
    } catch (_) {}

    // NOTE: Doesn't do the encoding/decoding dance
    function urlencoded_serialize(pairs) {
      var output = '', first = true;
      pairs.forEach(function (pair) {
        var name = encodeURIComponent(pair.name);
        var value = encodeURIComponent(pair.value);
        if (!first) output += '&';
        output += name + '=' + value;
        first = false;
      });
      return output.replace(/%20/g, '+');
    }

    // NOTE: Doesn't do the encoding/decoding dance
    function urlencoded_parse(input, isindex) {
      var sequences = input.split('&');
      if (isindex && sequences[0].indexOf('=') === -1)
        sequences[0] = '=' + sequences[0];
      var pairs = [];
      sequences.forEach(function (bytes) {
        if (bytes.length === 0) return;
        var index = bytes.indexOf('=');
        if (index !== -1) {
          var name = bytes.substring(0, index);
          var value = bytes.substring(index + 1);
        } else {
          name = bytes;
          value = '';
        }
        name = name.replace(/\+/g, ' ');
        value = value.replace(/\+/g, ' ');
        pairs.push({ name: name, value: value });
      });
      var output = [];
      pairs.forEach(function (pair) {
        output.push({
          name: decodeURIComponent(pair.name),
          value: decodeURIComponent(pair.value)
        });
      });
      return output;
    }

    function URLUtils(url) {
      if (nativeURL)
        return new origURL(url);
      var anchor = document.createElement('a');
      anchor.href = url;
      return anchor;
    }

    function URLSearchParams(init) {
      var $this = this;
      this._list = [];

      if (init === undefined || init === null) {
        // no-op
      } else if (init instanceof URLSearchParams) {
        // In ES6 init would be a sequence, but special case for ES5.
        this._list = urlencoded_parse(String(init));
      } else if (typeof init === 'object' && isSequence(init)) {
        toArray(init).forEach(function(e) {
          if (!isSequence(e)) throw TypeError();
          var nv = toArray(e);
          if (nv.length !== 2) throw TypeError();
          $this._list.push({name: String(nv[0]), value: String(nv[1])});
        });
      } else if (typeof init === 'object' && init) {
        Object.keys(init).forEach(function(key) {
          $this._list.push({name: String(key), value: String(init[key])});
        });
      } else {
        init = String(init);
        if (init.substring(0, 1) === '?')
          init = init.substring(1);
        this._list = urlencoded_parse(init);
      }

      this._url_object = null;
      this._setList = function (list) { if (!updating) $this._list = list; };

      var updating = false;
      this._update_steps = function() {
        if (updating) return;
        updating = true;

        if (!$this._url_object) return;

        // Partial workaround for IE issue with 'about:'
        if ($this._url_object.protocol === 'about:' &&
            $this._url_object.pathname.indexOf('?') !== -1) {
          $this._url_object.pathname = $this._url_object.pathname.split('?')[0];
        }

        $this._url_object.search = urlencoded_serialize($this._list);

        updating = false;
      };
    }


    Object.defineProperties(URLSearchParams.prototype, {
      append: {
        value: function (name, value) {
          this._list.push({ name: name, value: value });
          this._update_steps();
        }, writable: true, enumerable: true, configurable: true
      },

      'delete': {
        value: function (name) {
          for (var i = 0; i < this._list.length;) {
            if (this._list[i].name === name)
              this._list.splice(i, 1);
            else
              ++i;
          }
          this._update_steps();
        }, writable: true, enumerable: true, configurable: true
      },

      get: {
        value: function (name) {
          for (var i = 0; i < this._list.length; ++i) {
            if (this._list[i].name === name)
              return this._list[i].value;
          }
          return null;
        }, writable: true, enumerable: true, configurable: true
      },

      getAll: {
        value: function (name) {
          var result = [];
          for (var i = 0; i < this._list.length; ++i) {
            if (this._list[i].name === name)
              result.push(this._list[i].value);
          }
          return result;
        }, writable: true, enumerable: true, configurable: true
      },

      has: {
        value: function (name) {
          for (var i = 0; i < this._list.length; ++i) {
            if (this._list[i].name === name)
              return true;
          }
          return false;
        }, writable: true, enumerable: true, configurable: true
      },

      set: {
        value: function (name, value) {
          var found = false;
          for (var i = 0; i < this._list.length;) {
            if (this._list[i].name === name) {
              if (!found) {
                this._list[i].value = value;
                found = true;
                ++i;
              } else {
                this._list.splice(i, 1);
              }
            } else {
              ++i;
            }
          }

          if (!found)
            this._list.push({ name: name, value: value });

          this._update_steps();
        }, writable: true, enumerable: true, configurable: true
      },

      entries: {
        value: function() { return new Iterator(this._list, 'key+value'); },
        writable: true, enumerable: true, configurable: true
      },

      keys: {
        value: function() { return new Iterator(this._list, 'key'); },
        writable: true, enumerable: true, configurable: true
      },

      values: {
        value: function() { return new Iterator(this._list, 'value'); },
        writable: true, enumerable: true, configurable: true
      },

      forEach: {
        value: function(callback) {
          var thisArg = (arguments.length > 1) ? arguments[1] : undefined;
          this._list.forEach(function(pair) {
            callback.call(thisArg, pair.value, pair.name);
          });

        }, writable: true, enumerable: true, configurable: true
      },

      toString: {
        value: function () {
          return urlencoded_serialize(this._list);
        }, writable: true, enumerable: false, configurable: true
      }
    });

    function Iterator(source, kind) {
      var index = 0;
      this['next'] = function() {
        if (index >= source.length)
          return {done: true, value: undefined};
        var pair = source[index++];
        return {done: false, value:
                kind === 'key' ? pair.name :
                kind === 'value' ? pair.value :
                [pair.name, pair.value]};
      };
    }

    if ('Symbol' in global && 'iterator' in global.Symbol) {
      Object.defineProperty(URLSearchParams.prototype, global.Symbol.iterator, {
        value: URLSearchParams.prototype.entries,
        writable: true, enumerable: true, configurable: true});
      Object.defineProperty(Iterator.prototype, global.Symbol.iterator, {
        value: function() { return this; },
        writable: true, enumerable: true, configurable: true});
    }

    function URL(url, base) {
      if (!(this instanceof global.URL))
        throw new TypeError("Failed to construct 'URL': Please use the 'new' operator.");

      if (base) {
        url = (function () {
          if (nativeURL) return new origURL(url, base).href;
          var iframe;
          try {
            var doc;
            // Use another document/base tag/anchor for relative URL resolution, if possible
            if (Object.prototype.toString.call(window.operamini) === "[object OperaMini]") {
              iframe = document.createElement('iframe');
              iframe.style.display = 'none';
              document.documentElement.appendChild(iframe);
              doc = iframe.contentWindow.document;
            } else if (document.implementation && document.implementation.createHTMLDocument) {
              doc = document.implementation.createHTMLDocument('');
            } else if (document.implementation && document.implementation.createDocument) {
              doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
              doc.documentElement.appendChild(doc.createElement('head'));
              doc.documentElement.appendChild(doc.createElement('body'));
            } else if (window.ActiveXObject) {
              doc = new window.ActiveXObject('htmlfile');
              doc.write('<head><\/head><body><\/body>');
              doc.close();
            }

            if (!doc) throw Error('base not supported');

            var baseTag = doc.createElement('base');
            baseTag.href = base;
            doc.getElementsByTagName('head')[0].appendChild(baseTag);
            var anchor = doc.createElement('a');
            anchor.href = url;
            return anchor.href;
          } finally {
            if (iframe)
              iframe.parentNode.removeChild(iframe);
          }
        }());
      }

      // An inner object implementing URLUtils (either a native URL
      // object or an HTMLAnchorElement instance) is used to perform the
      // URL algorithms. With full ES5 getter/setter support, return a
      // regular object For IE8's limited getter/setter support, a
      // different HTMLAnchorElement is returned with properties
      // overridden

      var instance = URLUtils(url || '');

      // Detect for ES5 getter/setter support
      // (an Object.defineProperties polyfill that doesn't support getters/setters may throw)
      var ES5_GET_SET = (function() {
        if (!('defineProperties' in Object)) return false;
        try {
          var obj = {};
          Object.defineProperties(obj, { prop: { 'get': function () { return true; } } });
          return obj.prop;
        } catch (_) {
          return false;
        }
      }());

      var self = ES5_GET_SET ? this : document.createElement('a');



      var query_object = new URLSearchParams(
        instance.search ? instance.search.substring(1) : null);
      query_object._url_object = self;

      Object.defineProperties(self, {
        href: {
          get: function () { return instance.href; },
          set: function (v) { instance.href = v; tidy_instance(); update_steps(); },
          enumerable: true, configurable: true
        },
        origin: {
          get: function () {
            if ('origin' in instance) return instance.origin;
            return this.protocol + '//' + this.host;
          },
          enumerable: true, configurable: true
        },
        protocol: {
          get: function () { return instance.protocol; },
          set: function (v) { instance.protocol = v; },
          enumerable: true, configurable: true
        },
        username: {
          get: function () { return instance.username; },
          set: function (v) { instance.username = v; },
          enumerable: true, configurable: true
        },
        password: {
          get: function () { return instance.password; },
          set: function (v) { instance.password = v; },
          enumerable: true, configurable: true
        },
        host: {
          get: function () {
            // IE returns default port in |host|
            var re = {'http:': /:80$/, 'https:': /:443$/, 'ftp:': /:21$/}[instance.protocol];
            return re ? instance.host.replace(re, '') : instance.host;
          },
          set: function (v) { instance.host = v; },
          enumerable: true, configurable: true
        },
        hostname: {
          get: function () { return instance.hostname; },
          set: function (v) { instance.hostname = v; },
          enumerable: true, configurable: true
        },
        port: {
          get: function () { return instance.port; },
          set: function (v) { instance.port = v; },
          enumerable: true, configurable: true
        },
        pathname: {
          get: function () {
            // IE does not include leading '/' in |pathname|
            if (instance.pathname.charAt(0) !== '/') return '/' + instance.pathname;
            return instance.pathname;
          },
          set: function (v) { instance.pathname = v; },
          enumerable: true, configurable: true
        },
        search: {
          get: function () { return instance.search; },
          set: function (v) {
            if (instance.search === v) return;
            instance.search = v; tidy_instance(); update_steps();
          },
          enumerable: true, configurable: true
        },
        searchParams: {
          get: function () { return query_object; },
          enumerable: true, configurable: true
        },
        hash: {
          get: function () { return instance.hash; },
          set: function (v) { instance.hash = v; tidy_instance(); },
          enumerable: true, configurable: true
        },
        toString: {
          value: function() { return instance.toString(); },
          enumerable: false, configurable: true
        },
        valueOf: {
          value: function() { return instance.valueOf(); },
          enumerable: false, configurable: true
        }
      });

      function tidy_instance() {
        var href = instance.href.replace(/#$|\?$|\?(?=#)/g, '');
        if (instance.href !== href)
          instance.href = href;
      }

      function update_steps() {
        query_object._setList(instance.search ? urlencoded_parse(instance.search.substring(1)) : []);
        query_object._update_steps();
      }

      return self;
    }

    if (origURL) {
      for (var i in origURL) {
        if (origURL.hasOwnProperty(i) && typeof origURL[i] === 'function')
          URL[i] = origURL[i];
      }
    }

    global.URL = URL;
    global.URLSearchParams = URLSearchParams;
  }());

  // Patch native URLSearchParams constructor to handle sequences/records
  // if necessary.
  (function() {
    if (new global.URLSearchParams([['a', 1]]).get('a') === '1' &&
        new global.URLSearchParams({a: 1}).get('a') === '1')
      return;
    var orig = global.URLSearchParams;
    global.URLSearchParams = function(init) {
      if (init && typeof init === 'object' && isSequence(init)) {
        var o = new orig();
        toArray(init).forEach(function(e) {
          if (!isSequence(e)) throw TypeError();
          var nv = toArray(e);
          if (nv.length !== 2) throw TypeError();
          o.append(nv[0], nv[1]);
        });
        return o;
      } else if (init && typeof init === 'object') {
        o = new orig();
        Object.keys(init).forEach(function(key) {
          o.set(key, init[key]);
        });
        return o;
      } else {
        return new orig(init);
      }
    };
  }());

}(self));
})
.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

/*
 * HTTP 요청을 보냅니다.
 */
global.REQUEST = METHOD({

	run : function(params, responseListenerOrListeners) {
		//REQUIRED: params
		//REQUIRED: params.method	요청 메소드. GET, POST, PUT, DELETE를 설정할 수 있습니다.
		//OPTIONAL: params.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.uri
		//OPTIONAL: params.url		요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: params.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: params.params	데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: params.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: params.headers	요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		var method = params.method;
		var isSecure = params.isSecure === undefined ? BROWSER_CONFIG.isSecure : params.isSecure;
		var host = params.host === undefined ? BROWSER_CONFIG.host : params.host;
		var port = params.port === undefined ? (params.host === undefined ? BROWSER_CONFIG.port : 80) : params.port;
		var uri = params.uri;
		var url = params.url;
		var paramStr = params.paramStr;
		var _params = params.params;
		var data = params.data;
		var headers = params.headers;
		
		var responseListener;
		var errorListener;

		method = method.toUpperCase();
		
		if (url !== undefined) {
			
			if (url.indexOf('?') !== -1) {
				paramStr = url.substring(url.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				url = url.substring(0, url.indexOf('?'));
			}
			
			isSecure = undefined;
			host = undefined;
			port = undefined;
			
		} else {
			
			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}
		}
		
		if (_params !== undefined) {
			
			EACH(_params, function(value, name) {
				
				if (paramStr === undefined) {
					paramStr = '';
				} else {
					paramStr += '&';
				}
				
				paramStr += encodeURIComponent(name) + '=' + encodeURIComponent(value);
			});
		}
		
		if (data !== undefined) {
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();
		
		if (url === undefined) {
			url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + (uri === undefined ? '' : (uri[0] === '/' ? uri.substring(1) : uri));
		}
		
		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}
		
		(method === 'GET' || method === 'DELETE' ? fetch(url + '?' + paramStr, {
			method : method,
			credentials : undefined,
			headers : new Headers(headers === undefined ? {} : headers)
		}) : fetch(url, {
			method : method,
			body : paramStr,
			credentials : undefined,
			headers : new Headers(headers === undefined ? {} : headers)
		}))
		.then(function(response) {
			if (response.status === 200) {
				return response.text();
			} else {
				var errorMsg = 'HTTP RESPONSE STATUS CODE: ' + response.status;

				if (errorListener !== undefined) {
					errorListener(errorMsg, response.status);
				} else {
					SHOW_ERROR('REQUEST', errorMsg, params);
				}
			}
		}, function(error) {
			
			var errorMsg = error.toString();

			if (errorListener !== undefined) {
				errorListener(errorMsg);
			} else {
				SHOW_ERROR('REQUEST', errorMsg, params);
			}
			
			responseListener = undefined;
		})
		.then(function(responseText) {
			if (responseText !== undefined && responseListener !== undefined) {
				responseListener(responseText);
			}
		});
	}
});

/*
 * 아주 짧은 시간동안 반복해서 실행하는 로직을 작성할때 사용하는 LOOP 클래스
 */
global.LOOP = CLASS(function(cls) {
	
	var animationInterval;
	
	var infos = [];

	var fire = function() {
		
		if (animationInterval === undefined) {
			
			if (global.requestAnimationFrame !== undefined && global.performance !== undefined && performance.now !== undefined) {
				
				var beforeTime = performance.now() / 1000;
				
				var step;
				animationInterval = requestAnimationFrame(step = function(now) {
					
					var time = now / 1000;
					var deltaTime = time - beforeTime;
					
					if (deltaTime > 0) {
						
						for (var i = 0; i < infos.length; i += 1) {
							
							var info = infos[i];
							
							if (info.fps !== undefined && info.fps > 0) {
	
								if (info.timeSigma === undefined) {
									info.timeSigma = 0;
								}
	
								info.timeSigma += deltaTime;
								
								var frameSecond = 1 / info.fps;
								
								if (info.timeSigma >= frameSecond) {
									
									info.run(frameSecond);
									
									info.timeSigma -= frameSecond;
								}
							}
							
							else {
								info.run(deltaTime);
							}
						}
	
						beforeTime = time;
					}
					
					animationInterval = requestAnimationFrame(step);
				});
			}
			
			else {
				
				var beforeTime = Date.now() / 1000;
	
				animationInterval = INTERVAL(function() {
	
					var time = Date.now() / 1000;
					var deltaTime = time - beforeTime;
					
					if (deltaTime > 0) {

						for (var i = 0; i < infos.length; i += 1) {
	
							var info = infos[i];
	
							if (info.fps !== undefined && info.fps > 0) {
	
								if (info.timeSigma === undefined) {
									info.timeSigma = 0;
								}
								
								info.timeSigma += deltaTime;
								
								var frameSecond = 1 / info.fps;
								
								if (info.timeSigma >= frameSecond) {
									
									info.run(frameSecond);
									
									info.timeSigma -= frameSecond;
								}
							}
							
							else {
								info.run(deltaTime);
							}
						}
	
						beforeTime = time;
					}
				});
			}
		}
	};
	
	var stop = function() {

		if (infos.length <= 0) {
			
			if (global.requestAnimationFrame !== undefined && global.performance !== undefined && performance.now !== undefined) {
				cancelAnimationFrame(animationInterval);
			} else {
				animationInterval.remove();
			}
			
			animationInterval = undefined;
		}
	};

	return {

		init : function(inner, self, fps, run) {
			//OPTIONAL: fps
			//REQUIRED: run
			
			if (run === undefined) {
				run = fps;
				fps = undefined;
			}
			
			var info;
			
			var resume = self.resume = RAR(function() {
				
				infos.push(info = {
					fps : fps,
					run : run
				});
				
				fire();
			});
			
			var pause = self.pause = function() {
			
				REMOVE({
					array : infos,
					value : info
				});
				
				stop();
			};
			
			var changeFPS = self.changeFPS = function(fps) {
				//REQUIRED: fps
				
				info.fps = fps;
			};
			
			var clearFPS = self.clearFPS = function() {
				delete info.fps;
			};
			
			var getFPS = self.getFPS = function() {
				return info.fps;
			};
			
			var remove = self.remove = function() {
				pause();
			};
		}
	};
});

if (window.AudioContext === undefined) {
	
	/*
	 * 사운드 파일을 재생하는 SOUND 클래스
	 */
	global.SOUND = CLASS({
	
		init : function(inner, self, params, onEndHandler) {
			//REQUIRED: params
			//OPTIONAL: params.ogg
			//OPTIONAL: params.mp3
			//OPTIONAL: params.wav
			//OPTIONAL: params.isLoop
			//OPTIONAL: params.volume
			//OPTIONAL: onEndHandler

			var ogg = params.ogg;
			var mp3 = params.mp3;
			var wav = params.wav;
			var isLoop = params.isLoop;
			var volume = params.volume;
			
			if (volume === undefined) {
				volume = 0.8;
			}
			
			var eventMap = {};
			
			var audio = new Audio();
			
			if (ogg !== undefined && audio.canPlayType('audio/ogg') !== '') {
				audio.src = ogg;
			} else if (mp3 !== undefined) {
				audio.src = mp3;
			} else {
				audio.src = wav;
			}
			
			audio.volume = volume;
			audio.onended = onEndHandler;
			
			var isPlaying = false;
			
			var play = self.play = function(at) {
				//OPTIONAL: at
				
				audio.play();
				
				isPlaying = true;
				
				return self;
			};
			
			var checkIsPlaying = self.checkIsPlaying = function() {
				return isPlaying;
			};
			
			var getStartAt = self.getStartAt = function() {
				return 0;
			};
			
			var pause = self.pause = function() {
				audio.pause();
				isPlaying = false;
			};
	
			var stop = self.stop = function() {
				pause();
				audio.currentTime = 0;
			};
			
			var setVolume = self.setVolume = function(volume) {
				//REQUIRED: volume
				
				audio.volume = volume;
			};
			
			var getVolume = self.getVolume = function() {
				return audio.volume;
			};
			
			var setPlaybackRate = self.setPlaybackRate = function(volume) {
				//REQUIRED: volume
				
				// ignore.
			};
			
			var fadeIn = self.fadeIn = function(seconds) {
				//REQUIRED: seconds
				
				play();
			};
			
			var fadeOut = self.fadeOut = function(seconds) {
				//REQUIRED: seconds
				
				stop();
			};
			
			var getDuration = self.getDuration = function() {
				return audio.duration;
			};
			
			var on = self.on = function(eventName, eventHandler) {
				//REQUIRED: eventName
				//REQUIRED: eventHandler
				
				if (eventMap[eventName] === undefined) {
					eventMap[eventName] = [];
				}
				
				eventMap[eventName].push(eventHandler);
				
				if (eventName === 'load') {
					fireEvent('load');
					off('load');
				}
			};
			
			var checkIsEventExists = self.checkIsEventExists = function(eventName) {
				//REQUIRED: eventName
				
				return eventMap[eventName] !== undefined;
			};
			
			var off = self.off = function(eventName, eventHandler) {
				//REQUIRED: eventName
				//OPTIONAL: eventHandler
	
				if (eventMap[eventName] !== undefined) {
	
					if (eventHandler !== undefined) {
	
						REMOVE({
							array: eventMap[eventName],
							value: eventHandler
						});
					}
	
					if (eventHandler === undefined || eventMap[eventName].length === 0) {
						delete eventMap[eventName];
					}
				}
			};
			
			var fireEvent = self.fireEvent = function(eventNameOrParams) {
				//REQUIRED: eventNameOrParams
				//REQUIRED: eventNameOrParams.eventName
				//OPTIONAL: eventNameOrParams.e
				
				var eventName;
				var e;
				
				if (CHECK_IS_DATA(eventNameOrParams) !== true) {
					eventName = eventNameOrParams;
				} else {
					eventName = eventNameOrParams.eventName;
					e = eventNameOrParams.e;
				}
				
				var eventHandlers = eventMap[eventName];
	
				if (eventHandlers !== undefined) {
					
					for (var i = 0; i < eventHandlers.length; i += 1) {
						eventHandlers[i](e === undefined ? EMPTY_E() : e, self);
					}
				}
			};
		}
	});
}

/*
 * 노드에 스타일을 지정합니다.
 */
global.ADD_STYLE = METHOD({
	
	run : function(params) {
		//REQUIRED: params
		//REQUIRED: params.node		스타일을 지정할 노드
		//REQUIRED: params.style	스타일 데이터

		var node = params.node;
		var style = params.style;
		var el = node.getWrapperEl();

		EACH(style, function(value, name) {
			
			if (value !== undefined) {

				// on display resize
				if (name === 'onDisplayResize') {

					var resizeEvent = EVENT({
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
					
					// flt -> float
					if (name === 'flt') {
						el.style.cssFloat = value;
					}

					// assume number value is px value.
					else if (typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
						el.style[name] = value + 'px';
					}
					
					// set background image. (not need url prefix.)
					else if (name === 'backgroundImage' && value !== 'none') {
						el.style[name] = 'url(' + value + ')';
					}
					
					// add -webkit- prefix.
					else if (name === 'transform') {
						el.style['-webkit-' + name] = value;
						el.style[name] = value;
					}

					// set normal style.
					else {
						el.style[name] = value;
					}
				}
			}
		});
	}
});

// 게임 패드를 지원하지 않습니다.
navigator.getGamepads = function() {
	return [];
};