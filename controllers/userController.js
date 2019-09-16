const User = require('../models/user');

exports.add = (req, res, next) => {
  let user = new User({
    email: req.body.email
  });

  user.save(function(err, user) {
    if (err) {
      if (err.code === 11000) {
        res.send('email already taken');
      } else {
        throw err;
      }
    } else {
      res.json(user);
    }
  });
};
