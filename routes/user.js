var express = require('express');
var User = require('../models/User');

var router = express.Router();

router.route('/join').get(function(req, res, next) {
  res.render('user/join', null);
});

router.route('/join').post(function(req, res, next) {
  User.create(req.body, function(err){
    if(err){
      next(err);
      return;
    }
    res.redirect('/user/joinsuccess');
  });
});

router.route('/joinsuccess').get(function(req, res, next) {
  res.render('user/joinsuccess', null);
});

router.route('/login').get(function(req, res, next) {
  res.render('user/login', {
    result: res.params.result
  });
});

router.route('/login').post(function(req, res, next) {
  User.findOne(req.body, ['_id', 'name'], {}, function(err, user){
    if(err){
      next(err);
      return;
    }

    // session 처리
    req.session.loginUser = user;
    console.log(user);

    res.redirect('/');
  });
});

router.route('/logout').get(function(req, res, next) {
  // 세션 없애기
  req.session.destroy(function (err) {
    if(err) {
      next(err);
      return;
    }

    res.redirect('/');
  })
});


module.exports = router;
