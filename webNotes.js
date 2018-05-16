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
app.put('/notes/:id', function (req, res){
  if(req.params.id >= 0 && req.params.id < notes.length){
    notes[req.params.id] = req.body.note;
  } else {
    res.status(404).send("***NOTE DOES NOT EXIST***");
  }
});
app.delete('/notes/:id', (req, res) => {
  if(req.params.id >= 0 && req.params.id < notes.length){
    notes.splice('req.params.id', 1);
    res.send('***NOTE DELETED***');
    res.redirect('/');
  } else {
    res.status(404).send("***NOTE DOES NOT EXIST***");
  }
});
app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))