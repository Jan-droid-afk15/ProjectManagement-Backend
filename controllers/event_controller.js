const Event = require('../models/event_schema');
//CRUD functions
const readEventData = (req, res) => {
    Event.find()
        .then((data) => {
            console.log(data);
            if(data.length > 0){
                res.status(200).json(data);
            }
            else{
                res.status(404).json("None found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    // res.status(200).json({
    //     "msg" : "All festivals retrieved",
    //     "data": data
    // });
};

const readEventOne = (req, res) => {

    let id = req.params.id;

    // connect to db and retrieve internet with :id
    Event.findById(id)
        .then((data) => {

            if(data){
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    "message": `Internet with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                res.status(500).json(err)
            }
            
            
        });


};

const createEventData = (req, res) => {
    // console.log(req.body);
    let eventData = req.body;

    Event.create(eventData)
        .then((data) => {
            console.log('New Internet Created!', data);
            res.status(201).json(data);
        })
        .catch((err) => {
            if(err.name === 'ValidationError'){
                console.error('Validation Error!!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error" : err.message 
                });
            }
            else {
                console.error(err);
                res.status(500).json(err);
            }
        });
    };

    

const updateEventData = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Event.findByIdAndUpdate(id, body, {
        new: true
    })
        .then((data) => {

            if(data){
                res.status(201).json(data);
            }
            else {
                res.status(404).json({
                    "message": `Internet with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            if(err.name === 'ValidationError'){
                console.error('Validation Error!!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error" : err.message 
                });
            }
            else if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                console.error(err);
                res.status(500).json(err);
            }
        });


};

const deleteEventData = (req, res) => {

    let id = req.params.id;

    Event.deleteOne({ _id: id })
        .then((data) => {

            if(data.deletedCount){
                res.status(200).json({
                    "message": `Internet with id: ${id} deleted successfully`
                });
            }
            else {
                res.status(404).json({
                    "message": `Internet with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                res.status(500).json(err)
            } 
        });


};

module.exports = {
    readEventData,
    readEventOne,
    createEventData,
    updateEventData,
    deleteEventData
};


