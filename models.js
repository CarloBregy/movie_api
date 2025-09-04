const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: { type: String, required: true },
    Description: String
  },
  Director: {
    Name: { type: String, required: true },
    Bio: String,
    Birth: String
  },
  Actors: [String],
  Year: Number,
  Rating: Number,
  ImagePath: String,
  Featured: Boolean
});


const userSchema = mongoose.Schema({
//   FirstName: { type: String, required: true },
//   LastName: { type: String, required: true },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  Gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  Membership: { type: String, enum: ['Standard', 'Premium'], default: 'Standard' },
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});


let Movie = mongoose.model('movie', movieSchema);
let User = mongoose.model('user', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;