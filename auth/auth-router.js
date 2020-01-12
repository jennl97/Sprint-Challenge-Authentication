const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');


router.get('/', (req, res) => {
  res.status(200).json({
    message: "we are working"
  })
})

// Register User
router.post('/register', (req, res) => {
    const user = req.body;
  
    //hash the password
    const hash = bcrypt.hashSync(user.password, 8);
    //override plain text
    user.password = hash;
  
    Users.add(user)
      .then(newUser => {
        // save session and set cookie
        req.session.username = user;
        res.status(201).json({created: newUser})
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to create new user"
        });
      });
    });

//Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    req.session.loggedin = false;

    Users.findBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.compare(password, user.password)){
        req.session.loggedin = true;
        res.status(200).json({ message: `Welcome ${user.username}!`})
      } else {
        res.status(401).json({message: 'Invalid Credentials'});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Logout
router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(err => {
      if(err) {
        res.status(500).json({
          message: "You can checkout any time you like, but you can NEVER leave!"
        });
      } else {
        res.status(200).json({
          message: "Logged out"
        });
      }
    });
  } else {
    res.status(200).end()
  }
});

module.exports = router;
