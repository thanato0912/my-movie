var { User } = require('../models/users.model');

//Creates user
exports.createUser = (req, res) => {
  var newUser = new User(req.body);
  newUser
    .save()
    .then((userInfo) => {
      //if successfully create the user account
      //then create web token to log the user in
      userInfo.createWebToken((err, userInfo) => {
        if (err) return res.status(400).send(err);
        else {
          res.cookie('x_auth', userInfo.token);
          return res.status(200).json({
            loginSuccess: true,
            userData: userInfo,
            token: userInfo.token,
            cookie: res.cookies,
          });
        }
      });
    })
    .catch((err) => {
      res.json({ loginSuccess: false, message: 'Email already exists' });
    });
};

//Sign in user
exports.loginUser = (req, res) => {
  //look for the email provided in the db

  User.findOne({ email: req.body.email }, (err, doc) => {
    if (err) return res.json({ error: err });
    if (!doc) return res.json({ error: 'no user found' });
    doc.validatePassword(req.body.password, (err, isMatch) => {
      if (err) return res.json({ error: err });
      //password not matching
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: 'password is incorrect',
          err,
        });
        //password is matched...
        //proceeding to sign in the user && create webtoken
      } else {
        //genenerating webtoken that is used to keep the user signed in
        doc.createWebToken((err, userInfo) => {
          if (err) return res.status(400).send(err);
          else {
            res.cookie('x_auth', userInfo.token, {
              maxAge: 900000,
              httpOnly: true,
            });
            return res.status(200).json({
              loginSuccess: true,
              userId: userInfo._id,
              token: doc.token,
              cookie: res.cookies,
            });
          }
        });
      }
    });
  });
};

//Sign out the user by removing token
exports.logoutUser = (req, res) => {
  User.findByToken(req.body.token, (err, userData) => {
    if (err) {
      throw err;
    }
    if (!userData) {
      return res.json({
        loginSuccess: false,
        error: true,
      });
    } else {
      User.findOneAndUpdate(
        { _id: userData._id },
        { token: '' },
        (err, doc) => {
          if (err) return res.json({ loginSuccess: false, err });
          else {
            return res.status(200).send({
              loginSuccess: true,
            });
          }
        }
      );
    }
  });
};
