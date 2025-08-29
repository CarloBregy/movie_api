const express = require('express');
const app = express();
const path = require('path');

morgan = require('morgan');

app.use(morgan('common'));

let movies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family, and the terrible evil that haunts the magical world.",
    genre: { name: "Fantasy" },
    director: "Chris Columbus",
    image: "https://m.media-amazon.com/images/I/51Uq4d5L5gL._AC_SY679_.jpg",
    directorBio: {
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
    director: "Peter Jackson",
    image: "https://m.media-amazon.com/images/I/91z0u1wM0LL._AC_SY679_.jpg",
    directorBio: {
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
    director: "Catherine Hardwicke",
    image: "https://m.media-amazon.com/images/I/71J5Zz1z6lL._AC_SY679_.jpg",
    directorBio: {
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
    director: "Christopher Nolan",
    image: "https://m.media-amazon.com/images/I/91o1z4m8ZzL._AC_SY679_.jpg",
    directorBio: {
      name: "Christopher Nolan",
      birthYear: 1970,
      deathYear: null,
      bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, and Interstellar."
    }
  },
  {
    title: "The Matrix",
    author: "The Wachowskis",
    description: "A computer hacker learns from rebels about the true nature of his reality and his role in the war against its controllers.",
    genre: { name: "Cyberpunk" },
    director: "Lana and Lilly Wachowski",
    image: "https://m.media-amazon.com/images/I/71pX+5X7QKL._AC_SY679_.jpg",
    directorBio: {
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
    director: "Christopher Nolan",
    image: "https://m.media-amazon.com/images/I/91u2Y8XrJwL._AC_SY679_.jpg",
    directorBio: {
      name: "Christopher Nolan",
      birthYear: 1970,
      deathYear: null,
      bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, and Dunkirk."
    }
  },
  {
    title: "Gladiator",
    author: "Ridley Scott",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    genre: { name: "Historical" },
    director: "Ridley Scott",
    image: "https://m.media-amazon.com/images/I/91VZ5Z5XyDL._AC_SY679_.jpg",
    directorBio: {
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
    director: "Christopher Nolan",
    image: "https://m.media-amazon.com/images/I/91KkRz0Z9wL._AC_SY679_.jpg",
    directorBio: {
      name: "Christopher Nolan",
      birthYear: 1970,
      deathYear: null,
      bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, and Dunkirk."
    }
  },
  {
    title: "Avatar",
    author: "James Cameron",
    description: "A paraplegic Marine sent to Pandora becomes torn between following orders and protecting the world he feels is his home.",
    genre: { name: "Fantasy-SciFi" },
    director: "James Cameron",
    image: "https://m.media-amazon.com/images/I/91u3+uJ0JwL._AC_SY679_.jpg",
    directorBio: {
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
    director: "James Cameron",
    image: "https://m.media-amazon.com/images/I/91z5z5XyqOL._AC_SY679_.jpg",
    directorBio: {
      name: "James Cameron",
      birthYear: 1954,
      deathYear: null,
      bio: "Canadian filmmaker known for directing Titanic, The Terminator, and Avatar."
    }
  }
];


app.use(express.static(path.join(__dirname, 'public')));

app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

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

app.get('/movies/genre/:genre', (req, res) => {
  const { genre } = req.params;
  const movies = movies.find(
    movie => movie.genre.name.toLowerCase() === decodeURIComponent(genre).toLowerCase()
  );

  if (movies) {
    res.status(200).json(movies);
  } else {
    res.status(404).send('Genre not found');
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
