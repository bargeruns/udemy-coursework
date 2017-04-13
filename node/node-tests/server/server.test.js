const request = require('supertest');

const app = require('./server').app;

describe('server tests', () => {
  it('should return welcome test when accessing index route', (done) => {
    request(app)
      .get('/')
      .expect('Hello world!')
      .end(done);
  });

});
