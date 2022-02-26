const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => { 
    Post.findAll({
        where: {
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

          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
        console.log(req.session.user_id);
  });

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
        id: req.params.id
    },
    attributes: [
        'id', 
        'post_text', 
        'title', 
        'created_at'
      ],
    include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'user_id', 'created_at'],
            
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
        if(!dbPostData) {
           
            res.status(404).json({ message: 'No post with this id was found'});
            return;
        }

      
        const post = dbPostData.get({ plain: true });

        
        res.render('edit-post', { 
          post,
          loggedIn: req.session.loggedIn
        
        });
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});
module.exports = router;