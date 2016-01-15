var _ = require('lodash');
module.exports = function(rows) {
    rows.forEach(function(row, key) {
        // Removes unwanted string begining and google query parameters
        rows[key].url = row.url.slice(7).split('%3Fp')[0].split('&')[0];
    });

    return _.uniq(rows);
};

var getDomain = function(url) {
    
};
