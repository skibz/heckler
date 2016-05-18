
'use strict';

var pool = require('./lib/pool.js');
var connection = require('./lib/connection.js');

var sqlMock = [];

exports.passMockObject = function(mockObj) {
  if (mockObj != undefined && Array.isArray(mockObj)) {
    sqlMock = mockObj;
  }
};

/**
 * Create a new Connection instance.
 * @param {object} config
 * @public
 */
exports.createConnection = function(config) {
  return new connection(config, sqlMock)
};

/**
 * Create a new Pool instance.
 * @param {object} config
 * @public
 */
exports.createPool = function(config) {
  return new pool(config, sqlMock);
};
