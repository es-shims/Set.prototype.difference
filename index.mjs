import callBind from 'call-bind';
import RequireObjectCoercible from 'es-abstract/2022/RequireObjectCoercible.js';

import getPolyfill from 'set.prototype.difference/polyfill';

const bound = callBind(getPolyfill());

export default function difference(set, other) {
	RequireObjectCoercible(set);
	return bound(set, other);
}

export { default as getPolyfill } from 'set.prototype.difference/polyfill';
export { default as implementation } from 'set.prototype.difference/implementation';
export { default as shim } from 'set.prototype.difference/shim';
