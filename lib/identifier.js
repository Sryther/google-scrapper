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

exports.identify = function(url, callback) {
    var cms = null;
    casper
    .start(url)
    .then(function() {
        cms = this.evaluate(search);
    }).run(function() {
        if (!cms) {
            cms = 'Not identified';
        }
        callback(null, cms);
    });
};

var search = function() {
    var generator = document.querySelectorAll("#footer");
    if (generator && generator.length > 0) {
        footprints.forEach(function(footprint, key) {
            footprint.regexs.forEach(function(regex, key) {
                if (generator[0].getAttribute('content').match(regex)) {
                    return footprint.name;
                }
            });
        });
    }
    return null;
};
