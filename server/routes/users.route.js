const router = require('express').Router();
const userController = require('../controllers/users.controller');
const { check, validationResult } = require('express-validator');


//Registration
router.route('/register').post(
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
      return res.json({ errors: errors.array() })
    }
    return userController.createUser(req, res);
  }
);

//Login
router.route('/login').post(
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'password field is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }
    return userController.loginUser(req, res);
  }

);

//Logout
router.route('/logout').get((req, res) => {
    return userController.logoutUser(req, res);
});

module.exports = router;
