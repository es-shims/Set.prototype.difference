'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('es-abstract/2022/Call');
var Get = require('es-abstract/2022/Get');
var IsCallable = require('es-abstract/2022/IsCallable');
var Type = require('es-abstract/2022/Type');

// var assertRecord = require('es-abstract/helpers/assertRecord');

module.exports = function GetKeysIterator(setRec) {
	// assertRecord(setRec, 'Set');
	if (Type(setRec) !== 'Object' || !('[[Set]]' in setRec) || !('[[Size]]' in setRec) || !('[[Has]]' in setRec) || !('[[Keys]]' in setRec)) {
		throw new $TypeError('`setRec` must be a Set Record');
	}

	var keysIter = Call(setRec['[[Keys]]'], setRec['[[Set]]']); // step 1
	if (Type(keysIter) !== 'Object') {
		throw new $TypeError('obj is not an Object'); // step 2
	}

	var nextMethod = Get(keysIter, 'next'); // step 3
	if (!IsCallable(nextMethod)) {
		throw new $TypeError('`next` is not a function'); // step 4
	}

	return { '[[Iterator]]': keysIter, '[[NextMethod]]': nextMethod, '[[Done]]': false }; // step 5
};
