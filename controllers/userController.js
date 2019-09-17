const { User, validate } = require('../models/userModel');
const bcrypt = require('bcrypt');

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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    user.save(function(err, user) {
      if (err) {
        if (err.code === 11000) {
          res.send('email already taken');
        } else {
          return next(err);
        }
      } else {
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send({
          _id: user._id,
          name: user.name,
          email: user.email
        });
      }
    });
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

exports.getCurrent = (req, res, next) => {
  User.findById(req.user._id, { password: 0 }, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
};

exports.login = (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    bcrypt.compare(req.body.password, user.password, (err, comp) => {
      if (err) return next(err);
      if (!comp) return res.status(401).send({ auth: false, token: null });

      const token = user.generateAuthToken();

      res.header('x-auth-token', token).send({
        _id: user._id,
        name: user.name,
        email: user.email
      });
    });
  });
};

exports.logout = (req, res, next) => {
  res.status(200).send({ auth: false, token: null });
};
