var where = require("lodash.where")
var fs = require('fs')
var rmb = require('../rmb')

var json = JSON.stringify(rmb)
var resolved = where(json, {status: 'resolved'})

module.exports = resolved