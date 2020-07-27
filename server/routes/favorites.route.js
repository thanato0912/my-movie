const router = require('express').Router();
const favoriteController = require('../controllers/favorites.controller');

router.get('/favoriteNumber', (req, res) => {
  return favoriteController.numOfFavorites(req, res);
});

router.get('/favorited', (req, res) => {
  return favoriteController.isFavorite(req, res);
});

router.post('/addToFavorite', (req, res) => {
  return favoriteController.addFavorite(req, res);
});

router.post('/removeFromFavorite', (req, res) => {
  return favoriteController.removeFavorite(req, res);
});

router.post('/getFavoriteMovies', (req, res) => {
  return favoriteController.getFavorites(req, res);
});

module.exports = router;
