const { Schema, model } = require('mongoose');
//Project Schema
const projectSchema = Schema(
    {
        project_name: {
            type: String,
           
        },
        description: {
            type: String,
            
        },
        module: {
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
              
              },
            },
          ],
    },
    { timestamps: true }
);

module.exports = model('Project', projectSchema);