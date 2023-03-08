const { Schema, model } = require('mongoose');
//Assignment Schema
const assignmentSchema = Schema(
    {
        assignment_name: {
            type: String,
           
        },
        description: {
            type: String,
            
        },
        subject: {
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

module.exports = model('Assignment', assignmentSchema);