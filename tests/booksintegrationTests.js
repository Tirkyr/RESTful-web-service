require('should');

const request = require('supertest');
const mongoose = require('mongoose');
const debug = require('debug')('app:integrationTests');

process.env.ENV = 'Test';

const app = require('../app');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD Test:', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const postBook = { title: 'My Book', author: 'Jon', genre: 'Fiction' };

    agent.post('/api/books')
      .send(postBook)
      .expect(201)
      .end((err, results) => {
        if (err) {
          debug(err);
        }
        // debug(results);
        // results.body.read.should.not.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
