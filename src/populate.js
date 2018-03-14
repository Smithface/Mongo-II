const fs = require('fs');
const mongoose = require('mongoose');

let savedPosts = null;

const Post = require('./post.js');

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts;
};

const populatePost = () => {
  const Iknoooow = readPosts().map((post) => {
    return post
      .save()
      .then(post => console.log('post was saved!', post)
      .catch(err => console.error('error saving post', err)
  })
  Promise.all(Iknoooow)
    .then(posts => {
      console.log('we saved all the things!')
      // res.status(201).json(posts);
    })
    .catch(err => {
      console.error('error saving all the things');
      // res.status(500).json({error: err});
    })
};

mongoose
  .connect('mongodb://localhost/so-posts')
  .then(() => {
    Post.create(readPosts())
      .then(() => {
        console.log('population succeeded');
        mongoose.disconnect();
      })
      .catch(error => {
        console.error('population failed');
      });
  })
  .catch(error => {
    console.error('database connection failed');
  });
