const eventModel = require("../Models/eventModel");
const cardModel = require("../Models/cardModel");
const cardService = require("../Services/cardService");

const create = async (title, eventId, user, card, callback) => {
  try {
    // Get event
    const event = await eventModel.findById(eventId);

    // Validate the ownership
    const validate = await helperMethods.validateEventOwner(event, user, true);
    if (!validate)
      return callback({
        errMessage: "You dont have permission to add card to this event",
      });

    // Set the event ID on the card
    card.event = eventId;

    // Save the card
    await card.save();

    // Add id of the new card to event
    event.cards.push(card._id);
    await event.save();

    // Set data transfer object
    const result = await eventModel
      .findById(eventId)
      .populate({ path: "cards" })
      .exec();
    return callback(false, result);
  } catch (error) {
    return callback({
      errMessage: "Something went wrong",
      details: error.message,
    });
  }
};

const deleteById = async (eventId, user, callback) => {
  try {
    // Get event
    const event = await eventModel.findById(eventId);

    // Validate owner
    const validate = await helperMethods.validateEventOwner(event, user, false);
    if (!validate) {
      return callback({
        errMessage: "You dont have permission to delete this event",
      });
    }

    // Delete event's cards
    await cardModel.deleteMany({ _id: { $in: event.cards } });

    // Delete the event
    await event.remove();

    return callback(false, { message: "Success" });
  } catch (error) {
    return callback({
      errMessage: "Something went wrong",
      details: error.message,
    });
  }
};



const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel
      .find()
      .populate({ path: "cards", select: "title event" });
    const eventsWithCards = events.map((event) => {
      const cards = event.cards.map((card) => {
        return {
          title: card.title,
          start: card.dueDate,
        };
      });
      return {
        id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        allDay: event.allDay,
        cards: cards,
      };
    });
    res.json(eventsWithCards);
  } catch (error) {
    res.status(500).json({
      errMessage: "Something went wrong",
      details: error.message,
    });
  }
};


const updateById = async (eventId, update, user, callback) => {
  try {
    // Get event
    const event = await eventModel.findById(eventId);

    // Validate owner
    const validate = await helperMethods.validateEventOwner(event, user, false);
    if (!validate) {
      return callback({
        errMessage: "You dont have permission to edit this event",
      });
    }

    // Update event
    const updatedEvent = await eventModel.findByIdAndUpdate(eventId, update, { new: true });

    // Set data transfer object
    const result = {
      event: updatedEvent,
    };
    return callback(false, result);
  } catch (error) {
    return callback({
      errMessage: "Something went wrong",
      details: error.message,
    });
  }
};
module.exports = {
  create,
  deleteById,
  getAllEvents,
  updateById,
};
