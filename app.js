const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

// Home route
app.get('/', (req, res) => {
  res.render('home', { posts });
});

// New post route
app.get('/new', (req, res) => {
  res.render('new-post');
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const id = Date.now();
  posts.push({ id, title, content });
  res.redirect('/');
});

// Edit post
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit-post', { post });
});

app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
