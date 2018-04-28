const express = require('express')
const path = require('path')
const logger = require('morgan');
const bodyParser = require('body-parser');
// const favicon = require('serve-favicon');

const app = express();
const PORT = process.env.PORT || 5000

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('./server/routes')(app);

app.get('/', (req, res) => res.render('pages/index'));
app.get('/subscribe', (req, res) => res.render('pages/subscribe'));
app.get('/existing_subscriber', (req, res) => res.render('pages/existing_subscriber'));
app.get('/thanks', (req, res) => res.render('pages/thank_you'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

module.exports = app;
