"use strict";
var MAX_SAFE_INTEGER = 9007199254740991; // Number.MAX_SAFE_INTEGER in es6
var abs = Math.abs;
var isSafeInteger = Number.isSafeInteger || function isSafeInteger(num) {
    return typeof num === "number" && num % 1 === 0 && abs(num) <= MAX_SAFE_INTEGER;
}

/**
 * Return number if argument is a number or can be cast to a number which
 * roundtrips to the same string, otherwise return undefined.
 */
function maybeIntegerKey(val) {
    if (typeof val === "string") {
        var num = Number(val);
        if(isSafeInteger(num) && String(num) === val) {
            return num;
        }
    } else if (isSafeInteger(val)) {
        return val;
    }
}

/**
 * Return true if argument is a number or can be cast to a number which
 * roundtrips to the same string.
 */
function isIntegerKey(val) {
    if (typeof val === "string") {
        var num = Number(val);
        return isSafeInteger(num) && String(num) === val;
    }
    return isSafeInteger(val);
}

module.exports.isIntegerKey = isIntegerKey;
module.exports.maybeIntegerKey = maybeIntegerKey;
