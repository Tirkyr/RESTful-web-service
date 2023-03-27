const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app');

const uri = process.MONGO_URI || 'mongodb://localhost:27017/bookAPI';
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

if (process.env.ENV === 'Test') {
  const db = mongoose.connect(`${uri}_Test`)
    .then(debug('Connected to bookAPI_Test'))
    .catch((err) => debug(err));
} else {
  const db = mongoose.connect(uri)
    .then(debug('Connected to bookAPI'))
    .catch((err) => debug(err));
}

const app = express();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API');
});

app.server = app.listen(port, () => {
  debug(`Running on port ${port}`);
});

module.exports = app;
