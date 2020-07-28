const { User } = require('../models/users.model');

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  if (!token) return res.json({ loginSuccess: false });
  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user)
      return res.json({
        loginSuccess: false,
        error: true,
      });
    req.token = token;
    next();
  });
};

module.exports = { auth };
