
'use strict'

var events = require('events');
var Util = require('util');

/**
 * @constructor
 */
var mysqlConnectionMock = function(config, sqlMock) {
  events.EventEmitter.call(this);
  this.config = config;
  this.sqlMock = sqlMock;
  this.emit('connection', this)
};

Util.inherits(mysqlConnectionMock, events.EventEmitter);

mysqlConnectionMock.prototype.query = function(sqlstr, params, onresults) {
  var err = null;
  var rows = [];
  for (var i = 0, len = this.sqlMock.length; i < len; i++) {
    var mockRow = this.sqlMock[i];
    if (mockRow.query == sqlstr) {
      rows = mockRow.result;
    }
  }
  return onresults(null, rows);
};

mysqlConnectionMock.prototype.connect = function(onconnect) {
  return onconnect()
};
mysqlConnectionMock.prototype.release = function(onrelease) {
  return onrelease()
};
mysqlConnectionMock.prototype.destroy = function(ondestroy) {
  return ondestroy()
};
mysqlConnectionMock.prototype.end = function(onend) {
  return onend()
};

module.exports = mysqlConnectionMock;
