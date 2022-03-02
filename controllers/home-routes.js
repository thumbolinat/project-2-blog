const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  if (req.session.user ==null) {
    res.redirect ('/login')
  } else {
  res.redirect('/homepage')
  }  
  return
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/homepage');
      return;
    }

    res.render('login');
  });


module.exports = router;
