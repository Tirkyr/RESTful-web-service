const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app');

const uri = process.MONGO_URI || 'mongodb://localhost:27017/bookAPI';
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
const db = mongoose.connect(uri)
  .then(debug('Connected to mongoDB'))
  .catch((err) => debug(err));

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

bookRouter.route('/books')
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API');
});

app.listen(port, () => {
  debug(`Running on port ${port}`);
});
