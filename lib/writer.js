var fs = require('fs');

/**
 * Write the output file
 * @param  {string}   search   The search, used to name the file
 * @param  {array}   data      The data to write
 * @param  {Function} callback Called when the file is written
 */
module.exports = function(search, data, callback) {
    fs.write('./out/' + search + '.json', JSON.stringify(data), callback);
};
