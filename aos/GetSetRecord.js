'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('es-abstract/2023/Get');
var IsCallable = require('es-abstract/2023/IsCallable');
var ToIntegerOrInfinity = require('es-abstract/2023/ToIntegerOrInfinity');
var ToNumber = require('es-abstract/2023/ToNumber');
var Type = require('es-abstract/2023/Type');

var isNaN = require('es-abstract/helpers/isNaN');

var callBind = require('call-bind');
var isSet = require('is-set');
var stopIterationIterator = require('stop-iteration-iterator');

module.exports = function GetSetRecord(obj) {
	if (Type(obj) !== 'Object') {
		throw new $TypeError('obj is not an Object'); // step 1
	}

	var rawSize = Get(obj, 'size'); // step 2

	var numSize = ToNumber(rawSize); // step 3

	//  4. NOTE: If rawSize is undefined, then numSize will be NaN.
	if (isNaN(numSize)) {
		throw new $TypeError('size is not a non-NaN Number'); // step 5
	}

	var intSize = ToIntegerOrInfinity(numSize); // step 6

	var has = Get(obj, 'has'); // step 7

	if (!IsCallable(has)) {
		throw new $TypeError('has is not a function'); // step 8
	}

	var keys = Get(obj, 'keys'); // step 9
	if (!IsCallable(keys)) {
		throw new $TypeError('keys is not a function'); // step 10
	}
	/* globals StopIteration: false */
	if (isSet(obj) && typeof StopIteration === 'object') {
		var boundKeys = callBind(keys);
		keys = function keys() { // eslint-disable-line func-name-matching, no-shadow
			return stopIterationIterator(boundKeys(this)); // eslint-disable-line no-invalid-this
		};
	}

	return { '[[Set]]': obj, '[[Size]]': intSize, '[[Has]]': has, '[[Keys]]': keys }; // step 11
};
