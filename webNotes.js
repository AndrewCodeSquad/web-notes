const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
var notes = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use(morgan('tiny'));

// Display all notes
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
    notes.splice(req.params.id, 1);
    console.log('***NOTE #' + req.params.id + ' DELETED***');
    res.send();
  } else {
    res.status(404).send("***NOTE DOES NOT EXIST***");
  }
});

app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))