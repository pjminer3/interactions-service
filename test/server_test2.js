const { expect } = require('chai');
const supertest = require('supertest');
const server = require('../server'); // gets the server running

const api = supertest('http://localhost:3000');

describe('Server', () => {
  it('should return a 200 response from /feed/8', (done) => {
    api.get('/feed/8')
      .expect(200, done);
  });

  // Why doesn't res.body equal 8? it equals {};
  it('should return a 200 response from /feed/8 with a test value of "8" (the user_id)', (done) => {
    api.get('/feed/8')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.equal('8');
        done();
      });
  });


  it('should return a 200 response from /user/friends', (done) => {
    api.post('/user/friends')
      .expect(200, done);
  });

  it('should return 200 response from /tweets/events', (done) => {
    api.post('/tweets/events')
      .expect(200, done);
  });

  it('should return 200 response from /tweets/events', (done) => {
    api.post('/tweets/evesdfsnts')
      .expect(200, done);
  });
  // this test should fail


});
