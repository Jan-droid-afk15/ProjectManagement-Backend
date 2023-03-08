const express = require('express');
const router = express.Router();
const { loginRequired } = require('../controllers/auth_controller');

//Exported CRUD functions
const { 
    readData, 
    readOne,
    createData,
    updateData,
    deleteData
  } = require('../controllers/board_controller');

router
    .get('/', readData)

    //Protected Routes, ensures that only admins can Update, Delete and View by ID
    .get('/:id', loginRequired, readOne)
    .post('/',loginRequired, createData)
    .put('/:id', loginRequired, updateData)
    .delete('/:id', loginRequired, deleteData);
module.exports = router;