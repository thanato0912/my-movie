const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/users.controller');
const { auth } = require('../middleware/auth');

//Auth
router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    loginSuccess: req.loginSuccess,
    token: req.token,
  });
});

//Registration
router
  .route('/register')
  .post(
    [
      check('email', 'Email is not valid').isEmail(),
      check('firstname', 'firstanme field is required').not().isEmpty(),
      check('lastname', 'lastname field is required').not().isEmpty(),
      check('gender', 'gender field is required').not().isEmpty(),
      check('password', 'password field is required').not().isEmpty(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }
      return userController.createUser(req, res);
    }
  );

//Login
router
  .route('/login')
  .post(
    [
      check('email', 'Email is not valid').isEmail(),
      check('password', 'password field is required').not().isEmpty(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      //send errors if form not verified
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      return userController.loginUser(req, res);
    }
  );

//Logout
router.route('/logout').post((req, res) => {
  return userController.logoutUser(req, res);
});

module.exports = router;
