"use strict";

/**
 * Helper for getting a reproducible, key-sorted string representation of object.
 * Used to interpret an object as a falcor key.
 * @function
 * @param {Object} obj
 * @return stringified object with sorted keys.
 */
function toJsonKey(obj) {
    if (Object.prototype.toString.call(obj) === "[object Object]") {
        var key = JSON.stringify(obj, replacer);
        if (key[0] === "{") {
            return key;
        }
    }
    throw new TypeError("Only plain objects can be converted to JSON keys")
}

function replacer(key, value) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return value;
    }
    return Object.keys(value)
        .sort()
        .reduce(function (acc, k) {
            acc[k] = value[k];
            return acc;
        }, {});
}

function maybeJsonKey(key) {
    if (typeof key !== 'string' || key[0] !== '{') {
        return;
    }
    var parsed;
    try {
        parsed = JSON.parse(key);
    } catch (e) {
        return;
    }
    if (JSON.stringify(parsed, replacer) !== key) {
        return;
    }
    return parsed;
}

function isJsonKey(key) {
    return typeof maybeJsonKey(key) !== "undefined";
}

module.exports.toJsonKey = toJsonKey;
module.exports.isJsonKey = isJsonKey;
module.exports.maybeJsonKey = maybeJsonKey;
