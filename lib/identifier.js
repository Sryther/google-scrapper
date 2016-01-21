var casper = require('casper').create();
var footprints = [
    {
        "name": "Drupal",
        "regexs": [/Drupal/gi, /Powered by Drupal/gi]
    },
    {
        "name": "Wordpress",
        "regexs": [/WordPress/gi, /Powered by Wordpress/gi]
    },
    {
        "name": "DotClear",
        "regexs": [/DotClear/gi, /Powered by DotClear/gi, /Powered by <a href=\"http:\/\/www.dotclear.net\/\">DotClear<\/a>/gi]
    },
    {
        "name": "Magnolia",
        "regexs": [/var magnolia_assets_url/gi] // TOFIX
    }
];

/**
 * Identifies a CMS using an url
 * @param  {string}   url      The url of a website
 * @param  {Function} callback
 */
exports.identify = function(url, callback) {
    var cms = null;
    casper
    .start(url)
    .then(function() {
        cms = this.evaluate(search);
    }).run(function() {
        callback(null, cms);
    });
};

/**
 * Loops through the known footprints to search the CMS
 * @param  {string} html The full HTML of the website
 * @return {string}      The CMS, if found
 */
var search = function() {
    var html = document.body;
    if (html) {
        footprints.forEach(function(footprint, key) {
            footprint.regexs.forEach(function(regex, key) {
                if (html.match(regex)) {
                    return footprint.name;
                }
            });
        });
    }
    return null;
};
