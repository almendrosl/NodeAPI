const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: String,
    favouriteCity: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
