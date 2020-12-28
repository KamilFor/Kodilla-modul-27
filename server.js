const express = require('express');
const path = require('path');

const hbs = require('express-handlebars');
const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

// app.use((req, res, next) => {
//   res.show = (name) => {
//     res.sendFile(path.join(__dirname, `/views/${name}`));
//   };
//   next();
//   //   if (isAdmin()) next();
//   //   else res.send('Go away!');
// });

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, '/public')));

app.engine('hbs', hbs({ extname: 'hbs', layoutDir: './layouts', dafaultLayout: 'main' }));

//27.4
app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', (req, res) => {
  const { author, sender, title, image, message } = req.body;

  if (author && sender && title && image && message) {
    res.render('contact', { isSent: true, image: image });
  } else res.render('contact', { isError: true });
});

//27.3

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log(' Server is runing on port: 8000');
});

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, './views/about.html'));
// });

// app.get('/contact', (req, res) => {
//   res.sendFile(path.join(__dirname, './views/contact.html'));
// });

// app.get('/info', (req, res) => {
//   res.sendFile(path.join(__dirname, './views/info.html'));
// });

// app.get('/history', (req, res) => {
//   res.sendFile(path.join(__dirname, './views/history.html'));
// });

// app.get('link', (req, res) => {
//   res.sendFile('filename-path');
// });
