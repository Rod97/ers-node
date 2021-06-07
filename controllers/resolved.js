var where = require("lodash.where")
var fs = require('fs');

var json = JSON.parse(fs.readFileSync('../rmb.txt', 'utf8'));
var resolved = where(json, {status: 'resolved'})

module.exports = resolved