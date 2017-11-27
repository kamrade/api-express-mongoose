// VENDORS
const express      = require('express');
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const logger       = require('morgan');
const errorHandler = require('errorhandler');
const app          = express();
const dbUri        = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/api';
const ok           = require('okay');

// INITIALS
const dbConnection = mongoose.createConnection(dbUri);
const Schema       = mongoose.Schema;

// MODELS
const postSchema   = require('./postModel');
let Post = dbConnection.model('Post', postSchema, 'posts');

const cardSchema   = require('./cardModel');
let Card = dbConnection.model('Card', cardSchema, 'cards');

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CARD ROUTES
app.get('/v2/cards', function(req, res, next) {
  Card.find({}, ok(next, function(cards) {
    res.send(cards);
  }));
});

app.post('/v2/cards', function(req, res, next) {
  let card = new Card(req.body);
  card.validate(ok(next, function(error) {
    card.save(ok(next, function(results) {
      res.send(results);
    }));
  }));
});


// ROUTES
app.get('/', function(req, res) {
  res.send('ok');
});

app.get('/posts', function(req, res, next) {
  Post.find({}, ok(next, function(posts) {
    res.send(posts);
  }));
});

app.get('/posts/:id', function(req, res, next) {
  Post.findOne({ _id: req.params.id }, ok(next, function (post) {
    res.send(post.toJSON({ getters: true }));
  }));
});

app.put('/posts/:id', function(req, res, next) {
  Post.findOne({ _id: req.params.id }, ok(next, function (post) {
    post.set(req.body);
    post.save(ok(next, function(post) {
      res.send(post.toJSON({ getters: true }));
    }));
  }));
})

app.post('/posts', function(req, res, next) {
  let post = new Post(req.body);
  post.validate(ok(next, function(error) {
    post.save(ok(next, function(results) {
      res.send(results);
    }));
  }));
});

app.delete('/posts/:id', function(req, res, next) {
  Post.findOne({ _id: req.params.id }, ok(next, function (post) {
    post.remove(ok(next, function(results) {
      res.send(results);
    }));
  }));
});

app.use(errorHandler())

// SERVER
// const server = require('http').createServer(app).listen(3200);
app.listen(3200, () => console.log('Server is running on localhost:3200'));
