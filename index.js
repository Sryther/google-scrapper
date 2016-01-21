var scrapper   = require('./lib/scrapper');
var sanitizer  = require('./lib/sanitizer');
var identifier = require('./lib/identifier');
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
    links = sanitizer(links);

    var i = 0;
    // Loops through the links to identify the CMS
    links.forEach(function(link, key) {
        identifier.identify(link.url, function(err, cms) {
            if (err) {
                console.error(JSON.stringify(err));
            }
            i++;

            links[key].cms = cms || options.cms;
            // Once it's ended, call the last function to terminate the program
            if (i == links.length) {
                return done(links); // Process ended
            }
        });
    });
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
