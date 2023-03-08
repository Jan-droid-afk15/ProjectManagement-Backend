const { Schema, model } = require('mongoose');
//Event Schema
const eventSchema = Schema(
    {
        event_name: {
            type: String,
           
        },
        description: {
            type: String,
            
        },
        start_date: {
            type: String
            
        },
        end_date: {
            type: String
            
        },
        members: [
            {
              _id: false,
              user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
              },
              first_name: {
                type: String,
                required: true,
              },
            },
          ],
    },
    { timestamps: true }
);

module.exports = model('Event', eventSchema);