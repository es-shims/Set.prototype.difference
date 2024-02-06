'use strict';

var tools = require('es-set/tools');
var $setSize = tools.size;

module.exports = function SetDataSize(setData) {
	return $setSize(setData);
};
