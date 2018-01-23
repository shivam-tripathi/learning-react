import express from 'express';
import path from 'path';

const app = express();

let alpha = 'beta';
console.log(alpha);

app.set('view engine', 'jade');
app.set('views', __dirname + '/../src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/static'));

// app.set('views', __dirname + '/routes');
// app.engine('html', require('ejs').__express);
// app.set('view engine', 'html');

app.get('/', (req, res, next) => {
	res.render('index.html');
});

app.listen('4321', '0.0.0.0');
console.log('Express started on port 4321');
console.log('All the best!');
console.log(__dirname);


