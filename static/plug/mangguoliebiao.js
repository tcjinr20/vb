var util = require('util')
var Code = require('./code')
const fs = require('fs')
var MangGuo = module.exports =function (jquery) {
  $ = jquery
  this.init()

}
util.inherits(MangGuo, Code)