const router = require('express').Router();

const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        // Query configuration
        attributes: [
            'id', 
            'title', 
            'post_text',
            'created_at'],
        order: [['created_at', 'DESC']], // sort by most recent
        include: [ // Instead of using complex JOIN statements with SQL, we can call on Sequelize's include option to perform the join for us.
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                // also include the User model itself so it can attach the username to the comment
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// retrieve a post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'post_text', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                // also include the User model itself so it can attach the username to the comment
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
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// create a post
router.post('/', withAuth, (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_text: 'Lorem sispsum and some more', user_id: 1}
    // these can all be found in the Post Model file
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a post
router.put('/:id', (req, res) => {
    // used the request parameter to find the post, then used the req.body.title value to replace the title of the post
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No post with this id was found'});
            return;
    }
    res.json(dbPostData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No post with this id was found'});
            return;
    }
    res.json(dbPostData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;









