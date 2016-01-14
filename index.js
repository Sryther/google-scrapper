var scrapper   = require('./lib/scrapper');
var sanitizer  = require('./lib/sanitizer');
var identifier = require('./lib/identifier');
var writer     = require('./lib/writer');

var options = {
    keywords: ['plancha'],
    escapes: [],
    cms: 'dotclear',
    iterations: 10
};

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

            if (i == links.length - 1) {
                return done(links); // Process ended
            }
        });
    });
});

var done = function(links) {
    writer(options.keywords.join('-'), links, function(err) {
        process.exit();
    });
};
