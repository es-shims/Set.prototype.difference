'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsArray = require('es-abstract/2022/IsArray');
var SameValueZero = require('es-abstract/2022/SameValueZero');

var some = require('es-abstract/helpers/some');

module.exports = function SetDataHas(resultSetData, value) {
	if (!IsArray(resultSetData)) {
		throw new $TypeError('`resultSetData` must be a List');
	}

	return some(resultSetData, function (e) {
		return SameValueZero(e, value);
	});
};
