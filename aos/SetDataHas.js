'use strict';

var $TypeError = require('es-errors/type');

var IsArray = require('es-abstract/2023/IsArray');
var SameValueZero = require('es-abstract/2023/SameValueZero');

var some = require('es-abstract/helpers/some');

module.exports = function SetDataHas(resultSetData, value) {
	if (!IsArray(resultSetData)) {
		throw new $TypeError('`resultSetData` must be a List');
	}

	return some(resultSetData, function (e) {
		return SameValueZero(e, value);
	});
};
