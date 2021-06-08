var where = require("lodash.where")
var fs = require('fs')
var rmb = require('../rmb')

var json = JSON.stringify(rmb)
var pending = where(json, {status: 'pending'})

module.exports = pending