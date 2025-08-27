const express = require('express');
const path = require('path');
const app = express();

morgan = require('morgan');

app.use(morgan('common'));

let topMovies = [
  { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling' },
  { title: 'Lord of the Rings', author: 'J.R.R. Tolkien' },
  { title: 'Twilight', author: 'Stephanie Meyer' },
  { title: 'Inception', author: 'Christopher Nolan' },
  { title: 'The Matrix', author: 'The Wachowskis' },
  { title: 'Interstellar', author: 'Christopher Nolan' },
  { title: 'Gladiator', author: 'Ridley Scott' },
  { title: 'The Dark Knight', author: 'Christopher Nolan' },
  { title: 'Avatar', author: 'James Cameron' },
  { title: 'Titanic', author: 'James Cameron' }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
