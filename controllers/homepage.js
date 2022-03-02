const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');


router.get('/', (req, res) => {
  console.log(req.session);

    Post.findAll({
        attributes: [
          'id',
          'title',
          'post_text',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          const posts = dbPostData.map(post => post.get({ plain: true }));
          // pass post objects into the homepage template
          res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });

  router.get('/usersort', (req, res) => {
    console.log(req.session);
  
      Post.findAll({
          attributes: [
            'id',
            'title',
            'post_text',
            'created_at',
            'user_id',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
          ],
          order: [['user_id']],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
          .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // pass post objects into the homepage template
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
    });



    module.exports = router;