const { Schema, model } = require('mongoose');
//Team Schema
const teamSchema = Schema(
    {
        team_name: {
            type: String,
           
        }
    },
    { timestamps: true }
);

module.exports = model('Team', teamSchema);