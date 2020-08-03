const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },

    verifyAccountToken: String,
    verifyAccountExpires: Date,
    resetPasswordExpires: Date,
    resetPasswordToken: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAccountVerify = function () {
  this.verifyAccountToken = crypto.randomBytes(20).toString('hex');
  this.verifyAccountExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000;
};

module.exports = User = mongoose.model('user', userSchema);
