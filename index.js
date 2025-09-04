const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true, useUnifiedTopology: true });


// const users = [];
const path = require('path');

app.use(bodyParser.json());
app.use(morgan('common'));

// let users = [
//   {
//     id: 1,
//     name: 'John',
//     favoriteMovies: []
//   },
//   {
//     id: 2,
//     name: 'Jane',
//     favoriteMovies: ["Twilight"]
//   }
// ];

// let movies = [
//  {
//     title: "Harry Potter and the Sorcerer's Stone",
//     author: "J.K. Rowling",
//     description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family, and the terrible evil that haunts the magical world.",
//     genre: { name: "Fantasy" },
//     image: "https://m.media-amazon.com/images/I/51Uq4d5L5gL._AC_SY679_.jpg",
//     director: {
//       name: "Chris Columbus",
//       birthYear: 1958,
//       deathYear: null,
//       bio: "American filmmaker known for directing family-friendly films such as Home Alone and Mrs. Doubtfire."
//     }
//   },
//   {
//     title: "Lord of the Rings: The Fellowship of the Ring",
//     author: "J.R.R. Tolkien",
//     description: "A meek Hobbit and eight companions set out on a journey to destroy the One Ring and save Middle-earth from the Dark Lord Sauron.",
//     genre: { name: "Adventure" },
//     image: "https://m.media-amazon.com/images/I/91z0u1wM0LL._AC_SY679_.jpg",
//     director: {
//       name: "Peter Jackson",
//       birthYear: 1961,
//       deathYear: null,
//       bio: "New Zealand filmmaker renowned for directing The Lord of the Rings and The Hobbit series."
//     }
//   },
//   {
//     title: "Twilight",
//     author: "Stephanie Meyer",
//     description: "When Bella Swan moves to a small town in the Pacific Northwest, she falls in love with Edward Cullen, a mysterious classmate who reveals himself to be a vampire.",
//     genre: { name: "Romance" },
//     image: "https://m.media-amazon.com/images/I/71J5Zz1z6lL._AC_SY679_.jpg",
//     director: {
//       name: "Catherine Hardwicke",
//       birthYear: 1955,
//       deathYear: null,
//       bio: "American film director and production designer, best known for directing Twilight and Thirteen."
//     }
//   },
//   {
//     title: "Inception",
//     author: "Christopher Nolan",
//     description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a CEO.",
//     genre: { name: "Sci-Fi" },
//     image: "https://m.media-amazon.com/images/I/91o1z4m8ZzL._AC_SY679_.jpg",
//     director: {
//       name: "Christopher Nolan",
//       birthYear: 1970,
//       deathYear: null,
//       bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, Interstellar, and Dunkirk."
//     }
//   },
//   {
//     title: "The Matrix",
//     author: "The Wachowskis",
//     description: "A computer hacker learns from rebels about the true nature of his reality and his role in the war against its controllers.",
//     genre: { name: "Cyberpunk" },
//     image: "https://m.media-amazon.com/images/I/71pX+5X7QKL._AC_SY679_.jpg",
//     director: {
//       name: "Lana and Lilly Wachowski",
//       birthYear: null,
//       deathYear: null,
//       bio: "American filmmakers known for creating The Matrix series and Cloud Atlas."
//     }
//   },
//   {
//     title: "Interstellar",
//     author: "Christopher Nolan",
//     description: "A brilliant NASA physicist works on plans to save mankind by transporting Earth's population to a new home via a wormhole.",
//     genre: { name: "Drama" },
//     image: "https://m.media-amazon.com/images/I/91u2Y8XrJwL._AC_SY679_.jpg",
//     director: {
//       name: "Christopher Nolan",
//       birthYear: 1970,
//       deathYear: null,
//       bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, Interstellar, and Dunkirk."
//     }
//   },
//   {
//     title: "Gladiator",
//     author: "Ridley Scott",
//     description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
//     genre: { name: "Historical" },
//     image: "https://m.media-amazon.com/images/I/91VZ5Z5XyDL._AC_SY679_.jpg",
//     director: {
//       name: "Ridley Scott",
//       birthYear: 1937,
//       deathYear: null,
//       bio: "English filmmaker known for directing Alien, Blade Runner, and Gladiator."
//     }
//   },
//   {
//     title: "The Dark Knight",
//     author: "Christopher Nolan",
//     description: "When the Joker wreaks havoc on Gotham, Batman, Gordon, and Dent must work together to stop him.",
//     genre: { name: "Superhero" },
//     image: "https://m.media-amazon.com/images/I/91KkRz0Z9wL._AC_SY679_.jpg",
//     director: {
//       name: "Christopher Nolan",
//       birthYear: 1970,
//       deathYear: null,
//       bio: "British-American filmmaker known for The Dark Knight Trilogy, Inception, Interstellar, and Dunkirk."
//     }
//   },
//   {
//     title: "Avatar",
//     author: "James Cameron",
//     description: "A paraplegic Marine sent to Pandora becomes torn between following orders and protecting the world he feels is his home.",
//     genre: { name: "Fantasy-SciFi" },
//     image: "https://m.media-amazon.com/images/I/91u3+uJ0JwL._AC_SY679_.jpg",
//     director: {
//       name: "James Cameron",
//       birthYear: 1954,
//       deathYear: null,
//       bio: "Canadian filmmaker known for directing Titanic, The Terminator, and Avatar."
//     }
//   },
//   {
//     title: "Titanic",
//     author: "James Cameron",
//     description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the ill-fated R.M.S. Titanic.",
//     genre: { name: "Romantic Drama" },
//     image: "https://m.media-amazon.com/images/I/91z5z5XyqOL._AC_SY679_.jpg",
//     director: {
//       name: "James Cameron",
//       birthYear: 1954,
//       deathYear: null,
//       bio: "Canadian filmmaker known for directing Titanic, The Terminator, and Avatar."
//     }
//   }
// ];

app.use(express.static(path.join(__dirname, 'public')));

// Get all users
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movies.find(); 
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Get a user by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get movie by title
app.get('/movies/:Title', async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get genre by name/title
app.get('/movies/genre/:genre', async (req, res) => {
  await Movies.findOne({ 'Genre.Name': req.params.genre })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get data about director
app.get('/movies/director/:director', async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.director })
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Director not found');
      }
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Get all users
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//  Add a user (Post)
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update a user (Put)
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) 
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  })

});

// Add a movie to a user's list of favorites (Post)
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) 
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// DELETE a movie from a user's favoriteMovies array
app.delete('/users/:Username/movies/:movieTitle', async (req, res) => {
  const { Username, movieTitle } = req.params;

  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: Username },
      { $pull: { FavoriteMovies: movieTitle } }, // Remove the movie from the array
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      res.status(404).send(`User ${Username} was not found.`);
    } else {
      res.status(200).send(`${movieTitle} has been removed from ${Username}'s favorite movies.`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Delete a user by username
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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
