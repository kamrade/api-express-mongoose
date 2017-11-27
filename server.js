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

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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
