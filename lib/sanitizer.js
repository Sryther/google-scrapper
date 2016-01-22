var _ = require('lodash');

/**
 * Sanitize the urls
 * @param  {array} rows An array of urls
 * @return {array}      The santized array
 */
module.exports = function(rows) {
    rows.forEach(function(row, key) {
        // Removes unwanted string begining and google query parameters
        rows[key] = row.slice(7).split('%3Fp')[0].split('&')[0];
    });

    return _.uniq(rows);
};

/**
 * Return the domain TLD of an url
 * @param  {string} url The url
 * @return {string}     TLD
 */
var getDomain = function(url) {
    var tldRegexp = /(http|https):\/\/((\w*\.)+)(\w+)\//;

    var match = url.match(tldRegexp);
    if (match) {
        return match[0];
    }
    return null;
};
