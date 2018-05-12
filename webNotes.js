const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var notes = [
  'http REALLY is a protocol',
  'http requests have a URL, method, header and body',
  'Is this seriously working?',
  'Yes it appears to be'
];
var fruits = ['apple', 'pear', 'banana', 'kumquat'];

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static('css'));
// app.get('/', (req, res) => res.send('<h2>Web Notepad Server</h2>'))
// app.use('/', express.static('views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('notes', { notes: notes });
});
app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))