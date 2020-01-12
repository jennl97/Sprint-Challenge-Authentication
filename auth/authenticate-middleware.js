/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

module.exports = (req, res, next) => {
  if(req.session.loggedin && (req.session.loggedin === true)){
    next();
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
  
};
