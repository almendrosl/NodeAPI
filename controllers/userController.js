const User = require('../models/userModel');

exports.getAllUsers = (req, res, next) => {
  User.find((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
};

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
};

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

exports.delete = (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, (err, doc) => {
    if (err) return next(err);
    return res.send('succesfully deleted');
  });
};

exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndUpdate(
    id,
    { $set: { email: req.body.email } },
    (err, doc) => {
      if (err) return next(err);
      return res.send('succesfully saved');
    }
  );
};

exports.setUserCity = (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndUpdate(
    id,
    { $set: { favouriteCity: req.body.city } },
    (err, doc) => {
      if (err) return next(err);
      return res.send('succesfully saved');
    }
  );
};