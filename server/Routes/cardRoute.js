const cardController = require('../Controllers/cardController');

const express = require('express');
const router = express.Router();

// Card CRUD
router.post('/create', cardController.create);
router.get('/:boardId/:listId/:cardId', cardController.getCard);
router.put('/:boardId/:listId/:cardId', cardController.update);
router.delete('/:boardId/:listId/:cardId/delete-card', cardController.deleteById);

// Card events
router.post('/:boardId/:listId/:cardId/create-event', cardController.createCardEvent);
router.get('/:boardId/:listId/:cardId/event', cardController.getCardEvent);
router.put('/:boardId/:listId/:cardId/:eventId/update-event', cardController.updateCardEvent);
router.delete('/:boardId/:listId/:cardId/:eventId/delete-event', cardController.deleteCardEvent);

// Card attachments
router.post('/:boardId/:listId/:cardId/add-attachment', cardController.addAttachment);
router.put('/:boardId/:listId/:cardId/:attachmentId/update-attachment', cardController.updateAttachment);
router.delete('/:boardId/:listId/:cardId/:attachmentId/delete-attachment', cardController.deleteAttachment);

// Card dates
router.put('/:boardId/:listId/:cardId/update-dates', cardController.updateStartDueDates);
router.put('/:boardId/:listId/:cardId/update-date-completed', cardController.updateDateCompleted);

// Card checklist
router.post('/:boardId/:listId/:cardId/create-checklist', cardController.createChecklist);
router.delete('/:boardId/:listId/:cardId/:checklistId/delete-checklist', cardController.deleteChecklist);
router.post('/:boardId/:listId/:cardId/:checklistId/add-checklist-item', cardController.addChecklistItem);
router.delete('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/delete-checklist-item', cardController.deleteChecklistItem);
router.put('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-text', cardController.setChecklistItemText);
router.put('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-completed', cardController.setChecklistItemCompleted);

// Card labels
router.post('/:boardId/:listId/:cardId/create-label', cardController.createLabel);
router.delete('/:boardId/:listId/:cardId/:labelId/delete-label', cardController.deleteLabel);
router.put('/:boardId/:listId/:cardId/:labelId/update-label', cardController.updateLabel);
router.put('/:boardId/:listId/:cardId/:labelId/update-label-selection', cardController.updateLabelSelection);

// Card members
router.post('/:boardId/:listId/:cardId/add-member', cardController.addMember);
router.delete('/:boardId/:listId/:cardId/:memberId/delete-member', cardController.deleteMember);

// Card comments
router.post('/:boardId/:listId/:cardId/add-comment', cardController.addComment);
router.put('/:boardId/:listId/:cardId/:commentId', cardController.updateComment);
router.delete('/:boardId/:listId/:cardId/:commentId', cardController.deleteComment);

module.exports = router;