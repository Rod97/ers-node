var where = require("lodash.where")
var fs = require('fs');

var json = JSON.parse(fs.readFileSync('../rmb.txt', 'utf8'));
var pending = where(json, {status: 'pending'})

module.exports = pending