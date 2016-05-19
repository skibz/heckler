
'use strict';

var pool = require('./lib/pool.js');
var connection = require('./lib/connection.js');

var _sqlMock = [];

exports.passMockObject = function(mockObj) {
  if (mockObj != undefined && Array.isArray(mockObj)) {
    _sqlMock = mockObj;
  }
};

/**
 * Create a new Connection instance.
 * @param {object} config
 * @public
 */
exports.createConnection = function(config, sqlMock) {
  return new connection(config, sqlMock || _sqlMock)
};

/**
 * Create a new Pool instance.
 * @param {object} config
 * @public
 */
exports.createPool = function(config, sqlMock) {
  return new pool(config, sqlMock || _sqlMock);
};
