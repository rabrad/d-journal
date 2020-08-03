const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const Note = require('../models/Note');

// Register User
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    // If user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'UserAlready exists' }] });
    }

    // create user
    user = new User({
      name,
      email,
      password,
    });

    // encrypt password
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, slat);

    await user.save();

    // return JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '10d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await Note.deleteMany({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  register,
  deleteUser,
};
