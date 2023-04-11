const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/eventController');

router.put('/:boardId/:listId/update-title', eventController.updateListTitle);
router.post('/create', eventController.create);
router.get('/:id', eventController.getAll);
router.delete('/:cardId/:eventId', eventController.deleteById);
router.post('/change-card-order', eventController.updateCardOrder);
router.post('/change-list-order', eventController.updateListOrder);

module.exports = router;
