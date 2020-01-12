const express = require('express');
const Users = require('./users-model');
const authorize = require('../auth/authenticate-middleware');

const router = express.Router();

  router.get('/', authorize, (req, res) => {
    Users.find()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to retrieve users"
            });
        });
  });

// router.post('/', (req, res) => {
//     const user = req.body;
//     Users.add(user)
//         .then(newUser => {
//             res.status(200).json({created: newUser})
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: "Failed to create new user"
//         });
//     });
// });

    module.exports = router;