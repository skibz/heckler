
'use strict'

var events = require('events');
var Util = require('util');
var connection = require('./connection.js');

var pool = function(config, sqlMock) {
  events.EventEmitter.call(this);
  this.config = config;
  this.sqlMock = sqlMock
  setImmediate(function() {
    this.emit('connection', this)
  }.bind(this))
};

Util.inherits(pool, events.EventEmitter);

pool.prototype.end = function(onend) {
  return onend();
};

pool.prototype.getConnection = function(cb) {
  cb(null, new connection(this.config, this.sqlMock))
};

module.exports = pool;
