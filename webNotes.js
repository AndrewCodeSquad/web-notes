const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
var notes = [
  'These notes come from the array',
  "Then they're rendered through the EJS file",
  "And finally they're delivered over http"
];

// bodyParser helps with parsing user input
app.use(bodyParser.urlencoded({ extended: true }));
// Specify a static CSS file to add styling
app.use('/css', express.static('css'));
// Tell Morgan to make a tiny log file with only most-important things
app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('notes', { notes: notes });
});
app.delete('/notes/:id', (req, res) => {
  notes.splice('req.params.id', 1);
  res.send('***ITEM DELETED***');
  res.redirect('/');
});
app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))