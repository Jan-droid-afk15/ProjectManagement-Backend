const eventModel = require('../Models/eventModel');
const cardModel = require('../Models/cardModel');
const cardService = require("../Services/cardService");
const eventService = require("../Services/eventService");

const create = async (card, eventId, user, callback) => {
	try {
		// Get event
		const event = await eventModel.findById(eventId);

		// Validate the ownership
		const validate = await helperMethods.validateEventOwner(event, user, true);
		if (!validate) return callback({ errMessage: 'You dont have permission to add card to this event' });

		// Create new card
		const newCard = new cardModel({
			...card,
			event: eventId,
			labels: helperMethods.labelsSeed,
			activities: [{ text: `added this card to ${event.title}`, userName: user.name, color: user.color }]
		});
		await newCard.save();

		// Add id of the new card to event
		event.cards.push(newCard._id);
		await event.save();

		// Set data transfer object
		const result = await eventModel.findById(eventId).populate({ path: 'cards' }).exec();
		return callback(false, result);
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const deleteById = async (eventId, user, callback) => {
	try {
		// Get event
		const event = await eventModel.findById(eventId);

		// Validate owner
		const validate = await helperMethods.validateEventOwner(event, user, false);
		if (!validate) {
			return callback({ errMessage: 'You dont have permission to delete this event' });
		}

		// Delete event's cards
		await cardModel.deleteMany({ _id: { $in: event.cards } });

		// Delete the event
		await event.remove();

		return callback(false, { message: 'Success' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const getAllEvents = async (req, res) => {
	try {
		const events = await eventModel.find().populate({ path: 'cards', select: 'title event' });
		const eventsWithCards = events.map(event => {
			const cards = event.cards.map(card => {
				return {
					title: card.title,
					start: card.dueDate,
					end: card.dueDate,
					url: `/boards/${card.board}/lists/${card.list}/cards/${card._id}`,
					color: 'purple',
					textColor: 'white'
				};
			});
			return [...cards, {
				title: event.title,
				start: event.startDate,
				end: event.endDate,
				url: `/events/${event._id}`,
				color: 'red',
				textColor: 'white'
			}];
		});
		const flattenedEvents = eventsWithCards.flat();
		res.status(200).json(flattenedEvents);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getEvent = async (eventId, user, callback) => {
	try {
		// Get event
		const event = await eventModel.findById(eventId);

		// Validate owner
		const validate = await helperMethods.validateEventOwner(event, user, false);
		if (!validate) {
			return callback({ errMessage:

'You dont have permission to view this event' });
}


	// Get cards of the event
	const cards = await cardService.getByEventId(eventId);

	// Set data transfer object
	const result = {
		event: event,
		cards: cards
	};
	return callback(false, result);
} catch (error) {
	return callback({ errMessage: 'Something went wrong', details: error.message });
}
};

const updateById = async (eventId, update, user, callback) => {
try {
// Get event
const event = await eventModel.findById(eventId);


	// Validate owner
	const validate = await helperMethods.validateEventOwner(event, user, false);
	if (!validate) {
		return callback({ errMessage: 'You dont have permission to edit this event' });
	}

	// Update event
	const updatedEvent = await eventService.updateById(eventId, update);

	// Set data transfer object
	const result = {
		event: updatedEvent
	};
	return callback(false, result);
} catch (error) {
	return callback({ errMessage: 'Something went wrong', details: error.message });
}
};

module.exports = {
create,
deleteById,
getAllEvents,
getEvent,
updateById
};