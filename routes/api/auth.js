const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const {
  getCurrentUser,
  login,
  forgetPassword,
  resetPassword,
} = require('../../controllers/auth-controller');

const User = require('../../models/User');

// @route    GET api/auth/me
// @desc     get current user
// @access   private
router.get('/me', auth, getCurrentUser);

// @route    POST api/auth/login
// @desc     Login
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

// @route    POST api/auth/forgetpassword
// @desc     forgetpassword
// @access   Public
router.post(
  '/forgetpassword',
  check('email', 'please use a valid email').isEmail(),
  forgetPassword
);

// @route    POST api/auth/resetPassword
// @desc     resetPassword
// @access   public
router.post(
  '/resetpassword/:token',
  // auth,
  check('password', 'Must use 6 or more characters in your password')
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
  resetPassword
);

module.exports = router;
