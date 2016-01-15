var fs = require('fs');

module.exports = function(search, data, callback) {
    fs.write('./out/' + search + '.json', JSON.stringify(data), callback);
};
