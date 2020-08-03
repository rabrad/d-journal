const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, deleteUser } = require('../../controllers/users-controller');
const auth = require('../../middleware/auth');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'please enter password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  register
);

// @route    DELETE api/users
// @desc     DELETE User, Notes
// @access   Private
router.delete('/', auth, deleteUser);

module.exports = router;
