var scrapper   = require('./lib/scrapper');
var sanitizer  = require('./lib/sanitizer');
var writer     = require('./lib/writer');

var options = {
    keywords: ['foot'],
    escapes: [],
    cms: 'wordpress'
};

console.log("\r\nPlease wait.\r\n");
scrapper.search(options, function(err, links) {
    if (err) {
        console.error(JSON.stringify(err));
    }
    // Sanitizes the links
    done(sanitizer(links));
});

var done = function(links) {
    console.log("Done!");

    // Finally, saves the links into a json file
    writer(options.keywords.join('-'), links, function(err) {
        if (phantom) {
            return phantom.exit(0);
        }
        process.exit(0);
    });
};
