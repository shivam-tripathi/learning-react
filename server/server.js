"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create app
const app = (0, _express.default)(); // Support both pug and html rendering

app.set('view engine', 'pug');
app.set('view engine', 'html');
app.engine('pug', require('pug').__express);
app.engine('html', require('ejs').renderFile); // Set views section, which contains all the html and pug files

app.set('views', _path.default.join(__dirname, '/../client/views')); // Client side css and js files which would be loaded in the browser

app.use(_express.default.static(_path.default.join(__dirname + '/../client/static'))); // Express routing

app.get('/', (req, res, next) => {
  // res.send('<h1> Hello, world! </h1>');
  res.render('index.pug');
}); // Listen

app.listen('8888', '127.0.0.1');
console.log('Express started on port 8888');
console.log('All the best!');