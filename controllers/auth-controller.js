const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
  forgetPasswordEmail,
  resetPasswordEmail,
} = require('../emails/account');
const User = require('../models/User');

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// Login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // If there is a user check his hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Return JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// Forget password
const forgetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ errors: [{ msg: 'Invalid Email, Please signup' }] });
    }
    //Generate and set password reset token
    user.generatePasswordReset();

    // Save the updated user object
    user.save();

    // send email
    let link = `${req.headers.origin}/resetpassword/${user.resetPasswordToken}`;

    forgetPasswordEmail(user.name, user.email, link);

    res.status(200).json({
      message: 'A reset e-mail has been sent to ' + user.email,
    });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(401).json({ errors: [{ msg: 'Password token is invalid.' }] });
    }

    //Set the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;

    // user.active = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    user.save();

    // send email
    resetPasswordEmail(user.name, user.email, req.headers.origin);

    res.status(200).json({ message: 'Your password has been updated.' });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

module.exports = {
  getCurrentUser,
  login,
  forgetPassword,
  resetPassword,
};
