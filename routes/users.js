const express = require('express');
const router = express.Router();

const { 
    register, 
    login
  } = require('../controllers/user_controller');

  //Allows user to login or register. API routes
router
    .post('/register', register)
    .post('/login', login)

module.exports = router;