'use strict';

// Note: the commented out code is because there is no performant way in userland to do the optimization in step 6.

var $TypeError = require('es-errors/type');

var $Set = require('es-set/polyfill')();

var Call = require('es-abstract/2023/Call');
var GetIteratorFromMethod = require('es-abstract/2023/GetIteratorFromMethod');
var GetSetRecord = require('./aos/GetSetRecord');
var IteratorStep = require('es-abstract/2023/IteratorStep');
var IteratorValue = require('es-abstract/2023/IteratorValue');
var SameValueZero = require('es-abstract/2023/SameValueZero');
// var SetDataHas = require('./aos/SetDataHas');
var SetDataSize = require('./aos/SetDataSize');
var ToBoolean = require('es-abstract/2023/ToBoolean');

var callBound = require('call-bind/callBound');
var isSet = require('is-set');
var forEach = require('es-abstract/helpers/forEach');

var tools = require('es-set/tools');
var $setForEach = tools.forEach;
var $setAdd = tools.add;

var $push = callBound('.Array.prototype.push');

var deleted = {};

module.exports = function difference(other) {
	var O = this; // step 1

	// RequireInternalSlot(O, [[SetData]]); // step 2
	if (!isSet(O) && !(O instanceof $Set)) {
		throw new $TypeError('Method Set.prototype.difference called on incompatible receiver ' + O);
	}

	var otherRec = GetSetRecord(other); // step 3

	var thisSize = SetDataSize(O); // step 5.a

	var result = new $Set();

	if (thisSize <= otherRec['[[Size]]']) { // step 5
		$setForEach(O, function (e) { // step 5.a
			var inOther = ToBoolean(Call(otherRec['[[Has]]'], otherRec['[[Set]]'], [e])); // step 5.a.i.1
			if (!inOther) { // step 5.a.i.2 (kinda)
				$setAdd(result, e); // step 5.a.i.2.a (kinda)
			}
		});
	} else { // step 6
		var keysIter = GetIteratorFromMethod(otherRec['[[Set]]'], otherRec['[[Keys]]']); // step 6.a
		var resultSetData = [];
		$setForEach(O, function (e) {
			$push(resultSetData, e);
		});
		var next = true; // step 6.b
		while (next) { // step 6.c
			next = IteratorStep(keysIter); // step 6.c.i
			if (next) { // step 6.c.ii
				var nextValue = IteratorValue(next); // step 6.c.ii.1
				if (nextValue === 0) { // step 6.c.ii.2
					nextValue = +0;
				}

				// if (SetDataHas(resultSetData, nextValue)) { // step 6.c.ii.3
				for (var i = 0; i < resultSetData.length; i += 1) {
					// eslint-disable-next-line max-depth
					if (SameValueZero(resultSetData[i], nextValue)) {
						resultSetData[i] = deleted;
					}
				}
				// }
			}
		}

		forEach(resultSetData, function (e) {
			if (e !== deleted) {
				$setAdd(result, e);
			}
		});
	}

	// var result = OrdinaryObjectCreate(%Set.prototype%, « [[SetData]] »); // step 7

	// result.[[SetData]] = resultSetData; // step 8

	return result; // step 9

};
