module.exports = function(rows) {
    rows.forEach(function(row, key) {
        rows[key].url = row.url.slice(7);
    });

    return rows;
};
