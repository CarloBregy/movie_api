const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
// const users = [];
const path = require('path');

morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('common'));

let users = [
  {
    id: 1,
    name: 'John',
    favoriteMovies: []
  },
  {
    id: 2,
    name: 'Jane',
    favoriteMovies: ["Twilight"]
  }
];

let movies = [
 {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family, and the terrible evil that haunts the magical world.",
    genre: { name: "Fantasy" },
    image: "https://m.media-amazon.com/images/I/51Uq4d5L5gL._AC_SY679_.jpg",
    director: {
      name: "Chris Columbus",
      birthYear: 1958,
      deathYear: null,
      bio: "American filmmaker known for directing family-friendly films such as Home Alone and Mrs. Doubtfire."
    }
  },
  {
    title: "Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    description: "A meek Hobbit and eight companions set out on a journey to destroy the One Ring and save Middle-earth from the Dark Lord Sauron.",
    genre: { name: "Adventure" },
    image: "https://m.media-amazon.com/images/I/91z0u1wM0LL._AC_SY679_.jpg",
    director: {
      name: "Peter Jackson",
      birthYear: 1961,
      deathYear: null,
      bio: "New Zealand filmmaker renowned for directing The Lord of the Rings and The Hobbit series."
    }
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer",
    description: "When Bella Swan moves to a small town in the Pacific Northwest, she falls in love with Edward Cullen, a mysterious classmate who reveals himself to be a vampire.",
    genre: { name: "Romance" },
    image: "https://m.media-amazon.com/images/I/71J5Zz1z6lL._AC_SY679_.jpg",
    director: {
      name: "Catherine Hardwicke",
      birthYear: 1955,
      deathYear: null,
      bio: "American film director and production designer, best known for directing Twilight and Thirteen."
    }
  },
  {
    title: "Inception",
    author: "Christopher Nolan",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a CEO.",
    genre: { name: "Sci-Fi" },
    image: "https://m.media-amazon.com/images/I/91o1z4m8ZzL._AC_SY679_.jpg",
    director: {
      name: "Christopher Nolan",
      birthYear: 1970,
      deathYear: null,
      bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, Interstellar, and Dunkirk."
    }
  },
  {
    title: "The Matrix",
    author: "The Wachowskis",
    description: "A computer hacker learns from rebels about the true nature of his reality and his role in the war against its controllers.",
    genre: { name: "Cyberpunk" },
    image: "https://m.media-amazon.com/images/I/71pX+5X7QKL._AC_SY679_.jpg",
    director: {
      name: "Lana and Lilly Wachowski",
      birthYear: null,
      deathYear: null,
      bio: "American filmmakers known for creating The Matrix series and Cloud Atlas."
    }
  },
  {
    title: "Interstellar",
    author: "Christopher Nolan",
    description: "A brilliant NASA physicist works on plans to save mankind by transporting Earth's population to a new home via a wormhole.",
    genre: { name: "Drama" },
    image: "https://m.media-amazon.com/images/I/91u2Y8XrJwL._AC_SY679_.jpg",
    director: {
      name: "Christopher Nolan",
      birthYear: 1970,
      deathYear: null,
      bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, Interstellar, and Dunkirk."
    }
  },
  {
    title: "Gladiator",
    author: "Ridley Scott",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    genre: { name: "Historical" },
    image: "https://m.media-amazon.com/images/I/91VZ5Z5XyDL._AC_SY679_.jpg",
    director: {
      name: "Ridley Scott",
      birthYear: 1937,
      deathYear: null,
      bio: "English filmmaker known for directing Alien, Blade Runner, and Gladiator."
    }
  },
  {
    title: "The Dark Knight",
    author: "Christopher Nolan",
    description: "When the Joker wreaks havoc on Gotham, Batman, Gordon, and Dent must work together to stop him.",
    genre: { name: "Superhero" },
    image: "https://m.media-amazon.com/images/I/91KkRz0Z9wL._AC_SY679_.jpg",
    director: {
      name: "Christopher Nolan",
      birthYear: 1970,
      deathYear: null,
      bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, Interstellar, and Dunkirk."
    }
  },
  {
    title: "Avatar",
    author: "James Cameron",
    description: "A paraplegic Marine sent to Pandora becomes torn between following orders and protecting the world he feels is his home.",
    genre: { name: "Fantasy-SciFi" },
    image: "https://m.media-amazon.com/images/I/91u3+uJ0JwL._AC_SY679_.jpg",
    director: {
      name: "James Cameron",
      birthYear: 1954,
      deathYear: null,
      bio: "Canadian filmmaker known for directing Titanic, The Terminator, and Avatar."
    }
  },
  {
    title: "Titanic",
    author: "James Cameron",
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the ill-fated R.M.S. Titanic.",
    genre: { name: "Romantic Drama" },
    image: "https://m.media-amazon.com/images/I/91z5z5XyqOL._AC_SY679_.jpg",
    director: {
      name: "James Cameron",
      birthYear: 1954,
      deathYear: null,
      bio: "Canadian filmmaker known for directing Titanic, The Terminator, and Avatar."
    }
  }
];

app.use(express.static(path.join(__dirname, 'public')));

//  CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('Name is required');
  }
})

//  UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(u => u.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(404).send('User not found');
  }
})

//  CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(u => u.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle); 
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
  } else {
    res.status(404).send('User not found');
  }
});


//  DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(u => u.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array.`);
  } else {
    res.status(404).send('User not found');
  }
});

//  DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const initialLength = users.length;

  users = users.filter(user => user.id !== Number(id));

  if (users.length < initialLength) {
    res.status(200).send(`User ${id} has been removed.`);
  } else {
    res.status(404).send('User not found');
  }
});

//  READ
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//  READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(
    movie => movie.title.toLowerCase() === decodeURIComponent(title).toLowerCase()
  );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

//  READ
app.get('/movies/genre/:genre', (req, res) => {
  const { genre } = req.params;
  const movie = movies.find(
    movie => movie.genre.name.toLowerCase() === decodeURIComponent(genre).toLowerCase()
  );

  if (movie) {
    res.status(200).json(movie.genre);
  } else {
    res.status(404).send('Genre not found');
  }
});

//  READ
app.get('/movies/director/:directorname', (req, res) => {
  const { directorname } = req.params;

  const movie = movies.find(
    movie => movie.director.name.toLowerCase() === decodeURIComponent(directorname).toLowerCase()
  );

  if (movie) {
    res.status(200).json(movie.director);
  } else {
    res.status(404).send('Director not found');
  }
});


app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
