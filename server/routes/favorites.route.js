const router = require('express').Router();
const favoriteController = require('../controllers/favorites.controller');

//route to get the number of favorites of a movie
router.get('/favoriteNumber', (req, res) => {
  return favoriteController.numOfFavorites(req, res);
});

//route to check if a user add the movie to his/her list
router.get('/favorited', (req, res) => {
  return favoriteController.isFavorite(req, res);
});

//route to add a movie to a favorite list
router.post('/addToFavorite', (req, res) => {
  return favoriteController.addFavorite(req, res);
});

//route to delete a movie from a favorite list
router.post('/removeFromFavorite', (req, res) => {
  return favoriteController.removeFavorite(req, res);
});

//retrive user's favorite list
router.post('/getFavoriteMovies', (req, res) => {
  return favoriteController.getFavorites(req, res);
});

module.exports = router;
