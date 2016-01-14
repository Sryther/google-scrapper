var fs = require('fs');

module.exports = function(search, data, callback) {
    fs.write(__dirname + '../out/' + search + '.json', data, callback);
};
