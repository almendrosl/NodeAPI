const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 50
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    isAdmin: Boolean,
    favouriteCity: String
  },
  { timestamps: true }
);

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.PRIVATE_KEY,
    { expiresIn: 86400 }
  );
  return token;
};

const User = mongoose.model('User', UserSchema);

//function to validate user
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
