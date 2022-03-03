const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// checks if user logged in; have session; authorized
const withAuth = require('../utils/auth');

// all dashboard views will be prefixed with /dashboard
router.get('/', withAuth, (req, res) => { // add withAuth here as our own middlware
    Post.findAll({
        where: {
          // use the ID from the session so we retrieve posts made by logged in user
          user_id: req.session.user_id
          
        },
        attributes: [
          'id',
          'post_text',
          'title',
          'created_at'
        ],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          { model: Comment }
        ]
      })
        .then(dbPostData => {
          // serialize data before passing to template
          // using post here but this can be named ANYTHING 
          const posts = dbPostData.map(post => post.get({ plain: true }));
          // user won't be able to get to the dashboard page unless they're logged in
          res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
        console.log(req.session.user_id);
  });


module.exports = router;