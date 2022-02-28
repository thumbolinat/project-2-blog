const router = require('express').Router();
const { User, Comment, Post, Vote } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        include: [
          {
          model: Post,
          attributes: ['id', 'post_text', 'user_id', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          }
        },
        {
          model: Post,
          attributes: ['title'],
          through: Vote,
          as: 'voted_posts'
        }
      ]

      })
      .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// POST create a new user
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

// verify user during login
// POST method carries the request parameter in req.body, which makes it a more secure way of transferring data from the client to the server
router.post('/login', (req, res) => {

    User.findOne({
        where: {
          username: req.body.email
        }
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email exists!' });
          return;
        }
        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
          }

          req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
          
            res.json({ user: dbUserData, message: 'You are now logged in!' });
          
          });  
        });
  });
// logout
router.post('/logout', (req, res) => {
  
  if (req.session.loggedIn) {

    req.session.destroy(() => {
      // 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page
      res.status(204).end();      
    });
  }
  else {
    res.status(404).end();
  }

});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.delete('/:id/delete'), async (req,res) => {
//   let user = await user.findOne({where: {id: req.params.id}}).then(function(user){
//     return user.destroy()
//   }).then(function(){
//     res.redirect('/users')
//   })

// }

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;