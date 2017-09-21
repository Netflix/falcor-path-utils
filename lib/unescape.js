/**
 * Unescapes a string by removing the leading "_". This function is the inverse
 * of escape, which is used to encode untrusted input to ensure it
 * does not contain reserved JSON Graph keywords (ex. "$type").
 */
module.exports = function unescape(str) {
    if (str.slice(0, 1) === "_") {
        return str.slice(1);
    } else {
        throw SyntaxError("Expected \"_\".");
    }
};
