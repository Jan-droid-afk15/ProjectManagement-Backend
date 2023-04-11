const eventService = require('../Services/eventService');

const createEvent = async (req, res) => {
  const { title } = req.body;
  const user = req.user;

  if (!title) {
    return res
      .status(400)
      .send({ errMessage: 'The create operation could not be completed because there is missing information' });
  }

  await eventService.create(title, user, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(201).send(result);
  });
};

const deleteEventById = async (req, res) => {
  const user = req.user;
  const { eventId } = req.params;

  await eventService.deleteById(eventId, user, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

const getEvent = async (req, res) => {
  const user = req.user;
  const { eventId } = req.params;

  await eventService.getEvent(eventId, user, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

const updateEvent = async (req, res) => {
  const user = req.user;
  const { eventId } = req.params;

  await eventService.update(eventId, user, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};






const addMemberToEvent = async (req, res) => {
  const user = req.user;
  const { eventId } = req.params;

  await eventService.addMember(eventId, user, req.body.memberId, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

const deleteMemberFromEvent = async (req, res) =>

{
const user = req.user;
const { eventId, memberId } = req.params;

await eventService.deleteMember(eventId, user, memberId, (err, result) => {
if (err) return res.status(500).send(err);
return res.status(200).send(result);
});
};

module.exports = {
createEvent,
deleteEventById,
getEvent,
updateEvent,
addMemberToEvent,
deleteMemberFromEvent,
};





