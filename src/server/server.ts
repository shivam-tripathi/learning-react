import express from 'express';
import * as path from 'path';
import morgan from 'morgan';
import logger from './helpers/logger';
import router from './routes';

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
app.use('/api', router);
app.get('/*', (_, res) => {
  return res.send(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Learning React</title></head><style>body {padding: 50px;}</style><body><div id="react-container"></div></body><script src="/js/bundles/bundle.js"></script></html>'
  );
});

// Listen
app.listen('8888', () => logger.info('Server started on port 8888'));
