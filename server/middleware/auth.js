const { User } = require('../models/users.model');

let auth = (req, res, next) => {
  console.log('hi');
  let token = req.cookies.x_auth;
  if (!token) return res.json({ loginSuccess: false });
  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({
        loginSuccess: false,
        error: true,
        req: req,
      });
    }

    req.token = token;
    next();
  });
};

module.exports = { auth };
