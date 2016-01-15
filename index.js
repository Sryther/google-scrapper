var scrapper   = require('./lib/scrapper');
var sanitizer  = require('./lib/sanitizer');
var identifier = require('./lib/identifier');
var writer     = require('./lib/writer');

var options = {
    keywords: ['foot'],
    escapes: [],
    cms: 'wordpress'
};

console.log("Wait.");
scrapper.search(options, function(err, links) {
    if (err) {
        console.error(JSON.stringify(err));
    }
    links = sanitizer(links);
    var i = 0;
    links.forEach(function(link, key) {
        identifier.identify(link.url, function(err, cms) {
            i++;
            if (err) {
                console.error(JSON.stringify(err));
            }
            links[key].cms = cms;
            if (i == links.length) {
                return done(links); // Process ended
            }
        });
    });
});

var done = function(links) {
    console.log("Done!");
    writer(options.keywords.join('-'), links, function(err) {
        console.log(links);
        process.exit();
    });
};
