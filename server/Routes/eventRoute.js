const express = require('express');
const router = express.Router();

const eventController = require('../Controllers/eventController');




router.post('/:boardId/:listId/:cardId/:eventId/create', eventController.create);
router.get('/:boardId/:listId/:cardId/event', eventController.getEvent);
router.get('/', eventController.getAllEvents);
router.delete('/:boardId/:listId/:cardId/:eventId/delete', eventController.deleteById);
router.put('/:boardId/:listId/:cardId/:eventId/update', eventController.updateById);

module.exports = router;
