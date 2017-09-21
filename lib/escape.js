/**
 * Escapes a string by prefixing it with "_". This function should be used on
 * untrusted input before it is embedded into paths. The goal is to ensure that
 * no reserved words (ex. "$type") make their way into paths and consequently
 * JSON Graph objects.
 */
module.exports = function escape(str) {
    return "_" + str;
};
