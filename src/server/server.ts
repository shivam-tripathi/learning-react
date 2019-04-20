import express from 'express';
import * as path from 'path';
import morgan from 'morgan';
import logger from './helpers/logger';

// Create app
const app = express();

// View engine
app.set('view engine', 'pug');

// Set views section, which contains all the html and pug files
app.set('views', path.join(__dirname, '/../static/views'));
// Client side css and js files which would be loaded in the browser
app.use(express.static(path.join(__dirname, '/../static/client')));

app.use(morgan('combined'));

// Express routing
app.get('/', (req, res) => {
  logger.info('Request for / received');
  return res.render('index.pug', { scriptPath: '/js/bundles/bundle.js' });
});

// Listen
app.listen('8888', () => logger.info('Server started on port 8888'));
