var { Favorite } = require('../models/favorites.model');

//retrieve the number of favorite of a movie
exports.numOfFavorites = (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, favorite) => {
    if (err) res.status(400).send(err);
    res.status(200).json({ FavoriteNumber: favorite.length });
  });
};

//check if the user add the movie to his/her favorite
exports.isFavorite = (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, favorite) => {
    if (err) res.status(400).send(err);
    let result = false;
    if (favorite.length > 0) result = true;
    res.status(200).json({ favorited: result });
  });
};

//add the movie to user's favorite list
exports.addFavorite = (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
};

//remove the movie from user's favorite list
exports.removeFavorite = (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
};

//retrive user's favorite list
exports.getFavorites = (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).json({ success: false });
    return res.status(200).json({ success: true, favorites });
  });
};
