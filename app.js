const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use Render's assigned port or fallback to 3000 for local testing
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

// Home route - show all posts
app.get('/', (req, res) => {
  res.render('home', { posts });
});

// New post form route
app.get('/new', (req, res) => {
  res.render('new-post');
});

// Handle new post submission
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const id = Date.now();
  posts.push({ id, title, content });
  res.redirect('/');
});

// Edit post form route
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('edit-post', { post });
});

// Handle edit post submission
app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

// Handle delete post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
