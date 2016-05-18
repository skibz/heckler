
'use strict'

var heckler = require('./');

var mockObj = [{
  query: 'SELECT * FROM tblConfig',
  result: [{
    'id': 1,
    'version_major': 0,
    'version_minor': 2
  }]
}];

heckler.passMockObject(mockObj);

var pool = heckler.createPool({
  connectionLimit: 30,
  host: 'someaddress',
  user: 'someusername',
  password: 'somepassword',
  database: 'somedatabase',
  port: 'someport'
});

pool.on('connection', function() {
  console.log('pool established');
});

pool.getConnection(function(err, connection) {
  if (err) return console.log('error');
  console.log('connection');
  connection.query(mockObj[0].query, function(err, rows) {
    console.log('correct query rows', rows);
  });
  connection.query('Wrong Query', function(err, rows) {
    console.log('wrong query rows', rows);
  });
  connection.on('connection', function() {
    console.log('connection etablished');
  });
});

