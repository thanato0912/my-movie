var { User } = require('../models/users.model');

exports.createUser = (req, res) => {
  var newUser = new User(req.body);
  newUser
    .save()
    .then((userInfo) => {
      userInfo.createWebToken((err, userInfo) => {
        if (err) return res.status(400).send(err);
        else {
          return res.cookie('x_auth', userInfo.token).status(200).json({
            loginSuccess: true,
            userData: userInfo,
          });
        }
      });
      return res.json({ login: 'success' });
    })
    .catch((err) => res.json({ error: err }));
};

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
          loginSucess: false,
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
            return res.cookie('x_auth', doc.token).status(200).json({
              loginSuccess: true,
              userData: userInfo,
            });
          }
        });
      }
    });
  });
};

exports.logoutUser = (req, res) => {
  User.findByToken(req.cookies.x_auth, (err, userData) => {
    if (err) throw err;
    if (!userData) {
      return res.json({
        isAuth: false,
        error: true,
      });
    } else {
      User.findOneAndUpdate(
        { _id: userData._id },
        { token: '' },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          else {
            return res.status(200).send({
              sucess: true,
            });
          }
        }
      );
    }
  });
};
