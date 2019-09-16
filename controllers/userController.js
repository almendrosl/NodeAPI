const User = require('../models/userModel');

exports.add = (req, res, next) => {
  let user = new User({
    email: req.body.email
  });

  user.save(function(err, user) {
    if (err) {
      if (err.code === 11000) {
        res.send('email already taken');
      } else {
        return next(err);
      }
    } else {
      res.json(user);
    }
  });
};

exports.getAllUsers = (req, res, next) => {
  User.find((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
};
