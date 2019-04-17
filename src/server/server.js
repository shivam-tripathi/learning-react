import express from 'express';
import path from 'path';

// Create app
const app = express();

// Support both pug and html rendering
app.set('view engine', 'pug');
app.set('view engine', 'html');
app.engine('pug', require('pug').__express);
app.engine('html', require('ejs').renderFile);

// Set views section, which contains all the html and pug files
app.set('views', path.join(__dirname, '/../static/views'));
// Client side css and js files which would be loaded in the browser
app.use(express.static(path.join(__dirname, '/../static/client')));

// Express routing
app.get('/', (req, res) => {
  res.render('index.pug', { scriptPath: '/js/bundles/bundle.js' });
});

// Listen
app.listen('8888', '127.0.0.1');
console.log('Server started on port 8888'); // eslint-disable-line no-console
