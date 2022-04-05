'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const User = mongoose.model('User');

/**
 * Load
 */

exports.load = async(function*(req, res, next, _id) {
  const criteria = { _id };
  try {
    req.profile = yield User.load({ criteria });
    if (!req.profile) return next(new Error('User not found'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 * Create user
 */

exports.create = async(function*(req, res) {
  const user = new User(req.body);
  user.provider = 'local';
  try {
    yield user.save();
    req.logIn(user, err => {
      if (err) req.flash('info', 'Sorry! We are not able to log you in!');
      res.redirect('/');
    });
  } catch (err) {
    const errors = Object.keys(err.errors).map(
      field => err.errors[field].message
    );

    res.render('users/signup', {
      title: 'Sign up',
      errors,
      user
    });
  }
});

exports.edit = function(req, res) {
  console.log(req.body);
  User.findOne({ _id: req.body.id }, function(err, result) {
    if (err) console.log(err);
    if (result) {
      console.log(result);
      result.password = req.body.password;
      result.save();
      console.log(result);
    }
    res.redirect(`/user/${req.body.id}`);
  });
};

/**
 *  Show profile
 */

exports.show = function(req, res) {
  const user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};


/**
 * Auth callback
 */

exports.authCallback = login;

/**
 * Show login form
 */

exports.login = function(req, res) {
  res.render('users/login', {
    title: 'Login'
  });
};

/**
 * Show sign up form
 */

exports.signup = function(req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

/**
 * Admin create page
 */

exports.admin = function(req, res) {
  User.findOne({ _id: req.user.id }, function(err, result) {
    if (err) console.log(err);

    if (result.role !== 'admin') {
      req.flash('error', 'У вас нет права на этот часть сайта');
      res.redirect('/');
    } else {
      res.render('pharma/admin', {
        title: 'Добавить нового админа',
        user: new User()
      });
    }
  });
};

exports.admin_create = async(function*(req, res) {
  const user = new User(req.body);
  user.provider = 'local';
  try {
    yield user.save();
    req.flash('info', 'Новый пользовател сохранен');
    res.redirect('/');
  } catch (err) {
    const errors = Object.keys(err.errors).map(
      field => err.errors[field].message
    );

    res.render('pharma/admin', {
      title: 'Добавить нового админа',
      errors,
      user
    });
  }
});

/**
 * Logout
 */

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login(req, res) {
  const redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}
