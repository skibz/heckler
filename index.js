
'use strict';

var mysqlPoolMock = require('./lib/mysqlPoolMock.js');
var mysqlConnectionMock = require('./lib/mysqlConnectionMock.js');

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
  return new mysqlConnectionMock(config, sqlMock)
};

/**
 * Create a new Pool instance.
 * @param {object} config
 * @public
 */
exports.createPool = function(config) {
  return new mysqlPoolMock(config, sqlMock);
};
