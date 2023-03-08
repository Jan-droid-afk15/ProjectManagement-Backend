const express = require('express');
const router = express.Router();
const { loginRequired } = require('../controllers/auth_controller');

//Exported CRUD functions
const { 
    readEventData, 
    readEventOne,
    createEventData,
    updateEventData,
    deleteEventData
  } = require('../controllers/event_controller');

router
    .get('/', readEventData)

    //Protected Routes, ensures that only admins can Update, Delete and View by ID
    .get('/:id', loginRequired, readEventOne)
    .post('/',loginRequired, createEventData)
    .put('/:id', loginRequired, updateEventData)
    .delete('/:id', loginRequired, deleteEventData);
module.exports = router;