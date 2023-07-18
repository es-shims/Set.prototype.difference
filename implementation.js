'use strict';

// Note: the commented out code is because there is no performant way in userland to do the optimization in step 7.

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $Set = require('es-set/polyfill')();

var Call = require('es-abstract/2023/Call');
var GetIteratorFromMethod = require('es-abstract/2023/GetIteratorFromMethod');
var GetSetRecord = require('./aos/GetSetRecord');
var IteratorStep = require('es-abstract/2023/IteratorStep');
var IteratorValue = require('es-abstract/2023/IteratorValue');
// var SetDataHas = require('./aos/SetDataHas');
var ToBoolean = require('es-abstract/2023/ToBoolean');

var isSet = require('is-set');

var tools = require('es-set/tools');
var $setForEach = tools.forEach;
var $setAdd = tools.add;
var $setSize = tools.size;

module.exports = function difference(other) {
	var O = this; // step 1

	// RequireInternalSlot(O, [[SetData]]); // step 2
	if (!isSet(O) && !(O instanceof $Set)) {
		throw new $TypeError('Method Set.prototype.difference called on incompatible receiver ' + O);
	}

	var otherRec = GetSetRecord(other); // step 3

	var thisSize = $setSize(O); // step 5

	var result = new $Set();

	// if (thisSize <= otherRec['[[Size]]']) { // step 6
	$setForEach(O, function (e) { // step 6.a
		var inOther = ToBoolean(Call(otherRec['[[Has]]'], otherRec['[[Set]]'], [e])); // step 6.a.i.1
		if (!inOther) { // step 6.a.i.2 (kinda)
			$setAdd(result, e); // step 6.a.i.2.a (kinda)
		}
	});
	// } else { // step 7
	if (thisSize > otherRec['[[Size]]']) {
		var keysIter = GetIteratorFromMethod(otherRec['[[Set]]'], otherRec['[[Keys]]']); // step 7.a
		var next = true; // step 7.b
		while (next) { // step 7.c
			next = IteratorStep(keysIter); // step 7.c.i
			if (next) { // step 7.c.ii
				var nextValue = IteratorValue(next); // step 7.c.ii.1
				if (nextValue === 0) { // step 7.c.ii.2
					nextValue = +0;
				}
			/*
			if (SetDataHas(resultSetData, nextValue)) { // step 7.c.ii.3
				// $push(resultSetData, nextValue); // step 7.c.ii.6.a
				// a. Remove nextValue from resultSetData.
			}
			*/
			}
		}
	/*
		forEach(resultSetData, function (e) {
			$setAdd(result, e);
		});
		*/
	}

	// var result = OrdinaryObjectCreate(%Set.prototype%, « [[SetData]] »); // step 8

	// result.[[SetData]] = resultSetData; // step 9

	return result; // step 10

};
