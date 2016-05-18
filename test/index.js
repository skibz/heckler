
'use strict'

var chai = require('chai')
var expect = chai.expect;
var heckler = require('../');

describe('heckler', function() {
  it('should be a valid object', function() {
    expect(heckler).to.be.an.instanceof(Object)
  });
});

describe('heckler public interface', function() {

  describe('#passMockObject', function() {
    it('should accept an array of objects', function() {
      var queries = [{query: 'abc', result: []}];
      heckler.passMockObject(queries)
      var connection = heckler.createConnection()
      expect(connection.sqlMock).to.deep.equal(queries)
    })
  })

  describe('#createConnection', function() {
    it('should emit an event when the connection is established', function(done) {
      heckler.createConnection().on('connection', done.bind(done, null))
    })
    it('should return an object with #query, #connect, #release, #destroy and #end', function() {
      var connection = heckler.createConnection()
      expect(connection.query).to.be.ok
      expect(connection.connect).to.be.ok
      expect(connection.release).to.be.ok
      expect(connection.destroy).to.be.ok
      expect(connection.end).to.be.ok
    })
  })

  describe('#createPool', function() {
    it('should emit an event when the pool is established', function(done) {
      var pool = heckler.createPool({
        connectionLimit: 30,
        host: 'someaddress',
        user: 'someusername',
        password: 'somepassword',
        database: 'somedatabase',
        port: 'someport'
      }).on('connection', done.bind(done, null))
    })
    it('should return an object with #getConnection', function() {
      expect(heckler.createPool({
        connectionLimit: 30,
        host: 'someaddress',
        user: 'someusername',
        password: 'somepassword',
        database: 'somedatabase',
        port: 'someport'
      }).getConnection).to.be.an.instanceof(Function);
    })

    describe('#getConnection', function() {
      it('should return a connection object', function() {
        heckler.createPool({
          connectionLimit: 30,
          host: 'someaddress',
          user: 'someusername',
          password: 'somepassword',
          database: 'somedatabase',
          port: 'someport'
        }).getConnection(function(err, connection) {
          expect(connection.query).to.be.ok
          expect(connection.connect).to.be.ok
          expect(connection.release).to.be.ok
          expect(connection.destroy).to.be.ok
          expect(connection.end).to.be.ok
        })
      })
    })
  })
});

describe('heckler queries', function() {
  it('should be able to mock a query', function(done) {
    heckler.passMockObject([{
      query: 'abc',
      result: [{id: 1}]
    }])
    heckler.createConnection({
      connectionLimit: 30,
      host: 'someaddress',
      user: 'someusername',
      password: 'somepassword',
      database: 'somedatabase',
      port: 'someport'
    }).query('abc', [], function(err, rows, fields) {
      expect(err).to.not.be.ok
      expect(rows.length).to.equal(1)
      expect(fields).to.not.be.ok
      done()
    });
  })
})
