var where = require("lodash.where")
var fs = require('fs');

var json = JSON.parse(fs.readFileSync('file', 'utf8'));
var filter = where(json, {status: "pending"})

module.exports = filter