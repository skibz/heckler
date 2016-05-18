
'use strict'

// var events = require('events');
// var Util = require('util');
var mysqlConnectionMock = require('./mysqlConnectionMock.js');

var mysqlPoolMock = function(config, sqlMock) {
  // events.EventEmitter.call(this);
  this.config = config;
  this.sqlMock = sqlMock;
};

// Util.inherits(mysqlPoolMock, events.EventEmitter);

mysqlPoolMock.prototype.end = function(onend) {
  return onend();
};

mysqlPoolMock.prototype.getConnection = function(cb) {
  cb(null, new mysqlConnectionMock(this.config, this.sqlMock))
};

module.exports = mysqlPoolMock;
