'use strict';

var Set = require('es-set/polyfill')();

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Set.prototype.difference === 'function' ? Set.prototype.difference : implementation;
};
